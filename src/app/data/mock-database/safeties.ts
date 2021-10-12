import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisSafetyGuard} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-safety';

export const SAFETIES: Record<Uuid, HypnosisSafetyGuard> = {
  'safety:revert_if_too_intense': {
    title: 'Never too Intense',
    author: {uuid: 'author:theania'},
    uuid: 'safety:revert_if_too_intense',
    canBeDisabled: false,
    type: 'safety',
    description:
      'If at any point the effects become too intense, you will instantly revert back to normal.',
    audio: [
      [{uuid: 'audio:safety:revert_if_too_intense:introduction:theania:en'}],
      [{uuid: 'audio:safety:revert_if_too_intense:reminder:theania:en'}],
    ],
    spokenLanguages: {
      en: [{uuid: 'author:theania'}],
    },
    tags: ['limiter'],
  },
  'safety:some_other_safety': {
    title: 'Some other safety',
    author: {uuid: 'author:vive'},
    uuid: 'safety:some_other_safety',
    canBeDisabled: true,
    type: 'safety',
    description:
      'If at any point the effects become too intense, you will instantly revert back to normal.',
    audio: [
      [{uuid: 'audio:safety:some_other_safety:introduction:theania:en'}],
      [{uuid: 'audio:safety:some_other_safety:reminder:theania:en'}],
    ],
    spokenLanguages: {
      en: [{uuid: 'author:theania'}],
    },
    tags: ['other', 'tags'],
  },
};
