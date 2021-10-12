import {Author, Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';

export const AUTHORS: Record<Uuid, Author> = {
  'author:theania': {
    givenName: 'Thea',
    familyName: 'Schöbl',
    additionalName: 'Theania',
    gender: 'Trans MtF',
    type: 'author',
    uuid: 'author:theania',
  },
  'author:vive': {
    givenName: 'Vincent',
    familyName: 'Vega',
    additionalName: 'ViVe',
    gender: 'male',
    type: 'author',
    uuid: 'author:vive',
  },
};
