import {NgModule} from '@angular/core';
import {HypnosisListItemComponent} from './hypnosis-list-item.component';
import {CreativeWorkListItemComponent} from './creative-work-list-item.component';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserModule} from '@angular/platform-browser';
import {InductionListItemComponent} from './induction-list-item.component';
import {HypnosisComponentsModule} from '../hypnosis-components.module';
import {TriggerListItemComponent} from './trigger-list-item.component';

@NgModule({
  declarations: [
    HypnosisListItemComponent,
    TriggerListItemComponent,
    CreativeWorkListItemComponent,
    InductionListItemComponent,
  ],
  imports: [MatChipsModule, BrowserModule, HypnosisComponentsModule],
  exports: [HypnosisListItemComponent],
})
export class ListItemsModule {}
