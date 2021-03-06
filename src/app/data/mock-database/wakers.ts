import {Uuid} from '@theaninova/hypnothing-core/lib/schema.org';
import {HypnosisWaker} from '@theaninova/hypnothing-core/lib/hypnosis/hypnosis-waker';

export const WAKERS: Record<Uuid, HypnosisWaker> = {
  'waker:count_up_long': {
    title: 'Count Up Long',
    description: 'Counting up from 0 to 10 and taking you back into reality.',
    author: {uuid: 'author:vive'},
    type: 'waker',
    uuid: 'waker:count_up_long',
    audio: [[]], // TODO
    translations: {},
  },
};
