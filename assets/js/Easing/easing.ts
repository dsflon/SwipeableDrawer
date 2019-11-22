interface EasingData {
  /** 時間(進行度) */
  t: number;

  /** 開始の値(開始時の座標やスケールなど) */
  b: number;

  /** 開始と終了の値の差分 */
  c: number;

  /** Tween(トゥイーン)の合計時間 */
  d: number;
}

/* eslint-disable no-param-reassign */
export function linear({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  return c * t + b;
}

// Cubic
export function easeInCubic({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  return c * t * t * t + b;
}

export function easeOutCubic({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  t -= 1;
  return c * (t * t * t + 1) + b;
}

export function easeInOutCubic({
  t, b, c, d,
}: EasingData): number {
  t /= d / 2.0;
  if (t < 1) {
    return (c / 2.0) * t * t * t + b;
  }
  t -= 2;
  return (c / 2.0) * (t * t * t + 2) + b;
}


// Quartic
export function easeInQuart({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  return c * t * t * t * t + b;
}

export function easeOutQuart({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  t -= 1;
  return -c * (t * t * t * t - 1) + b;
}

export function easeInOutQuart({
  t, b, c, d,
}: EasingData): number {
  t /= d / 2.0;
  if (t < 1) {
    return (c / 2.0) * t * t * t * t + b;
  }
  t -= 2;
  return (-c / 2.0) * (t * t * t * t - 2) + b;
}


// Quintic
export function easeInQuint({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  return c * t * t * t * t * t + b;
}

export function easeOutQuint({
  t, b, c, d,
}: EasingData): number {
  t /= d;
  t -= 1;
  return c * (t * t * t * t * t + 1) + b;
}

export function easeInOutQuint({
  t, b, c, d,
}: EasingData): number {
  t /= d / 2.0;
  if (t < 1) {
    return (c / 2.0) * t * t * t * t * t + b;
  }
  t -= 2;
  return (c / 2.0) * (t * t * t * t * t + 2) + b;
}
/* eslint-disable no-param-reassign */
