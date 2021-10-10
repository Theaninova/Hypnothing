import {NgModule} from '@angular/core';
import {HypnosisConfiguratorComponent} from './hypnosis-configurator.component';
import {MatStepperModule} from '@angular/material/stepper';
import {HypnosisFileComponent} from './hypnosis-file.component';

@NgModule({
  imports: [MatStepperModule],
  exports: [HypnosisConfiguratorComponent],
  declarations: [HypnosisConfiguratorComponent, HypnosisFileComponent],
})
export class HypnosisModule {}
