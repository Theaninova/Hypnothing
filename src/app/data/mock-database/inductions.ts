import {TranceInduction} from '@wulkanat/hypnothing-core/lib/trance/trance-induction';
import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {
  BinauralWaveChoice,
  VolumeChoice,
} from '@wulkanat/hypnothing-core/lib/audio';

export const INDUCTIONS: Record<Uuid, TranceInduction> = {
  'induction:mind_melt:theania:en': {
    title: 'Mind Melt',
    description: `You breathe an anesthetic, that slowly melts your mind. At the end, you'll be put into a virtual you.`,
    speaker: 'author:theania',
    author: 'author:vive',
    uuid: 'induction:mind_melt:theania:en',
    language: 'en',
    translatedWorks: {},
    tags: ['virtual you'],
    tranceDepthRating: 1,
    src: 'TODO', // TODO
    type: HypnosisType.INDUCTION,
    binauralKeyframes: [
      {
        at: '00:00',
        in: 10,
        value: {
          volume: VolumeChoice.INHERIT,
          wave: BinauralWaveChoice.THETA,
        },
      },
    ],
    noiseKeyframes: [
      {
        at: '00:00',
        in: 10,
        value: VolumeChoice.INHERIT,
      },
    ],
  },
};
