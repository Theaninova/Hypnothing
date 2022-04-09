import {Component, Input} from '@angular/core';
import {CreativeWork} from '@theaninova/hypnothing-core/lib/schema.org';

@Component({
  selector: 'creative-work',
  templateUrl: 'creative-work.html',
  styleUrls: ['creative-work.scss'],
})
export class CreativeWorkComponent {
  @Input() creativeWork!: CreativeWork;

  @Input() includeTitle = true;
}
