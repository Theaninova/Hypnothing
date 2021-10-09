import {CreativeWork} from "../schema.org";
import {HypnosisSafetyGuard} from "./hypnosis-safety";
import {TranceDepth} from "../trance/trance";
import {HypnosisSuggestion} from "./hypnosis-suggestion";

interface HypnosisFile extends CreativeWork {
  overviewSrc: string;
  safeties: HypnosisSafetyGuard[];
  suggestions: HypnosisSuggestion[];
  goodbyeSrc?: string;

  minimumTranceDepth: TranceDepth;
  preferredTranceDepth: TranceDepth;
}
