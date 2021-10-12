import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataProvider} from '../data.provider';
import {merge} from 'lodash-es';
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
    author: 'person',
    language: 'language',
    speaker: 'record_voice_over',
  };

  async ngOnInit() {
    await this.search();
  }

  async search() {
    this.results = this.dataProvider.search({
      filters: merge(this.forcedFilters, this.filters),
    });

    this.resultsChanged.emit(this.results);
  }
}
