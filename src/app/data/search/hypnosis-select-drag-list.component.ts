import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {HypnosisSectionConfiguration} from '../../hypnosis/hypnosis-configurator.component';
import {merge} from 'lodash-es';

@Component({
  selector: 'hypnosis-select-drag-list',
  templateUrl: 'hypnosis-select-drag-list.html',
  styleUrls: ['hypnosis-select-drag-list.scss'],
})
export class HypnosisSelectDragListComponent implements OnInit {
  @Input() items?: Promise<HypnosisThing[]>;

  @Input() showAvailability = false;

  @Output() selectionChanged = new EventEmitter<
    HypnosisSectionConfiguration<HypnosisThing>[]
  >();

  searchItems?: Promise<HypnosisSectionConfiguration<HypnosisThing>[]>;

  targetItems: HypnosisSectionConfiguration<HypnosisThing>[] = [];

  ngOnInit() {
    this.searchItems = this.items?.then(items =>
      items.map(it => ({
        thing: it,
      })),
    );
  }

  merge = merge;

  drop(event: CdkDragDrop<HypnosisSectionConfiguration<HypnosisThing>[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.selectionChanged.emit(this.targetItems);
    }
  }
}
