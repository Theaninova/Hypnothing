import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromPairs} from 'lodash-es';
import {AuthorReference} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {TranceInduction} from '@wulkanat/hypnothing-core/lib/trance/trance-induction';
import {HypnosisTrigger} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger';
import {HypnosisSuggestion} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-suggestion';
import {HypnosisWaker} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-waker';

export interface HypnosisSectionConfiguration<T extends HypnosisThing> {
  thing?: T;
  language?: string;
  speaker?: AuthorReference;
}

export interface HypnosisFileConfiguration {
  includeBinaural: boolean;
  includeBackground: boolean;
  file: HypnosisSectionConfiguration<HypnosisFile>;
  inductions: HypnosisSectionConfiguration<TranceInduction>[];
  trigger: HypnosisSectionConfiguration<HypnosisTrigger>;
  suggestions: HypnosisSectionConfiguration<HypnosisSuggestion>[];
  waking: HypnosisSectionConfiguration<HypnosisWaker>[];
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

  configuration!: Promise<HypnosisFileConfiguration>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.suggestionsFormGroup = new Promise<FormGroup>(async resolve =>
      resolve(
        this.formBuilder.group(
          fromPairs(
            (await this.hypnosisFile)!.suggestions.map(it => [it.uuid, true]),
          ),
        ),
      ),
    );

    this.configuration = new Promise(async resolve =>
      resolve({
        includeBinaural: true,
        includeBackground: true,
        file: {
          thing: await this.hypnosisFile,
        },
        inductions: [],
        waking: [],
        suggestions: [],
        trigger: {},
      }),
    );
  }
}
