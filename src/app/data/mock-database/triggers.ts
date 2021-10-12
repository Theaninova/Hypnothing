import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisTrigger} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger';

export const TRIGGERS: Record<Uuid, HypnosisTrigger> = {
  'trigger:rest_of_the_day': {
    title: 'Rest of the day',
    description: 'A trigger that lasts for the rest of the day',
    author: {uuid: 'author:vive'},
    uuid: 'trigger:rest_of_the_day',
    tags: [],
    type: 'trigger',
    triggerType: 'time limited',
    audio: [[], []], // TODO
    spokenLanguages: {
      en: [{uuid: 'author:theania'}],
    },
  },
};
