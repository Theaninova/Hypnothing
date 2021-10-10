import {NgModule} from '@angular/core';
import {BinauralBeatConfigComponent} from './binaural-beat-config.component';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [BinauralBeatConfigComponent],
  exports: [BinauralBeatConfigComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatTableModule,
  ],
})
export class AudioModule {}
