import {Component, Input} from '@angular/core';
import {HypnosisSuggestion} from '@theaninova/hypnothing-core/lib/hypnosis/hypnosis-suggestion';

@Component({
  selector: 'hypnosis-suggestion',
  templateUrl: 'hypnosis-suggestion.html',
  styleUrls: ['hypnosis-suggestion.scss'],
})
export class HypnosisSuggestionComponent {
  @Input() suggestion!: HypnosisSuggestion;
}
