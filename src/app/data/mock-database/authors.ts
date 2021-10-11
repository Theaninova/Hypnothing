import {Author, Gender, Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const AUTHORS: Record<Uuid, Author> = {
  'author:theania': {
    givenName: 'Thea',
    familyName: 'Schöbl',
    additionalName: 'Theania',
    gender: 'Trans MtF',
    type: HypnosisType.AUTHOR,
    uuid: 'author:theania',
  },
  'author:vive': {
    givenName: 'Vincent',
    familyName: 'Vega',
    additionalName: 'ViVe',
    gender: Gender.Male,
    type: HypnosisType.AUTHOR,
    uuid: 'author:vive',
  },
};
