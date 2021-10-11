import {NgModule} from '@angular/core';
import {SearchComponent} from './search.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserModule} from '@angular/platform-browser';
import {UtilModule} from '../../util/util.module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [SearchComponent],
  exports: [SearchComponent],
  imports: [
    MatPaginatorModule,
    MatListModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    BrowserModule,
    UtilModule,
    DragDropModule,
  ],
})
export class SearchModule {}
