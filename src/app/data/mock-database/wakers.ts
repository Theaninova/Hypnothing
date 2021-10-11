import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisWaker} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-waker';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const WAKERS: Record<Uuid, HypnosisWaker> = {
  'waker:count_up_long:theania:en': {
    title: 'Count Up Long',
    description: 'Counting up from 0 to 10 and taking you back into reality.',
    language: 'en',
    translatedWorks: {},
    speaker: 'author:theania',
    author: 'author:vive',
    type: HypnosisType.WAKER,
    uuid: 'waker:count_up_long:theania:en',
    src: 'TODO', // TODO
  },
};
