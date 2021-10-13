import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {HypnosisSectionConfiguration} from '../../hypnosis-configurator.component';
import {merge} from 'lodash-es';

@Component({
  selector: 'hypnosis-list-item',
  templateUrl: 'hypnosis-list-item.html',
  styleUrls: ['hypnosis-list-item.scss'],
})
export class HypnosisListItemComponent {
  @Input() item!: HypnosisThing;

  @Input() showAvailability = false;

  @Output() availabilityChanged = new EventEmitter<
    HypnosisSectionConfiguration<HypnosisThing>
  >();

  selection: HypnosisSectionConfiguration<HypnosisThing> = {
    thing: this.item,
  };

  hasAudio(): boolean {
    return 'audio' in this.item;
  }

  emit(selection: Partial<HypnosisSectionConfiguration<HypnosisThing>>) {
    this.selection = merge(this.selection, selection);
    this.availabilityChanged.emit(this.selection);
  }
}
