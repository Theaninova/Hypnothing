import {NgModule} from '@angular/core';
import {FetchAllPipe, FetchPipe} from './data-get.pipe';

@NgModule({
  declarations: [FetchPipe, FetchAllPipe],
  exports: [FetchPipe, FetchAllPipe],
})
export class DataModule {}
