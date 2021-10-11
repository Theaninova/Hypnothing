import {Component, Input, OnInit} from '@angular/core';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import {DataProvider} from '../data.provider';
import {merge} from 'lodash-es';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';

@Component({
  selector: 'search',
  templateUrl: 'search.html',
  styleUrls: ['search.scss', '../../util/drag-drop-list.scss'],
})
export class SearchComponent implements OnInit {
  @Input() forcedFilters: Record<string, string> = {};

  @Input() filters: Record<string, string> = {};

  @Input() dropTarget: CdkDropList | CdkDropList[] = [];

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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO
    this.dropListItems = (await this.results).map(item => item.title);
  }
}
