import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {AudioFile} from '@wulkanat/hypnothing-core/lib/audio';
import {initial, keyBy, last} from 'lodash-es';

// simplified version
const audioFiles = [
  'audio:induction:mind_melt:theania:en',
  'audio:trigger:rest_of_the_day:introduction:theania:en',
  'audio:trigger:rest_of_the_day:reminder:theania:en',
  'audio:trigger:string:introduction:theania:en',
  'audio:trigger:string:reminder:theania:en',
  'audio:file:gamer_files_shooter:introduction:theania:en',
  'audio:file:gamer_files_shooter:introduction:theania:de',
  'audio:file:gamer_files_shooter:introduction:theania:es',
  'audio:file:gamer_files_shooter:introduction:vive:en',
  'audio:safety:revert_if_too_intense:introduction:theania:en',
  'audio:safety:revert_if_too_intense:reminder:theania:en',
  'audio:safety:some_other_safety:introduction:theania:en',
  'audio:safety:some_other_safety:reminder:theania:en',
  'audio:suggestion:trance_when_you_die:overview:theania:en',
  'audio:suggestion:trance_when_you_die:introduction:theania:en',
  'audio:suggestion:trance_when_you_die:detailed:theania:en',
  'audio:suggestion:trance_when_you_die:reminder:theania:en',
];

export const AUDIO_FILES: Record<Uuid, AudioFile> = keyBy(
  audioFiles.map(file => ({
    speaker: {
      uuid: `author:${last(initial(file.split(':')))}`,
    },
    language: last(file.split(':'))!,
    src: 'assets/test.mp3', // TODO,
    type: 'audio file',
    binauralKeyframes: [
      {
        at: '00:00',
        in: 0.4,
        value: {
          volume: 'normal',
          wave: 'theta',
        },
      },
    ],
    noiseKeyframes: [
      {
        at: '00:00',
        in: 10,
        value: 'inherit',
      },
    ],
    uuid: file,
    translations: {
      en: {
        language: last(file.split(':'))!.toUpperCase(),
        type: 'Audio File' as never,
      },
      de: {
        language: last(file.split(':'))!.toUpperCase(),
        type: 'Audiodatei' as never,
      },
    },
  })),
  'uuid',
);
