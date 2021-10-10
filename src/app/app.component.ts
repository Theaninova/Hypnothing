import {Component, ElementRef, ViewChild} from '@angular/core';
import {gamerFile} from "./data/dummy-gamer-file";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

  file = gamerFile;
}
