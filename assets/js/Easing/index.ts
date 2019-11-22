import * as EasingModule from './easing';

export type EasingType = 'linear'
| 'easeInCubic'
| 'easeOutCubic'
| 'easeInOutCubic'
| 'easeInQuart'
| 'easeOutQuart'
| 'easeInOutQuart'
| 'easeInQuint'
| 'easeOutQuint'
| 'easeInOutQuint';

interface AnimationData {
  easingType?: EasingType;

  speed?: number;

  /** 開始時の座標やスケールなど */
  startValue: number;

  /** 終了時の座標やスケールなど */
  endValue: number;

  /** 実行中に実行される関数 */
  progress?: Function;

  /** 実行終了時に実行される関数 */
  complete?: Function;
}

export class Easing {
  easingType!: EasingType;

  speed!: number;

  constructor(easingType: EasingType = 'linear', speed = 400) {
    this.easingType = easingType;
    this.speed = speed;
  }

  /**
   * Easingを開始する
   * */
  animate(animationData: AnimationData): void {
    const startTime = new Date().getTime(); // 経過時刻
    const {
      startValue, endValue, progress, complete, easingType, speed,
    } = animationData;

    if (easingType) {
      this.easingType = easingType;
    }

    if (speed) {
      this.speed = speed;
    }

    let render;

    const animation = (): void => {
      const currentTime = new Date().getTime() - startTime;

      render = window.requestAnimationFrame(animation);

      const value = EasingModule[this.easingType]({
        t: currentTime,
        b: startValue,
        c: endValue - startValue,
        d: this.speed,
      });

      if (progress) progress(value);

      if (currentTime >= this.speed) {
        if (complete) complete();
        cancelAnimationFrame(render);
      }
    };

    animation();
  }
}
