import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {AudioFile} from '@wulkanat/hypnothing-core/lib/audio';
import {initial, keyBy, last} from 'lodash-es';

// simplified version
const audioFiles = [
  'audio:induction:mind_melt:theania:en',
  'audio:file:gamer_files_shooter:introduction:theania:en',
  'audio:file:gamer_files_shooter:introduction:theania:de',
  'audio:file:gamer_files_shooter:introduction:theania:es',
  'audio:file:gamer_files_shooter:introduction:vive:en',
  'audio:safety:revert_if_too_intense:introduction:theania:en',
  'audio:safety:revert_if_too_intense:reminder:theania:en',
  'audio:safety:some_other_safety:introduction:theania:en',
  'audio:safety:some_other_safety:reminder:theania:en',
];

export const AUDIO_FILES: Record<Uuid, AudioFile> = keyBy(
  audioFiles.map(file => ({
    speaker: {
      uuid: `author:${last(initial(file.split(':')))}`,
    },
    language: last(file.split(':'))!,
    src: 'TODO', // TODO,
    type: 'audio file',
    uuid: file,
  })),
  'uuid',
);
