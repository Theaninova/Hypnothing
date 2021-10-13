import {Component, Input} from '@angular/core';
import {HypnosisTrigger} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger';

@Component({
  selector: 'trigger-list-item',
  templateUrl: 'trigger-list-item.html',
  styleUrls: ['trigger-list-item.scss'],
})
export class TriggerListItemComponent {
  @Input() item!: HypnosisTrigger;
}
