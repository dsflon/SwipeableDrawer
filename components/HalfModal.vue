<template>
  <div v-if="opened" :style="{ '--moveY': `${moveY}px` }">
    <div :class="$style.halfModalBg" @click="$emit('close')" />
    <div :class="$style.halfModal">
      <slot />
    </div>
  </div>
</template>

<script>
import { createScrollLock } from '~/assets/js/scrollLock';
import { EasingScroll } from '~/assets/js/easingScroll';
// import { createEasingScroll } from '~/assets/js/easingScroll';

export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      startY: 0,
      moveY: 0,
      endY: 0,
    };
  },

  watch: {
    opened(opened) {
      if (opened) {
        this.startY = 0;
        this.moveY = 0;
        this.endY = 0;

        this.scrollLock.lock();
        this.addTouchEvent();
      }
    },
  },

  mounted() {
    this.scrollLock = createScrollLock(window.document);
    this.easingScroll = new EasingScroll('easeOutCubic', 200);
    // this.addTouchEvent();
  },

  updated() {},

  methods: {
    addTouchEvent() {
      this.$nextTick(() => {
        document.addEventListener('touchstart', this.touchStart);
        document.addEventListener('touchmove', this.touchMove);
        document.addEventListener('touchend', this.touchEnd);
      });
    },
    removeTouchEvent() {
      document.removeEventListener('touchstart', this.touchStart);
      document.removeEventListener('touchmove', this.touchMove);
      document.removeEventListener('touchend', this.touchEnd);
    },
    touchStart(e) {
      this.startY = e.touches[0].clientY;
    },
    touchMove(e) {
      const y = this.endY + e.changedTouches[0].clientY - this.startY;
      this.moveY = y > 0 ? y : 0;
    },
    touchEnd() {
      this.endY = this.moveY;

      if (this.moveY > 50) {
        this.easingScroll.animate(
          this.endY,
          window.innerHeight,
          value => {
            this.moveY = value;
          },
          () => {
            this.closeModal();
          }
        );
      } else {
        // 上に戻る
        this.easingScroll.animate(
          this.endY,
          0,
          value => {
            this.moveY = value;
          },
          () => {
            this.startY = 0;
            this.moveY = 0;
            this.endY = 0;
          }
        );
      }
    },

    closeModal() {
      this.scrollLock.unlock();
      this.removeTouchEvent();
      this.$emit('close');
    },
  },
};
</script>

<style module>
.halfModal {
  display: block;
  width: 100%;
  height: calc(100% - 7vmin);
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 3;
  padding: 30px 0 0;

  transform: translateY(var(--moveY));
}

.halfModalBg {
  content: '';
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
</style>
