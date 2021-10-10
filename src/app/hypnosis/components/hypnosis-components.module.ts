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
import {MatDividerModule} from "@angular/material/divider";
import {HypnosisSafetyComponent} from "./hypnosis-safety.component";

/**
 * NOTE: NONE of the components contain the title to remain flexible
 */
@NgModule({
  imports: [BrowserModule, MarkdownModule, MatButtonToggleModule, MatCardModule, MatIconModule, MatGridListModule, MatChipsModule, MatTableModule, MatDividerModule],
  declarations: [HypnosisSuggestionComponent, CreativeWorkComponent, AuthorComponent, HypnosisSafetyComponent],
  exports: [
    HypnosisSuggestionComponent,
    HypnosisSafetyComponent
  ]
})
export class HypnosisComponentsModule {}
