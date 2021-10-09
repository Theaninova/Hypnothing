/**
 * Creates a binaural beat audio
 */
export class BinauralBeat {
  private readonly context: AudioContext;
  private gainConstantSourceNode: ConstantSourceNode;

  private createBinaural(
    leftFrequency: number,
    rightFrequency: number
  ) {
    const leftOscillator = new OscillatorNode(this.context, {
      frequency: leftFrequency,
      type: 'sine',
    });
    const rightOscillator = new OscillatorNode(this.context, {
      frequency: rightFrequency,
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
  }

  constructor(frequencies: [number, number][]) {
    this.context = new AudioContext();
    this.gainConstantSourceNode = new ConstantSourceNode(this.context, {offset: 0});

    for (const [lower, upper] of frequencies) {
      this.createBinaural(lower, upper)
    }

    this.gainConstantSourceNode.start()
  }

  set gain(gain: number) {
    this.gainConstantSourceNode.offset.setTargetAtTime(gain!, this.context.currentTime, 0.5);
  }
}
