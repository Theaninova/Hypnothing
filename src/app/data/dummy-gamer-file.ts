import {HypnosisFile} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis-file";
import {Author, Gender} from "@wulkanat/hypnothing-core/lib/schema.org";
import {HypnosisType} from "@wulkanat/hypnothing-core/lib/hypnosis/hypnosis";

export const authorVincentVega: Author = {
  givenName: 'Vincent',
  familyName: 'Vega',
  additionalName: 'ViVe',
  gender: Gender.Male,
};

export const authorTheaSchoebl: Author = {
  givenName: 'Thea',
  familyName: 'Schoebl',
  additionalName: 'Theania',
  gender: 'Trans MtF',
}

export const gamerFile: HypnosisFile = {
  title: 'Gamer Files: Shooter',
  description: `
  This file helps you to immerse yourself deeper into any shooter. It’s primarily intended for first person shooters but it’s phrased pretty openly, so you can use it for other shooter games too. After you have listened, you will be able to immerse yourself more deeply into the game. You will feel every hit you take in the game, though more weakly. When you take damage, you will feel the effects, slowly becoming dizzy and sluggish, while it becomes harder to think the more damage you take. If you die, you will fade away into trance for a second or two. When you perform a special kill (headshot, knife, crowbar…), you will feel a burst of pleasure and it will become easier to focus more on the game. When you achieve something (finished a level, beat a boss, etc…), you will be rewarded with a massive burst of pleasure.

Because this is a first experiment with this concept, I made it very safe. It’s limited to the day you listened, and the hit effects are very low. There is also a safety that reverts you back to normal if any effects become to intense for you.

I could imagine versions with more effect or more permanence, as well as versions for other game genres. As usual – that’s up to you! Give feedback, tell me your thoughts and ideas!
  `,
  author: authorVincentVega,
  speaker: authorTheaSchoebl,
  language: 'en',
  minimumTranceDepth: 1,
  overviewSrc: 'TODO',
  type: HypnosisType.FILE,
  preferredTranceDepth: 2,
  safeties: [
    {
      title: 'Never too Intense',
      speaker: authorTheaSchoebl,
      author: authorVincentVega,
      uuid: 'safety_never_too_intense',
      type: HypnosisType.SAFETY,
      language: 'en',
      translatedWorks: {},
      description: 'If at any point the effects become too intense, you will instantly revert back to normal.',
      introductionSrc: 'TODO',
      reminderSrc: 'TODO',
      tags: ['limiter']
    },
    {
      title: 'Some other safety',
      speaker: authorTheaSchoebl,
      author: authorVincentVega,
      uuid: 'safety_never_too_intense',
      type: HypnosisType.SAFETY,
      language: 'en',
      translatedWorks: {},
      description: 'If at any point the effects become too intense, you will instantly revert back to normal.',
      introductionSrc: 'TODO',
      reminderSrc: 'TODO',
      tags: ['other', 'tags']
    }
  ],
  suggestions: [
    {
      title: 'Fall into Trance when you die',
      description: `Makes you fall into a deep trance whenever you die`,
      type: HypnosisType.SUGGESTION,
      language: 'en',
      translatedWorks: {
        de: 'uwtuwutwi',
        es: 'wjajjgag',
      },
      uuid: 'trance_when_you_die',
      isRequired: false,
      author: authorVincentVega,
      speaker: authorTheaSchoebl,
    },
    {
      title: 'Feel every hit',
      description: `Makes you **really** feel every hit, though it won't hurt`,
      type: HypnosisType.SUGGESTION,
      language: 'en',
      translatedWorks: {},
      uuid: 'feel_every_hit',
      isRequired: true,
      author: authorVincentVega,
      speaker: authorTheaSchoebl,
    }
  ],
  uuid: 'gamer_files_shooter', // TODO
  translatedWorks: {},
}
