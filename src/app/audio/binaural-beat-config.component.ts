import {
  Component,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  BinauralBeat,
  BinauralBeatConfig,
  BinauralFrequencyConfig,
  TrueRecursivePartial,
} from './binaural';
import {isNil, merge, omitBy, without} from 'lodash-es';
import {MatButton} from '@angular/material/button';
import {bufferToWave} from './wav';

@Component({
  selector: 'binaural-beat-config',
  templateUrl: 'binaural-beat-config.html',
  styleUrls: ['binaural-beat-config.scss'],
})
export class BinauralBeatConfigComponent implements OnChanges {
  frequencies = [
    {frequency: 'β-Wave (Alert)', id: 'beta', value: 14, min: 13, max: 16},
    {frequency: 'α-Wave (Relaxed)', id: 'alpha', value: 10, min: 8, max: 12},
    {frequency: 'δ-Wave (Light Sleep)', id: 'delta', value: 6, min: 4, max: 7},
    {frequency: 'θ-Wave (Deep Sleep)', id: 'theta', value: 2, min: 0.5, max: 4},
  ];

  frequenciesColumns = ['frequency', 'value'];

  binaural?: BinauralBeat<AudioContext>;

  playing: 'play_arrow' | 'stop' = 'play_arrow';

  config: BinauralBeatConfig = {
    frequencies: [250, 200, 150, 110],
    binauralFrequency: 'theta',
    gain: 0.01,
    binauralFrequencyConfig: {
      beta: 14,
      alpha: 10,
      delta: 6,
      theta: 2,
    },
  };

  @Output() configChanged = new EventEmitter<BinauralBeatConfig>();

  ngOnChanges(changes: SimpleChanges) {
    if ('config' in changes) {
      this.configChanged.emit(this.config);
    }
  }

  private reset() {
    this.playPreview();
    this.playPreview();
  }

  addFrequency() {
    this.config.frequencies.push(200);
    if (this.playing === 'stop') {
      this.reset();
    }
  }

  removeFrequency(value: number) {
    this.config.frequencies = without(this.config.frequencies, value);
    if (this.playing === 'stop') {
      this.reset();
    }
  }

  changeFrequency(index: number, frequency: number | null) {
    if (!frequency) {
      return;
    }

    this.config.frequencies[index] = frequency;
    this.binaural?.modify({frequencies: this.config.frequencies});
  }

  modifyWave(key: keyof BinauralFrequencyConfig, value: number) {
    this.modify({binauralFrequencyConfig: {[key]: value}});
  }

  modify(configOverride: TrueRecursivePartial<BinauralBeatConfig>) {
    this.binaural?.modify(configOverride);
    this.config = merge(this.config, omitBy(configOverride, isNil));
  }

  playPreview() {
    this.playing = this.playing === 'stop' ? 'play_arrow' : 'stop';

    if (this.binaural) {
      this.binaural.destroy();
      this.binaural = undefined;
    } else {
      this.binaural = new BinauralBeat(this.config);
    }
  }

  async render(
    length: string,
    sampleRate: string,
    downloadLink: HTMLAnchorElement,
    button: MatButton,
  ) {
    button.disabled = true;
    downloadLink.href = '';
    downloadLink.download = '';
    delete downloadLink.dataset.downloadUrl;

    const length_ = length === '' ? 300_000 : Number.parseInt(length) * 10_000;
    const rate = sampleRate === '' ? 44_800 : Number.parseInt(sampleRate);
    const context = new OfflineAudioContext(2, length_, rate);
    const binaural = new BinauralBeat({
      ...this.config,
      context,
    });

    const buffer = await context.startRendering();
    const wav = bufferToWave(buffer, length_);

    await binaural.destroy();

    downloadLink.href = window.URL.createObjectURL(wav);
    downloadLink.download = 'binaural.wav';
    downloadLink.dataset.downloadurl = [
      'audio/wav',
      downloadLink.download,
      downloadLink.href,
    ].join(':');

    button.disabled = false;
  }
}
