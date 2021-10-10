import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {AudioModule} from './audio/audio.module';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {HypnosisModule} from './hypnosis/hypnosis.module';
import {MarkdownModule} from "ngx-markdown";
import {HypnosisComponentsModule} from "./hypnosis/components/hypnosis-components.module";
import {DataModule} from "./data/data.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AudioModule,
    BrowserAnimationsModule,
    BrowserModule,
    HypnosisModule,
    MarkdownModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    HypnosisComponentsModule,
    DataModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
