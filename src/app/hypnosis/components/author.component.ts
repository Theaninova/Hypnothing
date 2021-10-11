import {Component, Input} from '@angular/core';
import {Author} from '@wulkanat/hypnothing-core/lib/schema.org';

@Component({
  selector: 'author',
  templateUrl: 'author.html',
  styleUrls: ['author.scss'],
})
export class AuthorComponent {
  @Input() author!: Promise<Author | undefined>;
}
