import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file";
import {FormBuilder, FormGroup} from "@angular/forms";
import {fromPairs, keyBy, mapValues} from "lodash-es";
import {Uuid} from "@wulkanat/hypnothing-core/lib/schema.org";
import {DataProvider} from "../data/data.provider";

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
  @Input() hypnosisFile!: Promise<HypnosisFile | undefined>;

  suggestionsFormGroup!: Promise<FormGroup>;

  constructor(private formBuilder: FormBuilder,
              readonly dataProvider: DataProvider) {
  }

  ngOnInit() {
    this.suggestionsFormGroup = new Promise<FormGroup>(async resolve =>
      this.formBuilder.group(
        fromPairs((await this.hypnosisFile)!.suggestions.map(it => [it, true])),
      )
    );
  }
}
