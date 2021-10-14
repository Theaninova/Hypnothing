import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {FormBuilder} from '@angular/forms';
import {merge} from 'lodash-es';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {HypnosisSuggestion} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-suggestion';
import {DataProvider} from '../data/data.provider';
import {
  HypnosisFileConfiguration,
  HypnosisSectionConfiguration,
} from '../audio/hypnosis-file-config';

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
        safeties: [],
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
