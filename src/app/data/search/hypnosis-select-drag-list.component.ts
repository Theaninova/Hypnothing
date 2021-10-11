import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';

@Component({
  selector: 'hypnosis-select-drag-list',
  templateUrl: 'hypnosis-select-drag-list.html',
  styleUrls: ['hypnosis-select-drag-list.scss'],
})
export class HypnosisSelectDragListComponent {
  @Input() items?: Promise<HypnosisThing[]>;

  @Output() selectionChanged = new EventEmitter();

  targetItems: HypnosisThing[] = [];

  drop(event: CdkDragDrop<HypnosisThing[]>) {
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
