import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisWarning} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-warning';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const WARNINGS: Record<Uuid, HypnosisWarning> = {
  'warning:dummy': {
    title: 'This is a dummy warning',
    description: `Because I didn't find anything better, I made a dummy warning.`,
    tags: ['dummy'],
    uuid: 'warning:dummy',
    author: 'author:theania',
    language: 'en',
    translatedWorks: {},
    type: HypnosisType.WARNING,
  },
};
