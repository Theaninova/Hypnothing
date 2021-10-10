import {Component, ElementRef, ViewChild} from '@angular/core';
import {BinauralBeat, BinauralBeatConfig, TruePartial} from "./audio/binaural";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  binaural?: BinauralBeat;

  modify(options: TruePartial<BinauralBeatConfig>) {
    this.binaural?.modify(options);
  }

  play(on: boolean) {
    if (on) {
      if (!this.binaural) {
        this.binaural = new BinauralBeat({
          frequencies: [250, 200, 150, 110],
          binauralFrequency: 'delta',
          gain: 0.2
        });
      }
      this.binaural.play();
    } else {
      this.binaural?.pause();
    }
  }
}
