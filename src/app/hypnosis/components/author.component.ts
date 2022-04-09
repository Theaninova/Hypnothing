import {Component, Input} from '@angular/core';
import {Author} from '@theaninova/hypnothing-core/lib/schema.org';

@Component({
  selector: 'author',
  templateUrl: 'author.html',
  styleUrls: ['author.scss'],
})
export class AuthorComponent {
  @Input() author!: Author;
}
