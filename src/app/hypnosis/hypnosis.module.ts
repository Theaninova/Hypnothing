import {NgModule} from "@angular/core";
import {HypnosisConfiguratorComponent} from "./hypnosis-configurator.component";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  imports: [
    MatStepperModule
  ],
  exports: [
    HypnosisConfiguratorComponent
  ],
  declarations: [HypnosisConfiguratorComponent]
})
export class HypnosisModule {}
