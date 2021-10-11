import {Component, Input} from '@angular/core';
import {TranceInduction} from '@wulkanat/hypnothing-core/lib/trance/trance-induction';

@Component({
  selector: 'induction-list-item',
  templateUrl: 'induction-list-item.html',
  styleUrls: ['induction-list-item.scss'],
})
export class InductionListItemComponent {
  @Input() item!: TranceInduction;
}
