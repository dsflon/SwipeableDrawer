export const Easing = {
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
