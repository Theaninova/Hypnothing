import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisSafetyGuard} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-safety';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const SAFETIES: Record<Uuid, HypnosisSafetyGuard> = {
  'safety:revert_if_too_intense:theania:en': {
    title: 'Never too Intense',
    speaker: 'author:vive',
    author: 'author:theania',
    uuid: 'safety:revert_if_too_intense:theania:en',
    canBeDisabled: false,
    type: HypnosisType.SAFETY,
    language: 'en',
    translatedWorks: {},
    description:
      'If at any point the effects become too intense, you will instantly revert back to normal.',
    introductionSrc: 'TODO',
    reminderSrc: 'TODO',
    tags: ['limiter'],
  },
  'safety:some_other_safety:theania:en': {
    title: 'Some other safety',
    speaker: 'author:theania',
    author: 'author:vive',
    uuid: 'safety:some_other_safety:theania:en',
    canBeDisabled: true,
    type: HypnosisType.SAFETY,
    language: 'en',
    translatedWorks: {},
    description:
      'If at any point the effects become too intense, you will instantly revert back to normal.',
    introductionSrc: 'TODO',
    reminderSrc: 'TODO',
    tags: ['other', 'tags'],
  },
};
