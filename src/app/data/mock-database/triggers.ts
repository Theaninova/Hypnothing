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
    audio: [
      [
        {
          uuid: 'audio:trigger:rest_of_the_day:introduction:theania:en',
          language: 'en',
          speaker: {uuid: 'author:theania'},
        },
      ],
      [
        {
          uuid: 'audio:trigger:rest_of_the_day:reminder:theania:en',
          language: 'en',
          speaker: {uuid: 'author:theania'},
        },
      ],
    ],
    translations: {},
  },
  'trigger:string': {
    title: 'String Trigger',
    description: 'A trigger that is activated when you wear a piece of string',
    author: {uuid: 'author:vive'},
    uuid: 'trigger:string',
    tags: [],
    type: 'trigger',
    triggerType: 'triggered',
    audio: [
      [
        {
          uuid: 'audio:trigger:string:introduction:theania:en',
          language: 'en',
          speaker: {uuid: 'author:theania'},
        },
      ],
      [
        {
          uuid: 'audio:trigger:string:reminder:theania:en',
          language: 'en',
          speaker: {uuid: 'author:theania'},
        },
      ],
    ],
    translations: {},
  },
};
