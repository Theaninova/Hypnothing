import {Component, Input} from '@angular/core';
import {HypnosisFile} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file";

@Component({
  selector: 'hypnosis-configurator',
  templateUrl: 'hypnosis-configurator.html',
  styleUrls: ['hypnosis-configurator.scss'],
})
export class HypnosisConfiguratorComponent {
  @Input() hypnosisFile!: HypnosisFile;
}
