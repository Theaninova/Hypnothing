import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AudioOptions,
  ThingWithAudio,
} from '@wulkanat/hypnothing-core/lib/audio';
import {
  Author,
  AuthorReference,
  Uuid,
} from '@wulkanat/hypnothing-core/lib/schema.org';
import {DataProvider} from '../../data/data.provider';
import {first, flatMap, keyBy, mapValues, values} from 'lodash-es';

@Component({
  selector: 'availability',
  templateUrl: 'availability.html',
  styleUrls: ['availability.scss'],
})
export class AvailabilityComponent implements OnInit {
  @Input() item!: ThingWithAudio<AudioOptions[]>;

  @Output() speakerChanged = new EventEmitter<AuthorReference>();

  @Output() languageChanged = new EventEmitter<string>();

  speakers!: Record<string, Promise<Author | undefined>>;

  languageValue!: string;

  speakerValue!: Uuid;

  constructor(readonly dataProvider: DataProvider) {}

  index!: Record<string, Record<Uuid, AuthorReference>>;

  ngOnInit() {
    this.index = mapValues(this.item.spokenLanguages, it => keyBy(it, 'uuid'));
    const [language, [speaker]] = first(
      Object.entries(this.item.spokenLanguages),
    )!;
    this.languageValue = language;
    this.speakerValue = speaker.uuid;

    this.speakers = mapValues(
      keyBy(
        flatMap(this.item.spokenLanguages, language => values(language)),
        'uuid',
      ),
      it => this.dataProvider.get(it.uuid) as Promise<Author>,
    );
  }
}
