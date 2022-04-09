import {Pipe, PipeTransform} from '@angular/core';
import {DataProvider} from './data.provider';
import {
  HypnosisThing,
  HypnosisTypeEnumerator,
  SpecificHypnosisType,
} from '@theaninova/hypnothing-core/lib/hypnosis';
import {Reference} from '@theaninova/hypnothing-core/lib/util';

@Pipe({
  name: 'fetch',
  pure: true,
})
export class FetchPipe implements PipeTransform {
  constructor(readonly dataProvider: DataProvider) {}

  async transform<T extends HypnosisTypeEnumerator>(
    reference: Reference<HypnosisThing, never>,
    _type: T,
  ): Promise<SpecificHypnosisType<T>> {
    return (await this.dataProvider.get(
      reference.uuid,
    )) as SpecificHypnosisType<T>;
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
