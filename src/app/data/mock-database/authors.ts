import {Author, Uuid} from '@theaninova/hypnothing-core/lib/schema.org';

export const AUTHORS: Record<Uuid, Author> = {
  'author:theania': {
    givenName: 'Thea',
    familyName: 'Schöbl',
    additionalName: 'Theania',
    gender: 'Trans MtF',
    type: 'author',
    uuid: 'author:theania',
    translations: {
      en: {
        gender: 'trans MtF',
        type: 'author',
      },
      de: {
        gender: 'Trans MzF',
        type: 'Autor' as never,
      },
    },
  },
  'author:vive': {
    givenName: 'Vincent',
    familyName: 'Vega',
    additionalName: 'ViVe',
    gender: 'male',
    type: 'author',
    uuid: 'author:vive',
    translations: {
      en: {
        gender: 'male',
        type: 'author',
      },
      de: {
        gender: 'Mann',
        type: 'Autor' as never,
      },
    },
  },
};
