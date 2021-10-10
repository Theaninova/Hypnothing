import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MarkdownModule} from "ngx-markdown";
import {HypnosisSuggestionComponent} from "./hypnosis-suggestion.component";
import {CreativeWorkComponent} from "./creative-work.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

/**
 * NOTE: NONE of the components contain the title to remain flexible
 */
@NgModule({
  imports: [BrowserModule, MarkdownModule, MatButtonToggleModule],
  declarations: [HypnosisSuggestionComponent, CreativeWorkComponent],
  exports: [
    HypnosisSuggestionComponent
  ]
})
export class HypnosisComponentsModule {}
