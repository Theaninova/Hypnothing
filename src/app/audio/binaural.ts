import {zip, merge} from 'lodash-es';

export type BinauralWave = number | keyof BinauralFrequencyConfig;

export type TrueRecursivePartial<T> = {
  [P in keyof T]?: TrueRecursivePartial<T[P]> | null;
};

export interface BinauralFrequencyConfig {
  beta: number;
  alpha: number;
  theta: number;
  delta: number;
}

export interface BinauralBeatConfig<
  T extends AudioContext | OfflineAudioContext = AudioContext,
> {
  frequencies: number[];
  binauralFrequency: BinauralWave;
  gain: number;
  binauralFrequencyConfig: BinauralFrequencyConfig;
  /**
   * Provide an existing context or one for offline rendering
   */
  context?: T;
}

/**
 * Creates a binaural beat audio
 */
export class BinauralBeat<T extends AudioContext | OfflineAudioContext> {
  private readonly context: T;

  private readonly gainConstantSourceNode: ConstantSourceNode;

  private readonly oscillators: [OscillatorNode, OscillatorNode][];

  /**
   * https://www.psychologytoday.com/us/basics/binaural-beats
   */
  private toBinauralFrequency(wave: BinauralWave) {
    return typeof wave === 'number'
      ? wave
      : this.options.binauralFrequencyConfig[wave];
  }

  constructor(private options: BinauralBeatConfig<T>) {
    const binauralFrequency = this.toBinauralFrequency(
      options.binauralFrequency,
    );

    this.context =
      options.context ??
      (new AudioContext({
        latencyHint: 'interactive',
        sampleRate: 48_000,
      }) as T);
    this.gainConstantSourceNode = new ConstantSourceNode(this.context, {
      offset: options.gain,
    });

    this.oscillators = this.options.frequencies.map(frequency => {
      const leftOscillator = new OscillatorNode(this.context, {
        frequency: frequency - binauralFrequency / 2,
        type: 'sine',
      });
      const rightOscillator = new OscillatorNode(this.context, {
        frequency: frequency + binauralFrequency / 2,
        type: 'sine',
      });

      const leftPan = new StereoPannerNode(this.context, {pan: -1});
      const rightPan = new StereoPannerNode(this.context, {pan: 1});

      const leftGain = new GainNode(this.context, {gain: 0});
      const rightGain = new GainNode(this.context, {gain: 0});

      leftOscillator.connect(leftPan);
      leftPan.connect(leftGain);
      leftGain.connect(this.context.destination);
      rightOscillator.connect(rightPan);
      rightPan.connect(rightGain);
      rightGain.connect(this.context.destination);

      this.gainConstantSourceNode.connect(leftGain.gain);
      this.gainConstantSourceNode.connect(rightGain.gain);

      leftOscillator.start();
      rightOscillator.start();

      return [leftOscillator, rightOscillator];
    });

    this.gainConstantSourceNode.start();
  }

  modify(options: TrueRecursivePartial<BinauralBeatConfig>, smooth = 0.5) {
    this.options = merge(this.options, options);
    const binauralFrequency = this.toBinauralFrequency(
      this.options.binauralFrequency,
    );

    // make sure changes are synced
    const currentTime = this.context.currentTime;

    if (
      options.binauralFrequency ||
      options.binauralFrequencyConfig ||
      options.frequencies
    ) {
      for (const [frequency, oscillators] of zip(
        this.options.frequencies,
        this.oscillators,
      )) {
        const [leftOscillator, rightOscillator] = oscillators!;

        leftOscillator.frequency.exponentialRampToValueAtTime(
          frequency! - binauralFrequency / 2,
          currentTime + smooth,
        );
        rightOscillator.frequency.exponentialRampToValueAtTime(
          frequency! + binauralFrequency / 2,
          currentTime + smooth,
        );
      }
    }

    if (options.gain) {
      this.gainConstantSourceNode.offset.exponentialRampToValueAtTime(
        options.gain,
        currentTime + smooth,
      );
    }
  }

  async pause(suspendTime: T extends OfflineAudioContext ? number : undefined) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await this.context.suspend(suspendTime!);
  }

  async play() {
    await this.context.resume();
  }

  async destroy() {
    if (this.context instanceof AudioContext) {
      await this.context.close();
    }
  }
}
