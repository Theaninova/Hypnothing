import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import {BinauralBeatConfig} from './binaural';
import {AudioFile} from '@wulkanat/hypnothing-core/lib/audio';
import {DataProvider} from '../data/data.provider';
import {
  composeAudioFileUuidsFromConfig,
  HypnosisFileConfiguration,
} from './hypnosis-file-config';

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.html',
  styleUrls: ['audio-player.scss'],
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  @Input() hypnosisFile!: HypnosisFileConfiguration;

  @Optional() @Input() binauralConfig?: BinauralBeatConfig;

  @ViewChild('audioFiles') audioFiles!: ElementRef<HTMLDivElement>;

  sources!: Promise<Array<AudioFile | undefined>>;

  constructor(private dataProvider: DataProvider) {}

  ngOnInit() {
    this.sources = this.dataProvider.getAll<AudioFile>(
      composeAudioFileUuidsFromConfig(this.hypnosisFile),
    );
  }

  async ngAfterViewInit() {
    await this.sources;
    const context = new AudioContext();

    const audioElements: HTMLAudioElement[] = [];

    for (let i = 0; i < this.audioFiles.nativeElement.children.length; i++) {
      audioElements.push(
        this.audioFiles.nativeElement.children[i] as HTMLAudioElement,
      );
    }

    for (const element of audioElements) {
      const source = context.createMediaElementSource(element);
      source.connect(context.destination);
      element.play();
      element.addEventListener('ended', () => {}); // TODO
    }
  }
}
