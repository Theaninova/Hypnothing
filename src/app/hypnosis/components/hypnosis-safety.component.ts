import {Component, Input} from "@angular/core";
import {HypnosisSafetyGuard} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-safety";

@Component({
  selector: 'hypnosis-safety',
  templateUrl: 'hypnosis-safety.html',
  styleUrls: ['hypnosis-safety.scss'],
})
export class HypnosisSafetyComponent {
  @Input() safety!: HypnosisSafetyGuard;
  @Input() showTitle = true;
}
