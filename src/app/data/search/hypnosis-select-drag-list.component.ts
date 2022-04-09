import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {HypnosisThing} from '@theaninova/hypnothing-core/lib/hypnosis';
import {merge} from 'lodash-es';
import {HypnosisSectionConfiguration} from '../../audio/hypnosis-file-config';

@Component({
  selector: 'hypnosis-select-drag-list',
  templateUrl: 'hypnosis-select-drag-list.html',
  styleUrls: ['hypnosis-select-drag-list.scss'],
})
export class HypnosisSelectDragListComponent implements OnChanges {
  @Input() items?: Promise<HypnosisThing[]>;

  @Input() showAvailability = false;

  @Output() selectionChanged = new EventEmitter<
    HypnosisSectionConfiguration<HypnosisThing>[]
  >();

  searchItems?: Promise<HypnosisSectionConfiguration<HypnosisThing>[]>;

  targetItems: HypnosisSectionConfiguration<HypnosisThing>[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if ('items' in changes) {
      this.searchItems = this.items?.then(items =>
        items.map(it => ({
          thing: it,
        })),
      );
    }
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
