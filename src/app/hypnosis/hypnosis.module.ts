import {NgModule} from '@angular/core';
import {HypnosisConfiguratorComponent} from './hypnosis-configurator.component';
import {MatStepperModule} from '@angular/material/stepper';
import {HypnosisFileComponent} from './hypnosis-file.component';
import {MarkdownModule} from "ngx-markdown";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  imports: [MatStepperModule, MarkdownModule, MatDividerModule],
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
