/**
 *
 * Easing
 *
 * t : 時間(進行度)
 * b : 開始の値(開始時の座標やスケールなど)
 * c : 開始と終了の値の差分
 * d : Tween(トゥイーン)の合計時間
 *
 **/
const easingFunctions = {
  linear: (t, b, c, d) => {
    t /= d;
    return c * t + b;
  },

  //Cubic
  easeInCubic: (t, b, c, d) => {
    t /= d;
    return c * t * t * t + b;
  },
  easeOutCubic: (t, b, c, d) => {
    t /= d;
    t = t - 1;
    return c * (t * t * t + 1) + b;
  },
  easeInOutCubic: (t, b, c, d) => {
    t /= d / 2.0;
    if (t < 1) {
      return (c / 2.0) * t * t * t + b;
    } else {
      t = t - 2;
      return (c / 2.0) * (t * t * t + 2) + b;
    }
  },

  //Quartic
  easeInQuart: (t, b, c, d) => {
    t /= d;
    return c * t * t * t * t + b;
  },
  easeOutQuart: (t, b, c, d) => {
    t /= d;
    t = t - 1;
    return -c * (t * t * t * t - 1) + b;
  },
  easeInOutQuart: (t, b, c, d) => {
    t /= d / 2.0;
    if (t < 1) {
      return (c / 2.0) * t * t * t * t + b;
    } else {
      t = t - 2;
      return (-c / 2.0) * (t * t * t * t - 2) + b;
    }
  },

  //Quintic
  easeInQuint: (t, b, c, d) => {
    t /= d;
    return c * t * t * t * t * t + b;
  },
  easeOutQuint: (t, b, c, d) => {
    t /= d;
    t = t - 1;
    return c * (t * t * t * t * t + 1) + b;
  },
  easeInOutQuint: (t, b, c, d) => {
    t /= d / 2.0;
    if (t < 1) {
      return (c / 2.0) * t * t * t * t * t + b;
    } else {
      t = t - 2;
      return (c / 2.0) * (t * t * t * t * t + 2) + b;
    }
  },
};

export default class Easing {
  constructor(easingName = 'linear', speed = 800) {
    this.easingName = easingName;
    this.speed = speed;
  }

  /**
   * Easingを開始する
   * @param {number} startValue 開始時の座標やスケールなど
   * @param {number} endValue 終了時の座標やスケールなど
   * @param {function} progress 実行中に実行される
   * @param {function} complete 実行終了時に実行される
   **/
  animate({ startValue, endValue, progress, complete }) {
    const startTime = new Date().getTime(); //経過時刻

    const animation = () => {
      const currentTime = new Date().getTime() - startTime;

      this.render = window.requestAnimationFrame(animation);

      const value = easingFunctions[this.easingName](
        currentTime,
        startValue,
        endValue - startValue,
        this.speed
      );

      if (progress) progress(value);

      if (currentTime >= this.speed) {
        if (complete) complete();
        cancelAnimationFrame(this.render);
      }
    };

    animation();
  }
}
