import {TranceInduction} from '@theaninova/hypnothing-core/lib/trance/trance-induction';
import {Uuid} from '@theaninova/hypnothing-core/lib/schema.org';
export const INDUCTIONS: Record<Uuid, TranceInduction> = {
  'induction:mind_melt': {
    title: 'Mind Melt',
    description: `You breathe an anesthetic, that slowly melts your mind. At the end, you'll be put into a virtual you.`,
    author: {uuid: 'author:vive'},
    uuid: 'induction:mind_melt',
    tags: ['virtual you'],
    tranceDepthRating: 1,
    audio: [
      [
        {
          uuid: 'audio:induction:mind_melt:theania:en',
          language: 'en',
          speaker: {uuid: 'author:theania'},
        },
      ],
    ],
    type: 'induction',
    translations: {
      de: {
        title: 'Gehirnschmelze',
        description:
          'Du atmest ein Nervengas ein, das langsam deine Gehirn verschmilzt.',
        type: 'Induktion' as never,
      },
    },
  },
};
