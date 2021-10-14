import {Component, ElementRef, ViewChild} from '@angular/core';
import {BinauralBeatConfig} from './audio/binaural';
import {HypnosisFileConfiguration} from './audio/hypnosis-file-config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

  binauralConfig?: BinauralBeatConfig;

  hypnosisFileConfiguration?: HypnosisFileConfiguration;
}
