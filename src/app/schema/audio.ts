import {Keyframe} from './keyframes'

/**
 * You can directly override the loudness, but prefer
 * to use the predefined strings for user preferences
 */
export type VolumeKeyframe = Keyframe<VolumeChoice | number>;

export enum VolumeChoice {
  OFF = 'off',
  SILENT = 'silent',
  NORMAL = 'normal',
  LOUD = 'loud',
  /**
   * Use previous or value
   */
  INHERIT = 'inherit',
  /**
   * Use next value
   */
  PREFETCH = 'prefetch'
}
