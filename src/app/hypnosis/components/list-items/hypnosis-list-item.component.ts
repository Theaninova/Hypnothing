import {Component, Input} from '@angular/core';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';

@Component({
  selector: 'hypnosis-list-item',
  templateUrl: 'hypnosis-list-item.html',
  styleUrls: ['hypnosis-list-item.scss'],
})
export class HypnosisListItemComponent {
  @Input() item!: HypnosisThing;
}
