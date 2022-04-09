import {Component, Input} from '@angular/core';
import {HypnosisThing} from '@theaninova/hypnothing-core/lib/hypnosis';

@Component({
  selector: 'hypnosis-list',
  templateUrl: 'hypnosis-list.html',
  styleUrls: ['hypnosis-list.scss'],
})
export class HypnosisListComponent {
  @Input() items!: Promise<HypnosisThing[]>;
}
