import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file";
import {FormBuilder, FormGroup} from "@angular/forms";
import {keyBy, mapValues} from "lodash-es";
import {Uuid} from "@wulkanat/hypnothing-core/lib/schema.org";

export interface HypnosisFileConfiguration {
  includeBinaural: boolean;
  includeBackground: boolean;
  inductionSrc: Uuid[];
  triggerSrc: Uuid;
  suggestionSrc: Uuid[];
  wakingSrc: Uuid[];
}

@Component({
  selector: 'hypnosis-configurator',
  templateUrl: 'hypnosis-configurator.html',
  styleUrls: ['hypnosis-configurator.scss'],
})
export class HypnosisConfiguratorComponent implements OnInit {
  @Input() hypnosisFile!: HypnosisFile;

  suggestionsFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.suggestionsFormGroup = this.formBuilder.group(
      mapValues(keyBy(this.hypnosisFile.suggestions, 'uuid'), _ => true)
    )
  }
}
