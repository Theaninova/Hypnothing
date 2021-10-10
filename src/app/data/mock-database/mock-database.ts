import {HypnosisType} from "@wulkanat/hypnothing-core/lib/hypnosis";
import {AUTHORS} from "./authors";
import {SUGGESTIONS} from "./suggestions";
import {SAFETIES} from "./safeties";
import {FILES} from "./files";
import {TRIGGERS} from "./triggers";
import {INDUCTIONS} from "./inductions";
import {WARNINGS} from "./warnings";
import {WAKERS} from "./wakers";

export const MOCK_DATABASE = {
  [HypnosisType.AUTHOR]: AUTHORS,
  [HypnosisType.SUGGESTION]: SUGGESTIONS,
  [HypnosisType.SAFETY]: SAFETIES,
  [HypnosisType.FILE]: FILES,
  [HypnosisType.TRIGGER]: TRIGGERS,
  [HypnosisType.INDUCTION]: INDUCTIONS,
  [HypnosisType.WARNING]: WARNINGS,
  [HypnosisType.WAKER]: WAKERS,
}
