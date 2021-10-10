import {Component, ElementRef, ViewChild} from '@angular/core';
import {BinauralBeat, BinauralBeatConfig, TrueRecursivePartial} from "./audio/binaural";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
}
