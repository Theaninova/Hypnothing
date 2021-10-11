import {NgModule} from '@angular/core';
import {KeysPipe, MapPipe, ValuesPipe} from './map.pipe';

@NgModule({
  declarations: [MapPipe, KeysPipe, ValuesPipe],
  exports: [MapPipe],
})
export class UtilModule {}
