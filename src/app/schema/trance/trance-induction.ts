import {CreativeWork} from "../schema.org";
import {TranceDepth, TranceSection} from "./trance";

export interface TranceInduction extends CreativeWork, TranceSection {
  src: string;
  tranceDepthRating: TranceDepth;
}
