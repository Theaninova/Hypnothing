import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AudioOptions,
  AudioReference,
} from '@wulkanat/hypnothing-core/lib/audio';
import {Author} from '@wulkanat/hypnothing-core/lib/schema.org';
import {DataProvider} from '../../data/data.provider';
import {
  HypnosisThing,
  HypnosisTypeEnumerator,
} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {first, fromPairs, get, isNil, reject, toPairs, zip} from 'lodash-es';

const tranceWithShortLongAndSummaryAudioKeys = [
  'content.overviewIntroductionAudioOptions',
  'content.shortAudioOptions',
  'content.longAudioOptions',
  'content.summaryAudioOptions',
];

const tranceWithIntroductionAndReminderAudioKeys = [
  'introductionAudioOptions',
  'introductionAudioOptions',
];

const recordings: Record<HypnosisTypeEnumerator, string[]> = {
  'audio file': [],
  'author': [],
  'suggestion': tranceWithShortLongAndSummaryAudioKeys,
  'safety': tranceWithIntroductionAndReminderAudioKeys,
  'file': ['overviewAudioOptions', 'goodbyeAudioOptions'],
  'induction': ['audioOptions'],
  'trigger': tranceWithIntroductionAndReminderAudioKeys,
  'waker': ['audioOptions'],
  'warning': [],
};

@Component({
  selector: 'availability',
  templateUrl: 'availability.html',
  styleUrls: ['availability.scss'],
})
export class AvailabilityComponent implements OnInit {
  @Input() item!: HypnosisThing;

  @Output() speakerChanged = new EventEmitter<Author>();

  @Output() languageChanged = new EventEmitter<string>();

  /**
   * Language -> Speaker Uuid -> key -> AudioOptions
   */
  index: Record<string, Record<string, Record<string, AudioReference>>> = {};

  languages: Record<string, boolean> = {};

  speakers!: Promise<Record<string, Author | undefined>>;

  languageValue!: string;

  speakerValue?: Author;

  constructor(readonly dataProvider: DataProvider) {}

  ngOnInit() {
    const options = reject(
      recordings[this.item.type].map(
        path => get(this.item, path) as AudioOptions,
      ),
      isNil,
    );

    const speakers: Record<string, Promise<Author | undefined>> = {};

    for (const [key, optionList] of Object.entries(options)) {
      for (const option of optionList) {
        this.languageValue = this.languageValue ?? option.language;

        this.languages[option.language] = true;
        speakers[option.speaker.uuid] = this.dataProvider.get(
          option.speaker.uuid,
        );
        this.index[option.language] = this.index[option.language] ?? {};
        this.index[option.language][option.speaker.uuid] =
          this.index[option.language][option.speaker.uuid] ?? {};
        this.index[option.language][option.speaker.uuid][key] = option;
      }
    }

    this.speakers = new Promise(async resolve => {
      const pairs = toPairs(speakers);
      const resolved = await Promise.all(pairs.map(([_, value]) => value));
      this.speakerValue = first(resolved);
      resolve(
        fromPairs(
          zip(pairs, resolved).map(([pair, result]) => [pair![0], result]),
        ),
      );
    });
  }
}
