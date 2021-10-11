import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'hypnosis-select-list',
  templateUrl: 'hypnosis-select-list.html',
  styleUrls: ['hypnosis-select-list.scss'],
})
export class HypnosisSelectListComponent {
  @Input() items?: Promise<HypnosisThing[]>;

  @Input() multiple = false;

  @ViewChild('list', {read: MatSelectionList}) list!: MatSelectionList;

  @Output() selectionChanged = new EventEmitter();

  change() {
    this.selectionChanged.emit(
      this.list.selectedOptions.selected.map(it => it.value),
    );
  }
}
