import {TranceInduction} from '@wulkanat/hypnothing-core/lib/trance/trance-induction';
import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
export const INDUCTIONS: Record<Uuid, TranceInduction> = {
  'induction:mind_melt': {
    title: 'Mind Melt',
    description: `You breathe an anesthetic, that slowly melts your mind. At the end, you'll be put into a virtual you.`,
    author: {uuid: 'author:vive'},
    uuid: 'induction:mind_melt',
    tags: ['virtual you'],
    tranceDepthRating: 1,
    audioOptions: [
      {
        uuid: 'audio:induction:mind_melt:theania:en',
        language: 'en',
        speaker: {uuid: 'author:theania'},
      },
    ],
    type: 'induction',
    binauralKeyframes: [
      {
        at: '00:00',
        in: 10,
        value: {
          volume: 'inherit',
          wave: 'theta',
        },
      },
    ],
    noiseKeyframes: [
      {
        at: '00:00',
        in: 10,
        value: 'inherit',
      },
    ],
  },
};
