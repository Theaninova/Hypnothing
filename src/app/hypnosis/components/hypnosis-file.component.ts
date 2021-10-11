import {Component, Input} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';

@Component({
  selector: 'hypnosis-file',
  templateUrl: 'hypnosis-file.html',
  styleUrls: ['hypnosis-file.scss'],
})
export class HypnosisFileComponent {
  @Input() hypnosisFile!: Promise<HypnosisFile | undefined>;
}
