import {Component, Input, OnInit, Optional} from '@angular/core';
import {BinauralBeatConfig} from './binaural';
import {AudioFile} from '@wulkanat/hypnothing-core/lib/audio';
import {DataProvider} from '../data/data.provider';
import {
  composeAudioFileUuidsFromConfig,
  HypnosisAudioQueueElement,
  HypnosisFileConfiguration,
} from './hypnosis-file-config';
import {HypnosisFileAudioPlayer} from './player';
import {zip} from 'lodash-es';

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.html',
  styleUrls: ['audio-player.scss'],
})
export class AudioPlayerComponent implements OnInit {
  @Input() hypnosisFile!: HypnosisFileConfiguration;

  @Optional() @Input() binauralConfig?: BinauralBeatConfig;

  audioPlayer!: Promise<HypnosisFileAudioPlayer>;

  audioFiles!: Promise<AudioFile[]>;

  incomplete: HypnosisAudioQueueElement[] = [];

  constructor(private dataProvider: DataProvider) {}

  ngOnInit() {
    const requestedFiles = composeAudioFileUuidsFromConfig(this.hypnosisFile);

    this.audioFiles = this.dataProvider
      .getAll<AudioFile>(requestedFiles.map(it => it.uuid))
      .then(files =>
        zip(requestedFiles, files)
          .filter(([element, result]) => {
            if (!result) {
              console.error(`Audio not found: ${element!.uuid}`);
              this.incomplete.push(element!);

              return false;
            }
            return true;
          })
          .map(([_, result]) => result!),
      );

    this.audioPlayer = this.audioFiles.then(
      files =>
        new HypnosisFileAudioPlayer({
          binaural: this.binauralConfig,
          sources: files,
          gain: 0.4,
        }),
    );
  }
}
