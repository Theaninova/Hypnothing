import {Component} from '@angular/core';
import {
  BinauralBeat,
  BinauralBeatConfig,
  BinauralFrequencyConfig,
  TrueRecursivePartial,
} from './binaural';
import {isNil, merge, omitBy, without} from 'lodash-es';

@Component({
  selector: 'binaural-beat-config',
  templateUrl: 'binaural-beat-config.html',
  styleUrls: ['binaural-beat-config.scss'],
})
export class BinauralBeatConfigComponent {
  frequencies = [
    {frequency: 'β-Wave (Alert)', id: 'beta', value: 14, min: 13, max: 16},
    {frequency: 'α-Wave (Relaxed)', id: 'alpha', value: 10, min: 8, max: 12},
    {frequency: 'δ-Wave (Light Sleep)', id: 'delta', value: 6, min: 4, max: 7},
    {frequency: 'θ-Wave (Deep Sleep)', id: 'theta', value: 2, min: 0.5, max: 4},
  ];

  frequenciesColumns = ['frequency', 'value'];

  binaural?: BinauralBeat;

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
}
