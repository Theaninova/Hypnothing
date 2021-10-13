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
import {
  flatMap,
  flatten,
  groupBy,
  isNil,
  keyBy,
  map,
  mapValues,
  reject,
  tail,
  values,
} from 'lodash-es';

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

  index!: Record<string, Record<Uuid, AudioOptions>>;

  private merge<T>(
    objs: Array<Record<string, Record<string, T[]>>>,
  ): Record<string, Record<string, T[]>> {
    return mapValues(objs[0], (object, key1) =>
      mapValues(object, (value, key2) => [
        ...value,
        ...flatMap(tail(objs), it => it[key1]?.[key2]),
      ]),
    );
  }

  ngOnInit() {
    this.index = this.merge(
      map(this.item.audio, section =>
        mapValues(groupBy(section, 'language'), value =>
          groupBy(value, it => it.speaker.uuid),
        ),
      ),
    );
    const {language, speaker} = Object.values(
      Object.values(this.index)[0],
    )[0][0];
    this.languageValue = language;
    this.speakerValue = speaker.uuid;

    this.speakers = mapValues(
      keyBy(
        reject(
          flatten(flatMap(this.index, language => values(language))),
          isNil,
        ),
        it => it.speaker.uuid,
      ),
      it => this.dataProvider.get(it.speaker.uuid) as Promise<Author>,
    );
  }
}
