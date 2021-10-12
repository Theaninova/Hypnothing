import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MarkdownModule} from 'ngx-markdown';
import {HypnosisSuggestionComponent} from './hypnosis-suggestion.component';
import {CreativeWorkComponent} from './creative-work.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {AuthorComponent} from './author.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {HypnosisSafetyComponent} from './hypnosis-safety.component';
import {HypnosisFileComponent} from './hypnosis-file.component';
import {DataModule} from '../../data/data.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {UtilModule} from '../../util/util.module';
import {AvailabilityComponent} from './availability.component';
import {GenderIconComponent} from './gender-icon.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms';

/**
 * NOTE: NONE of the components contain the title to remain flexible
 */
@NgModule({
  imports: [
    BrowserModule,
    MarkdownModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
    MatTableModule,
    MatDividerModule,
    DataModule,
    MatProgressSpinnerModule,
    UtilModule,
    BrowserModule,
    MatProgressBarModule,
    FormsModule,
  ],
  declarations: [
    HypnosisSuggestionComponent,
    CreativeWorkComponent,
    AuthorComponent,
    HypnosisFileComponent,
    HypnosisSafetyComponent,
    GenderIconComponent,
    AvailabilityComponent,
  ],
  exports: [
    HypnosisSuggestionComponent,
    HypnosisSafetyComponent,
    HypnosisFileComponent,
    CreativeWorkComponent,
    AvailabilityComponent,
  ],
})
export class HypnosisComponentsModule {}
