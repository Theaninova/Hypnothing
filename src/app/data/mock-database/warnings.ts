import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisWarning} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-warning';

export const WARNINGS: Record<Uuid, HypnosisWarning> = {
  'warning:dummy': {
    title: 'This is a dummy warning',
    description: `Because I didn't find anything better, I made a dummy warning.`,
    tags: ['dummy'],
    uuid: 'warning:dummy',
    author: {uuid: 'author:theania'},
    type: 'warning',
    translations: {},
  },
};
