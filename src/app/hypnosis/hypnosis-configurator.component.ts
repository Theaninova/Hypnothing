import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromPairs, merge} from 'lodash-es';
import {AuthorReference} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {TranceInduction} from '@wulkanat/hypnothing-core/lib/trance/trance-induction';
import {HypnosisTrigger} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger';
import {HypnosisSuggestion} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-suggestion';
import {HypnosisWaker} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-waker';
import {DataProvider} from '../data/data.provider';

export interface HypnosisSectionConfiguration<T extends HypnosisThing> {
  thing?: T;
  disabled?: boolean;
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

  inductionResults!: Promise<HypnosisThing[]>;

  triggerResults!: Promise<HypnosisThing[]>;

  configuration!: Promise<HypnosisFileConfiguration>;

  constructor(
    private formBuilder: FormBuilder,
    readonly dataProvider: DataProvider,
  ) {}

  merge = merge;

  stringify = JSON.stringify;

  ngOnInit() {
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

    new Promise<HypnosisSectionConfiguration<HypnosisSuggestion>[]>(
      async resolve => {
        const file = await this.hypnosisFile;
        if (!file) return resolve([]);

        resolve(
          (
            await this.dataProvider.getAll(file.suggestions.map(it => it.uuid))
          ).map(it => ({
            thing: it as HypnosisSuggestion,
          })),
        );
      },
    ).then(async it => ((await this.configuration).suggestions = it));
  }
}
