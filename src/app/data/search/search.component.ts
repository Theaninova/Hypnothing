import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataProvider} from '../data.provider';
import {clone, merge} from 'lodash-es';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';

@Component({
  selector: 'hypnosis-search',
  templateUrl: 'search.html',
  styleUrls: ['search.scss'],
})
export class SearchComponent implements OnInit {
  @Input() forcedFilters: Record<string, string> = {};

  @Input() filters: Record<string, string> = {};

  @Output() resultsChanged = new EventEmitter();

  results!: Promise<HypnosisThing[]>;

  constructor(readonly dataProvider: DataProvider) {}

  fieldIconMap: Record<string, string> = {
    'author': 'person',
    'language': 'language',
    'audio.language': 'language',
    'speaker.uuid': 'record_voice_over',
    'audio.speaker.uuid': 'record_voice_over',
  };

  async ngOnInit() {
    await this.search();
  }

  async search() {
    this.results = this.dataProvider.search({
      filters: merge(clone(this.forcedFilters), this.filters),
    });

    this.resultsChanged.emit(this.results);
  }
}
