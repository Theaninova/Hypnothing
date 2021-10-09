import {CreativeWork} from "../schema.org";
import {TranceWithIntroductionAndReminder} from "../trance/trance";

export interface HypnosisTrigger extends CreativeWork, TranceWithIntroductionAndReminder {
  type: 'trigger' | 'time' | 'curse' | string;
}
