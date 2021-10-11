import {Component, Input, OnInit} from '@angular/core';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fromPairs} from 'lodash-es';
import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
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
  styleUrls: ['hypnosis-configurator.scss', '../util/drag-drop-list.scss'],
})
export class HypnosisConfiguratorComponent implements OnInit {
  @Input() hypnosisFile!: Promise<HypnosisFile | undefined>;

  suggestionsFormGroup!: Promise<FormGroup>;

  inductions: HypnosisThing[] = [];

  constructor(private formBuilder: FormBuilder) {}

  drop(event: CdkDragDrop<HypnosisThing[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

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
}
