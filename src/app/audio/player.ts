import {AudioFile} from '@wulkanat/hypnothing-core/lib/audio';
import {BinauralBeat, BinauralBeatConfig} from './binaural';
import axios from 'axios';

export interface HypnosisFileAudioPlayerConfig<
  T extends AudioContext | OfflineAudioContext = AudioContext,
> {
  sources: AudioFile[];
  /**
   * Provide an existing context or one for offline rendering
   */
  context?: T;

  gain: number;

  /**
   * No need to pass in the context (obviously...)
   */
  binaural?: BinauralBeatConfig<T>;

  // TODO: background
}

export interface Progress {
  percent: number;
  transferred: number;
  total?: number;
}

export class HypnosisFileAudioPlayer<
  T extends AudioContext | OfflineAudioContext = AudioContext,
> {
  private readonly context: T;

  private readonly gainConstantSourceNode: ConstantSourceNode;

  private readonly sources!: Promise<AudioBufferSourceNode[]>;

  private readonly binaural?: BinauralBeat<T>;

  progress?: Progress[];

  totalProgress?: Progress;

  sectionLengths: Promise<number[]>;

  private calcTotalProgress() {
    this.totalProgress = this.progress?.reduce(
      (accumulator, current) => {
        if (current) {
          accumulator.percent += current.percent / this.progress!.length;
          accumulator.transferred += current.transferred;
          if (current.total) {
            accumulator.total! += current.total;
          }
        }

        return accumulator;
      },
      {percent: 0, transferred: 0, total: 0},
    );
  }

  constructor(private options: HypnosisFileAudioPlayerConfig<T>) {
    this.context =
      options.context ??
      (new AudioContext({
        latencyHint: 'interactive',
        sampleRate: 48_000,
      }) as T);
    this.gainConstantSourceNode = new ConstantSourceNode(this.context, {
      offset: options.gain,
    });

    this.sources = this.fetchAll(options.sources.map(it => it?.src ?? '')).then(
      rawBuffers =>
        Promise.all(
          rawBuffers.map(async rawBuffer => {
            const gainNode = new GainNode(this.context, {gain: 0});
            const source = this.context.createBufferSource();
            source.buffer = await this.context.decodeAudioData(rawBuffer);
            source.connect(gainNode);
            gainNode.connect(this.context.destination);
            this.gainConstantSourceNode.connect(gainNode.gain);
            return source;
          }),
        ),
    );

    this.gainConstantSourceNode.start();

    this.sectionLengths = this.sources.then(sources =>
      sources.map(it => it.buffer?.duration ?? 0),
    );

    if (options.binaural) {
      options.binaural.context = this.context;
      this.binaural = new BinauralBeat(options.binaural);
    }
  }

  async fetchAll(sources: string[]): Promise<ArrayBuffer[]> {
    this.progress = Array.from({length: sources.length});

    const results = await Promise.all(
      sources.map(
        async (source, index) =>
          await axios.get(source, {
            responseType: 'arraybuffer',
            onDownloadProgress: (progress: ProgressEvent) => {
              this.progress![index] = {
                total: progress.total,
                transferred: progress.loaded,
                percent: progress.loaded / progress.total,
              };
              this.calcTotalProgress();
            },
          }),
      ),
    );

    return results.map(response => response.data as ArrayBuffer);
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
