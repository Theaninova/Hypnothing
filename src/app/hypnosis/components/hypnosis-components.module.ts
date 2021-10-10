import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {MarkdownModule} from "ngx-markdown";
import {HypnosisSuggestionComponent} from "./hypnosis-suggestion.component";
import {CreativeWorkComponent} from "./creative-work.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {AuthorComponent} from "./author.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import {MatTableModule} from "@angular/material/table";

/**
 * NOTE: NONE of the components contain the title to remain flexible
 */
@NgModule({
  imports: [BrowserModule, MarkdownModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatGridListModule, MatChipsModule, MatTableModule],
  declarations: [HypnosisSuggestionComponent, CreativeWorkComponent, AuthorComponent],
  exports: [
    HypnosisSuggestionComponent
  ]
})
export class HypnosisComponentsModule {}
