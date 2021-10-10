import {Pipe, PipeTransform} from "@angular/core";
import {Author, Uuid} from "@wulkanat/hypnothing-core/lib/schema.org";
import {DataProvider} from "./data.provider";
import {HypnosisTypeEnumerator, SpecificHypnosisType} from "@wulkanat/hypnothing-core/lib/hypnosis";

@Pipe({
  name: 'fetch',
  pure: true,
})
export class FetchPipe implements PipeTransform {
  constructor(readonly dataProvider: DataProvider) {
  }

  async transform<T extends HypnosisTypeEnumerator>(uuid: Uuid, type: T): Promise<SpecificHypnosisType<T>> {
    return await this.dataProvider.get(uuid) as SpecificHypnosisType<T>;
  }
}

@Pipe({
  name: 'fetchAll',
  pure: true,
})
export class FetchAllPipe implements PipeTransform {
  constructor(readonly dataProvider: DataProvider) {
  }

  transform<T extends HypnosisTypeEnumerator>(uuids: Uuid[], type: T): Promise<SpecificHypnosisType<T>>[] {
    return uuids.map(uuid => this.dataProvider.get(uuid) as Promise<SpecificHypnosisType<T>>);
  }
}
