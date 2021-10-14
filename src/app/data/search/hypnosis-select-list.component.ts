import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {MatSelectionList} from '@angular/material/list';
import {merge} from 'lodash-es';
import {HypnosisSectionConfiguration} from '../../audio/hypnosis-file-config';

@Component({
  selector: 'hypnosis-select-list',
  templateUrl: 'hypnosis-select-list.html',
  styleUrls: ['hypnosis-select-list.scss'],
})
export class HypnosisSelectListComponent implements OnChanges {
  @Input() items?: Promise<HypnosisThing[]>;

  @Input() multiple = false;

  @ViewChild('list', {read: MatSelectionList}) list!: MatSelectionList;

  @Input() showAvailability = false;

  @Output() selectionChanged = new EventEmitter<
    HypnosisSectionConfiguration<HypnosisThing>[]
  >();

  searchItems?: Promise<HypnosisSectionConfiguration<HypnosisThing>[]>;

  merge = merge;

  ngOnChanges(changes: SimpleChanges) {
    if ('items' in changes) {
      this.searchItems = this.items?.then(items =>
        items.map(it => ({
          thing: it,
        })),
      );
    }
  }

  change() {
    this.selectionChanged.emit(
      this.list.selectedOptions.selected.map(it => it.value),
    );
  }
}
