import {NgModule} from '@angular/core';
import {HypnosisConfiguratorComponent} from './hypnosis-configurator.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MarkdownModule} from 'ngx-markdown';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserModule} from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {HypnosisComponentsModule} from './components/hypnosis-components.module';
import {DataModule} from '../data/data.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SearchModule} from '../data/search/search.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ListItemsModule} from './components/list-items/list-items.module';

@NgModule({
  imports: [
    MatStepperModule,
    MarkdownModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    HypnosisComponentsModule,
    DataModule,
    MatProgressSpinnerModule,
    SearchModule,
    DragDropModule,
    ListItemsModule,
  ],
  exports: [HypnosisConfiguratorComponent],
  declarations: [HypnosisConfiguratorComponent],
})
export class HypnosisModule {}
