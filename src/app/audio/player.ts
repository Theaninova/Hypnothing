import {AudioFile, VolumeChoice} from '@wulkanat/hypnothing-core/lib/audio';
import {BinauralBeat, BinauralBeatConfig} from './binaural';
import axios from 'axios';
import {reduce, zip, last} from 'lodash-es';

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

/**
 * Parse volume keyframes
 */
function volumeKeyframe(vol: VolumeChoice): number {
  switch (vol) {
    case 'inherit':
      return 0; // TODO
    case 'prefetch':
      return 0; // TODO
    case 'off':
      return 0;
    case 'loud':
      return 0.3;
    case 'normal':
      return 0.6;
    case 'silent':
      return 0.01;
  }
}

/**
 * Parse audio timestamps
 */
function audioTimestamp(timestamp: string): number {
  const [minutes, seconds] = timestamp.split(':');

  return Number.parseInt(minutes) + Number.parseInt(seconds) * 60;
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

  downloadProgress?: Progress[];

  totalDownloadProgress?: Progress;

  totalDuration = 0;

  sectionLengths: Promise<number[]>;

  playing = false;

  private calcTotalProgress() {
    this.totalDownloadProgress = this.downloadProgress?.reduce(
      (accumulator, current) => {
        if (current) {
          accumulator.percent +=
            current.percent / this.downloadProgress!.length;
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

  /**
   * Schedule the play times for each audio node
   *
   * @returns number the cumulative time file will take
   */
  private async schedulePlay(): Promise<number> {
    return reduce(
      zip(await this.sources, this.options.sources),
      (accumulator, [source, info]) => {
        reduce(
          info!.binauralKeyframes,
          (previous, keyframe) => {
            this.binaural?.modify(
              {
                gain: volumeKeyframe(keyframe.value.volume),
                binauralFrequency: keyframe.value.wave,
              },
              keyframe.in,
              accumulator.time + audioTimestamp(keyframe.at),
            );

            return keyframe;
          },
          last(accumulator.info?.binauralKeyframes),
        );
        source!.start(accumulator.time);
        const next = accumulator.time + source!.buffer!.duration;
        source!.stop(next);

        return {time: next, info: info};
      },
      {time: 0, info: undefined as AudioFile | undefined},
    ).time;
  }

  constructor(private options: HypnosisFileAudioPlayerConfig<T>) {
    this.context =
      options.context ??
      (new AudioContext({
        latencyHint: 'interactive',
        sampleRate: 48_000,
      }) as T);
    this.pause().then();
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

    this.schedulePlay().then(it => (this.totalDuration = it));
  }

  async fetchAll(sources: string[]): Promise<ArrayBuffer[]> {
    this.downloadProgress = Array.from({length: sources.length});

    const results = await Promise.all(
      sources.map(
        async (source, index) =>
          await axios.get(source, {
            responseType: 'arraybuffer',
            onDownloadProgress: (progress: ProgressEvent) => {
              this.downloadProgress![index] = {
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

  get progress(): number {
    return this.context.currentTime / this.totalDuration;
  }

  async pause() {
    if (this.context instanceof AudioContext) {
      await this.context.suspend();
      this.playing = false;
    }
  }

  async play() {
    await this.context.resume();
    this.playing = true;
  }

  async destroy() {
    if (this.context instanceof AudioContext) {
      await this.context.close();
    }
  }
}
