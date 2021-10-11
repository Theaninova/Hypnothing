import {Uuid} from '@wulkanat/hypnothing-core/lib/schema.org';
import {HypnosisFile} from '@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file';
import {HypnosisType} from '@wulkanat/hypnothing-core/lib/hypnosis';

export const FILES: Record<Uuid, HypnosisFile> = {
  'file:gamer_files_shooter:theania:en': {
    title: 'Gamer Files: Shooter',
    description: `
  This file helps you to immerse yourself deeper into any shooter. It’s primarily intended for first person shooters but it’s phrased pretty openly, so you can use it for other shooter games too. After you have listened, you will be able to immerse yourself more deeply into the game. You will feel every hit you take in the game, though more weakly. When you take damage, you will feel the effects, slowly becoming dizzy and sluggish, while it becomes harder to think the more damage you take. If you die, you will fade away into trance for a second or two. When you perform a special kill (headshot, knife, crowbar…), you will feel a burst of pleasure and it will become easier to focus more on the game. When you achieve something (finished a level, beat a boss, etc…), you will be rewarded with a massive burst of pleasure.

Because this is a first experiment with this concept, I made it very safe. It’s limited to the day you listened, and the hit effects are very low. There is also a safety that reverts you back to normal if any effects become to intense for you.

I could imagine versions with more effect or more permanence, as well as versions for other game genres. As usual – that’s up to you! Give feedback, tell me your thoughts and ideas!
  `,
    author: 'author:vive',
    speaker: 'author:theania',
    language: 'en',
    minimumTranceDepth: 1,
    overviewSrc: 'TODO', // TODO
    type: HypnosisType.FILE,
    preferredTranceDepth: 2,
    warnings: ['warning:dummy'],
    safeties: [
      'safety:revert_if_too_intense:theania:en',
      'safety:some_other_safety:theania:en',
    ],
    suggestions: [
      'suggestion:trance_when_you_die:theania:en',
      'suggestion:feel_every_hit:theania:en',
      'suggestion:get_dizzy_when_low:theania:en',
      'suggestion:get_rewarded_for_special_kills:theania:en',
      'suggestion:get_rewarded_for_achievements_and_accomplishments:theania:en',
    ],
    uuid: 'file:gamer_files_shooter:theania:en',
    translatedWorks: {},
  },
};
