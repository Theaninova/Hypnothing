import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSliderModule,
        MatRadioModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
