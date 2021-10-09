import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BinauralBeat} from "./audio/binaural";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  binaural?: BinauralBeat;

  changeGain(gain: number | null) {
    this.binaural?.setGain(gain!);
  }

  play(on: boolean) {
    if (on) {
      if (!this.binaural) {
        this.binaural = new BinauralBeat([
          [249, 251],
          [199, 200],
          [149, 151],
          [109, 111],
        ]);
      }
      this.binaural.play();
    } else {
      this.binaural?.pause();
    }
  }
}
