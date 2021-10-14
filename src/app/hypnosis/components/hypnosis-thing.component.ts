import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {merge} from 'lodash-es';
import {
  AudioOptions,
  ThingWithAudio,
} from '@wulkanat/hypnothing-core/lib/audio';
import {HypnosisSectionConfiguration} from '../../audio/hypnosis-file-config';

@Component({
  selector: 'hypnosis-thing',
  templateUrl: 'hypnosis-thing.html',
  styleUrls: ['hypnosis-thing.scss'],
})
export class HypnosisThingComponent implements OnChanges {
  @Input() item?: HypnosisThing | null;

  @Input() showAvailability = false;

  @Output() availabilityChanged = new EventEmitter<
    HypnosisSectionConfiguration<HypnosisThing>
  >();

  selection?: HypnosisSectionConfiguration<HypnosisThing>;

  ngOnChanges(changes: SimpleChanges) {
    if ('item' in changes) {
      this.selection = {
        thing: this.item ?? undefined,
      };
    }
  }

  hasAudio(): boolean {
    return Array.isArray(
      (this.item as ThingWithAudio<AudioOptions[]> | undefined)?.audio,
    );
  }

  emit(selection: Partial<HypnosisSectionConfiguration<HypnosisThing>>) {
    this.selection = merge(this.selection, selection);
    this.availabilityChanged.emit(this.selection);
  }
}
