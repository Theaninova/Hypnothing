import {NgModule} from '@angular/core';
import {HypnosisListItemComponent} from './hypnosis-list-item.component';
import {CreativeWorkListItemComponent} from './creative-work-list-item.component';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserModule} from '@angular/platform-browser';
import {InductionListItemComponent} from './induction-list-item.component';

@NgModule({
  declarations: [
    HypnosisListItemComponent,
    CreativeWorkListItemComponent,
    InductionListItemComponent,
  ],
  imports: [MatChipsModule, BrowserModule],
  exports: [HypnosisListItemComponent],
})
export class ListItemsModule {}
