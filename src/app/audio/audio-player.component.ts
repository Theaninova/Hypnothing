import {Component, Input, Optional} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {BinauralBeatConfig} from './binaural';

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.html',
  styleUrls: ['audio-player.scss'],
})
export class AudioPlayerComponent {
  @Input() hypnosisFile!: HypnosisFile;

  @Optional() @Input() binauralConfig?: BinauralBeatConfig;
}
