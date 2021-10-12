import {Component, Input} from '@angular/core';

@Component({
  selector: 'gender-icon',
  templateUrl: 'gender-icon.html',
  styleUrls: ['gender-icon.scss'],
})
export class GenderIconComponent {
  @Input() gender!: string;
}
