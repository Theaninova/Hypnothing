import {CreativeWork} from "../schema.org";
import {TranceSection, TranceWithShortLongAndSummary} from "../trance/trance";

export interface HypnosisSuggestion extends CreativeWork, TranceSection {
  isRequired?: true;
  choices: TranceWithShortLongAndSummary | HypnosisSuggestion[];
}
