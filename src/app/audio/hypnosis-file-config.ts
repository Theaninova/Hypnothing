import {HypnosisThing} from '@wulkanat/hypnothing-core/lib/hypnosis';
import {
  AuthorReference,
  CreativeWork,
  Uuid,
} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {TranceInduction} from '@wulkanat/hypnothing-core/lib/trance/trance-induction';
import {HypnosisTrigger} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-trigger';
import {HypnosisSuggestion} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-suggestion';
import {HypnosisSafetyGuard} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-safety';
import {HypnosisWaker} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-waker';
import {isThingWithAudio} from '@wulkanat/hypnothing-core/lib/audio';

export interface HypnosisSectionConfiguration<T extends HypnosisThing> {
  thing?: T;
  disabled?: boolean;
  language?: string;
  speaker?: AuthorReference;
}

export interface HypnosisFileConfiguration {
  includeBinaural: boolean;
  includeBackground: boolean;
  file: HypnosisSectionConfiguration<HypnosisFile>;
  inductions: HypnosisSectionConfiguration<TranceInduction>[];
  trigger: HypnosisSectionConfiguration<HypnosisTrigger>;
  suggestions: HypnosisSectionConfiguration<HypnosisSuggestion>[];
  safeties: HypnosisSectionConfiguration<HypnosisSafetyGuard>[];
  waking: HypnosisSectionConfiguration<HypnosisWaker>[];
}

export interface HypnosisAudioQueueElement {
  uuid: Uuid;
  source: HypnosisThing;
  speaker: AuthorReference;
  language: string;
}

/**
 *
 */
function add<T extends HypnosisThing>(
  array: HypnosisAudioQueueElement[],
  config: HypnosisSectionConfiguration<T>,
  indices: number[],
) {
  if (
    config.disabled === true ||
    !config.thing ||
    !isThingWithAudio(config.thing)
  ) {
    return;
  }

  for (const i of indices) {
    const file = config.thing.audio[i]?.find(
      it =>
        it.language === config.language &&
        it.speaker.uuid === config.speaker?.uuid,
    );

    if (!file) {
      if (!config.language || !config.speaker) {
        console.error(
          `'${
            (config.thing as unknown as CreativeWork)?.title
          }' is has an incomplete configuration`,
        );
      } else {
        console.error(
          `'${
            (config.thing as unknown as CreativeWork)?.title
          }' is not available in ${config.language} from ${
            config.speaker?.uuid
          }`,
        );
      }
      continue;
    }

    array.push({
      uuid: file.uuid,
      source: config.thing,
      language: config.language!,
      speaker: config.speaker!,
    });
  }
}

/**
 *
 */
export function composeAudioFileUuidsFromConfig(
  config: HypnosisFileConfiguration,
): HypnosisAudioQueueElement[] {
  const uuids: HypnosisAudioQueueElement[] = [];

  add(uuids, config.file, [0]); // introduction
  config.suggestions.map(it => add(uuids, it, [0])); // suggestion overview
  config.inductions.map(it => add(uuids, it, [0])); // inductions
  add(uuids, config.trigger, [0]); // trigger introduction
  config.safeties.map(it => add(uuids, it, [0])); // safeties introduction
  config.suggestions.map(it => add(uuids, it, [0])); // suggestions overview
  config.suggestions.map(it => add(uuids, it, [1])); // suggestions short descriptions
  config.suggestions.map(it => add(uuids, it, [2])); // suggestions long, extensive description
  config.suggestions.map(it => add(uuids, it, [3])); // suggestions summary
  add(uuids, config.trigger, [1]); // trigger reminder
  config.safeties.map(it => add(uuids, it, [1])); // safeties reminder
  config.waking.map(it => add(uuids, it, [0])); // wakers
  add(uuids, config.file, [1]); // goodbye

  return uuids;
}
