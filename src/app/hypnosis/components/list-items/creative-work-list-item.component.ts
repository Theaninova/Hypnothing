import {Component, Input} from '@angular/core';
import {CreativeWork} from '@theaninova/hypnothing-core/lib/schema.org';

@Component({
  selector: 'creative-work-list-item',
  templateUrl: 'creative-work-list-item.html',
  styleUrls: ['creative-work-list-item.scss'],
})
export class CreativeWorkListItemComponent {
  @Input() item!: CreativeWork;
}
