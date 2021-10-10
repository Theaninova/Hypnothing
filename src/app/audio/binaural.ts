import {zip} from "lodash-es";

export type BinauralWave = number | 'beta' | 'alpha' | 'theta' | 'delta';

export type TruePartial<T> = {
  [P in keyof T]?: T[P] | null;
};

/**
 * https://www.psychologytoday.com/us/basics/binaural-beats
 */
function toBinauralFrequency(wave: BinauralWave) {
  return typeof wave === 'number' ? wave : {
    beta: 14,
    alpha: 10,
    theta: 4,
    delta: 2,
  }[wave];
}

export interface BinauralBeatConfig {
  frequencies: number[];
  binauralFrequency: BinauralWave;
  gain: number;
}

/**
 * Creates a binaural beat audio
 */
export class BinauralBeat {
  private readonly context: AudioContext;
  private readonly gainConstantSourceNode: ConstantSourceNode;
  private readonly oscillators: [OscillatorNode, OscillatorNode][];

  private frequencies: number[];
  private binauralWave: BinauralWave;

  constructor(options: BinauralBeatConfig) {
    this.frequencies = options.frequencies;
    this.binauralWave = options.binauralFrequency;

    const binauralFrequency = toBinauralFrequency(options.binauralFrequency);

    this.context = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000,
    });
    this.gainConstantSourceNode = new ConstantSourceNode(this.context, {offset: options.gain});

    this.oscillators = this.frequencies.map(frequency => {
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

    this.gainConstantSourceNode.start()
  }

  modify(options: TruePartial<BinauralBeatConfig>, smooth = 0.5) {
    this.binauralWave = options.binauralFrequency ?? this.binauralWave;
    const binauralFrequency = toBinauralFrequency(this.binauralWave);

    this.frequencies = options.frequencies ?? this.frequencies;

    // make sure changes are synced
    const currentTime = this.context.currentTime;
    for (const [frequency, oscillators] of zip(this.frequencies, this.oscillators)) {
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

    if (options.gain) {
      this.gainConstantSourceNode.offset.exponentialRampToValueAtTime(options.gain, currentTime + smooth);
    }
  }

  async pause() {
    await this.context.suspend();
  }

  async play() {
    await this.context.resume();
  }
}
