import {Injectable} from "@angular/core";
import {Uuid} from "@wulkanat/hypnothing-core/lib/schema.org";
import {find} from "lodash-es";
import {MOCK_DATABASE} from "./mock-database/mock-database";
import {HypnosisThing, HypnosisTypeEnumerator, SpecificHypnosisType} from "@wulkanat/hypnothing-core/lib/hypnosis";

@Injectable({
  providedIn: 'root',
})
export class DataProvider {
  async search() {
    // TODO
  }

  async list<T extends HypnosisTypeEnumerator>(type: T): Promise<SpecificHypnosisType<T>[]> {
    return Object.values(MOCK_DATABASE[type]!) as SpecificHypnosisType<T>[];
  }

  async get<T extends HypnosisThing>(uuid: Uuid): Promise<T | undefined> {
    return find(MOCK_DATABASE, it => typeof it[uuid] !== 'undefined')?.[uuid] as T | undefined;
  }
}
