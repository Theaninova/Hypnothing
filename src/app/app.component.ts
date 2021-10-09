import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BinauralBeat} from "./audio/binaural";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  binaural!: BinauralBeat;

  ngOnInit() {
    this.binaural = new BinauralBeat([
      [249, 251],
      [199, 200],
      [149, 151],
      [109, 111],
    ]);
  }

  changeGain(gain: number | null) {
    this.binaural.gain = gain!;
  }

  play(on: boolean) {

  }
}
