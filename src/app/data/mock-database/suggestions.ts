import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisSuggestion} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-suggestion';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const SUGGESTIONS: Record<Uuid, HypnosisSuggestion> = {
  'suggestion:trance_when_you_die:theania:en': {
    title: 'Fall into Trance when you die',
    description: `Makes you fall into a deep trance whenever you die`,
    warnings: [],
    safeties: [],
    content: {
      overviewIntroductionSrc: 'TODO', // TODO
      shortSrc: 'TODO', // TODO
      longSrc: 'TODO', // TODO
      summarySrc: 'TODO', // TODO
    },
    type: HypnosisType.SUGGESTION,
    language: 'en',
    translatedWorks: {
      de: 'uwtuwutwi',
      es: 'wjajjgag',
    },
    uuid: 'suggestion:trance_when_you_die:theania:en',
    isRequired: false,
    author: 'author:vive',
    speaker: 'author:theania',
  },
  'suggestion:feel_every_hit:theania:en': {
    title: 'Feel every hit',
    description: `Makes you **really** feel every hit, though it won't hurt`,
    warnings: ['hits can be intense'],
    safeties: ['hit strength is limited by your subconscious mind'],
    content: {
      overviewIntroductionSrc: 'TODO', // TODO
      shortSrc: 'TODO', // TODO
      longSrc: 'TODO', // TODO
      summarySrc: 'TODO', // TODO
    },
    type: HypnosisType.SUGGESTION,
    language: 'en',
    translatedWorks: {},
    uuid: 'suggestion:feel_every_hit:theania:en',
    isRequired: false,
    author: 'author:vive',
    speaker: 'author:theania',
  },
  'suggestion:get_dizzy_when_low:theania:en': {
    title: 'Get dizzy when low',
    description: `When your health gets low, you start getting dizzy, your vision gets blurry, and it becomes difficult to think.`,
    warnings: [],
    safeties: [],
    content: {
      overviewIntroductionSrc: 'TODO', // TODO
      shortSrc: 'TODO', // TODO
      longSrc: 'TODO', // TODO
      summarySrc: 'TODO', // TODO
    },
    type: HypnosisType.SUGGESTION,
    language: 'en',
    translatedWorks: {},
    uuid: 'suggestion:get_dizzy_when_low:theania:en',
    isRequired: false,
    author: 'author:vive',
    speaker: 'author:theania',
  },
  'suggestion:get_rewarded_for_special_kills:theania:en': {
    title: 'Get rewarded for special kills',
    description: `Whenever you get a special kill, like a headshot, you get rewarded by a small burst of pleasure and it gets easier to focus.`,
    warnings: [],
    safeties: [],
    content: {
      overviewIntroductionSrc: 'TODO', // TODO
      shortSrc: 'TODO', // TODO
      longSrc: 'TODO', // TODO
      summarySrc: 'TODO', // TODO
    },
    type: HypnosisType.SUGGESTION,
    language: 'en',
    translatedWorks: {},
    uuid: 'suggestion:get_rewarded_for_special_kills:theania:en',
    isRequired: false,
    author: 'author:vive',
    speaker: 'author:theania',
  },
  'suggestion:get_rewarded_for_achievements_and_accomplishments:theania:en': {
    title: 'Get rewarded for achievements and accomplishements',
    description: `Whenever you achieve something big in your game, you get rewarded by a big burst of pleasure, motivating you to keep going.`,
    warnings: [],
    safeties: [],
    content: {
      overviewIntroductionSrc: 'TODO', // TODO
      shortSrc: 'TODO', // TODO
      longSrc: 'TODO', // TODO
      summarySrc: 'TODO', // TODO
    },
    type: HypnosisType.SUGGESTION,
    language: 'en',
    translatedWorks: {},
    uuid: 'suggestion:get_rewarded_for_achievements_and_accomplishments:theania:en',
    isRequired: false,
    author: 'author:vive',
    speaker: 'author:theania',
  },
};
