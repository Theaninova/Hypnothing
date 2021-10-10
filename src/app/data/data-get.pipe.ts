import {Pipe, PipeTransform} from "@angular/core";
import {Author, Uuid} from "@wulkanat/hypnothing-core/lib/schema.org";
import {DataProvider} from "./data.provider";
import {HypnosisSafetyGuard} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-safety";
import {HypnosisFile} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file";
import {TranceInduction} from "@wulkanat/hypnothing-core/lib/trance/trance-induction";
import {HypnosisSuggestion} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-suggestion";
import {HypnosisTrigger} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger";
import {HypnosisWaker} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-waker";
import {HypnosisWarning} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-warning";

export type SpecificHypnosisType<T> =
  T extends 'author' ? Author :
    T extends 'file' ? HypnosisFile :
      T extends 'induction' ? TranceInduction :
        T extends 'safety' ? HypnosisSafetyGuard :
          T extends 'suggestion' ? HypnosisSuggestion :
            T extends 'trigger' ? HypnosisTrigger :
              T extends 'waker' ? HypnosisWaker :
                T extends 'warning' ? HypnosisWarning : never;

export type HypnosisTypeEnumerator = 'author'
  | 'file'
  | 'induction'
  | 'safety'
  | 'suggestion'
  | 'trigger'
  | 'waker'
  | 'warning';

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
