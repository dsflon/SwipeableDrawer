<template>
  <div
    v-if="opened"
    :style="{
      '--moveY': `${moveY}px`,
      '--opacity': 1 - moveY / windowHeght,
      '--rotate': `${moveY < 25 ? 25 - moveY : 0}deg`,
    }"
  >
    <div :class="$style.halfModalBg" @click="closeModal" />

    <div :class="$style.halfModal">
      <div :class="$style.halfModalClose" @click="closeModal" />
      <div ref="halfModalInner" :class="$style.halfModalInner">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { createScrollLock } from '~/assets/js/scrollLock';
import { EasingScroll } from '~/assets/js/easingScroll';

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
      windowHeght: 0,
    };
  },

  watch: {
    opened(opened) {
      if (opened) {
        this.moveY = this.windowHeght;

        this.scrollLock.lock();
        this.addTouchEvent();
        this.openModal();
      }
    },
  },

  mounted() {
    this.scrollLock = createScrollLock(window.document);
    this.easingScroll = new EasingScroll('easeOutCubic', 300);
    // this.addTouchEvent();

    this.windowHeght = window.outerHeight;
  },

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
      this.moveY = 0;
      this.endY = 0;
    },

    touchMove(e) {
      const y = this.endY + e.changedTouches[0].clientY - this.startY;
      if (this.$refs.halfModalInner.scrollTop === 0) {
        this.moveY = y > 0 ? y : 0;
      }
    },

    touchEnd() {
      this.endY = this.moveY;

      if (this.moveY > 100) {
        this.closeModal();
      } else {
        this.openModal();
      }
    },

    openModal() {
      this.easingScroll.animate(this.moveY, 0, value => {
        this.moveY = value;
      });
    },

    closeModal() {
      this.scrollLock.unlock();
      this.removeTouchEvent();

      this.easingScroll.animate(
        this.moveY,
        this.windowHeght,
        value => {
          this.moveY = value;
        },
        () => {
          this.$emit('close');
        }
      );
    },
  },
};
</script>

<style module>
.halfModal {
  display: block;
  position: relative;
  width: 100%;
  height: calc(100% - 5vmin);
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 3;
  padding: 20px 0 0;

  transform: translateY(var(--moveY));
}

.halfModalInner {
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.halfModalClose {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  height: 20px;
}

.halfModalClose:before,
.halfModalClose:after {
  content: '';
  display: block;
  position: absolute;
  width: 20px;
  height: 4px;
  background-color: #ddd;
  border-radius: 10px;
  top: 11px;
}

.halfModalClose:before {
  left: 0;
  transform: rotate(var(--rotate));
}

.halfModalClose:after {
  right: 0;
  transform: rotate(calc(-1 * var(--rotate)));
}

.halfModalBg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  opacity: var(--opacity);
}
</style>
