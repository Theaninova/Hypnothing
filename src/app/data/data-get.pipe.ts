import {Pipe, PipeTransform} from '@angular/core';
import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {DataProvider} from './data.provider';
import {
  HypnosisThing,
  HypnosisTypeEnumerator,
  SpecificHypnosisType,
} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {Reference} from '@wulkanat/hypnothing-core/lib/util';

@Pipe({
  name: 'fetch',
  pure: true,
})
export class FetchPipe implements PipeTransform {
  constructor(readonly dataProvider: DataProvider) {}

  async transform<T extends HypnosisTypeEnumerator>(
    uuid: Uuid,
    _type: T,
  ): Promise<SpecificHypnosisType<T>> {
    return (await this.dataProvider.get(uuid)) as SpecificHypnosisType<T>;
  }
}

@Pipe({
  name: 'fetchAll',
  pure: true,
})
export class FetchAllPipe implements PipeTransform {
  constructor(readonly dataProvider: DataProvider) {}

  transform<T extends HypnosisTypeEnumerator>(
    references: Reference<HypnosisThing, never>[],
    _type: T,
  ): Promise<SpecificHypnosisType<T>>[] {
    return references.map(
      reference =>
        this.dataProvider.get(reference.uuid) as Promise<
          SpecificHypnosisType<T>
        >,
    );
  }
}
