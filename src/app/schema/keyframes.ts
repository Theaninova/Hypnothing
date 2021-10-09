export interface Keyframe<T> {
  /**
   * Time in seconds or timestamp ('00:42.222')
   */
  at: number | string;

  /**
   * When provided, the keyframe will ramp up at
   * the specified time in the specified time instead
   * of ramping up from the last keyframe
   */
  in?: number;

  value: T;
}
