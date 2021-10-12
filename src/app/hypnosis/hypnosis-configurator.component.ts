import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromPairs} from 'lodash-es';
import {Author, Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';

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

  inductionResults!: Promise<HypnosisThing[]>;

  inductions: HypnosisThing[] = [];

  triggerResults!: Promise<HypnosisThing[]>;

  trigger?: HypnosisThing;

  language = 'en';

  speaker!: Author;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.suggestionsFormGroup = new Promise<FormGroup>(async resolve =>
      resolve(
        this.formBuilder.group(
          fromPairs(
            (await this.hypnosisFile)!.suggestions.map(it => [it, true]),
          ),
        ),
      ),
    );
  }

  log(it: unknown) {
    console.log(it);
  }
}
