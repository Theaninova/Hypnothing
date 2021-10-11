import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisTrigger} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const TRIGGERS: Record<Uuid, HypnosisTrigger> = {
  'trigger:rest_of_the_day:theania:en': {
    title: 'Rest of the day',
    description: 'A trigger that lasts for the rest of the day',
    author: 'author:vive',
    speaker: 'author:theania',
    uuid: 'trigger:rest_of_the_day:theania:en',
    translatedWorks: {},
    language: 'en',
    tags: [],
    type: HypnosisType.TRIGGER,
    triggerType: 'time limited',
    reminderSrc: 'TODO', // TODO
    introductionSrc: 'TODO', // TODO
  },
};
