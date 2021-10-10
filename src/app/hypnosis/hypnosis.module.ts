import {NgModule} from '@angular/core';
import {HypnosisConfiguratorComponent} from './hypnosis-configurator.component';
import {MatStepperModule} from '@angular/material/stepper';
import {HypnosisFileComponent} from './hypnosis-file.component';
import {MarkdownModule} from "ngx-markdown";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserModule} from "@angular/platform-browser";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {HypnosisComponentsModule} from "./components/hypnosis-components.module";

@NgModule({
  imports: [MatStepperModule, MarkdownModule, MatDividerModule, MatIconModule, MatFormFieldModule, BrowserModule, MatListModule, MatCardModule, MatChipsModule, ReactiveFormsModule, MatCheckboxModule, MatExpansionModule, HypnosisComponentsModule],
  exports: [
    HypnosisConfiguratorComponent,
    HypnosisFileComponent,
  ],
  declarations: [
    HypnosisConfiguratorComponent,
    HypnosisFileComponent,
  ],
})
export class HypnosisModule {
}
