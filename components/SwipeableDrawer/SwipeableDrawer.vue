<template>
  <div
    v-if="openState"
    :class="$style.container"
    :style="{
      '--delta-y': `${delta.y}px`,
      '--opacity': 1 - delta.y / contentClientHeight,
      '--rotate': `${delta.y < 25 ? 25 - delta.y : 0}deg`,
      '--gap': `${gap}px`,
    }"
  >
    <div
      :class="$style.background"
      @click="closeDrawer"
    />

    <div
      :class="$style.drawer"
      :style="{'height': `${contentScrollHeight}px`}"
    >
      <div :class="$style.closeButton" @click="closeDrawer" />
      <div
        ref="scrollableElement"
        :class="$style.contents"
        :style="{'overflow': delta.y > 0 ? 'hidden' : 'auto'}"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import { Easing, EasingType } from './Easing';

@Component
export default class SwipeableDrawer extends Vue {
  @Prop({ default: false }) readonly open!: boolean;

  @Prop({ default: 300 }) readonly speed!: number;

  @Prop({ default: 'easeOutCubic' }) readonly easingType!: EasingType;

  start = {
    x: 0,
    y: 0,
  };

  delta = {
    x: 0,
    y: 0,
  };

  end = {
    x: 0,
    y: 0,
  };

  openState = false;

  gap = 30;

  windowHeight = 0;

  contentScrollHeight = 0;

  contentClientHeight = 0;

  touchStartTime = 0;

  scrollTop = 0;

  easing: Easing | null = null;

  flickable = true;

  scrollableElement: HTMLElement | undefined = undefined;

  windowScrollTop = 0;

  @Watch('open')
  onActivatedChanged(open: boolean): void {
    if (open === this.openState) {
      return;
    }
    if (open) {
      this.initialSetUp();
    } else {
      this.closeDrawer();
    }
  }

  mounted(): void {
    this.windowHeight = window.outerHeight;
    this.easing = new Easing(this.easingType, this.speed);

    if (this.open) {
      this.initialSetUp();
    }
  }

  beforeDestroy(): void {
    this.windowUnLock();
  }

  initialSetUp(): void {
    this.delta.y = this.windowHeight;

    this.windowLock();

    this.openState = true;

    this.$nextTick(() => {
      if (this.$refs.scrollableElement && this.$refs.scrollableElement instanceof HTMLElement) {
        this.scrollableElement = this.$refs.scrollableElement;
      }

      // コンテンツが短い場合に全体の高さをそこまでとする
      this.contentScrollHeight = this.scrollableElement!.scrollHeight === 0 ? window.outerHeight : this.scrollableElement!.scrollHeight;
      this.contentClientHeight = this.scrollableElement!.clientHeight === 0 ? window.outerHeight : this.scrollableElement!.clientHeight;

      this.bindEvent();
      this.openDrawer();
    });
  }

  bindEvent(): void {
    this.scrollableElement!.addEventListener('touchstart', this.touchStart, { capture: false, passive: true });
    this.scrollableElement!.addEventListener('touchmove', this.touchMove, { capture: false, passive: true });
    this.scrollableElement!.addEventListener('touchend', this.touchEnd, { capture: false, passive: true });
    this.scrollableElement!.addEventListener('scroll', this.scroll, { capture: false, passive: true });
  }

  removeEvent(): void {
    this.windowUnLock();

    this.scrollableElement!.removeEventListener('touchstart', this.touchStart);
    this.scrollableElement!.removeEventListener('touchmove', this.touchMove);
    this.scrollableElement!.removeEventListener('touchend', this.touchEnd);
    this.scrollableElement!.removeEventListener('scroll', this.scroll);
  }

  touchStart(e): void {
    this.start = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    this.delta = { x: 0, y: 0 };
    this.end = { x: 0, y: 0 };

    this.touchStartTime = new Date().getTime();

    // コンテンツ部分のスクロール量が -5 ~ 0 のときだけflickで閉じられるようにする
    // マイナスはiOSのバウンス分を考慮したもの
    this.flickable = this.scrollTop > -5 && this.scrollTop <= 0;
  }

  touchMove(e): void {
    const diffX = this.end.x + e.changedTouches[0].clientX - this.start.x;
    const diffY = this.end.y + e.changedTouches[0].clientY - this.start.y;

    const redian = Math.atan2(diffY, diffX);
    const angle = redian * (180 / Math.PI); // ラジアンを度数へ変換

    // 下方向のみに引っ張れるようにする
    // 動かせるのはコンテンツ部分のスクロール量が0以下のときのみ
    if (
      this.scrollTop <= 0
      && (angle > 30 && angle < 150)
    ) {
      this.delta.y = diffY;
    } else {
      this.delta.y = 0;
    }
  }

  touchEnd(): void {
    this.end.y = this.delta.y;

    // 下にswipeしたら閉じる
    if (this.delta.y > this.windowHeight / 3) {
      this.closeDrawer();
    } else {
      // コンテンツ部分のスクロール量が0の場合に、200ms 以内に 80px 下にflickしたら閉じる
      const touchingTime = new Date().getTime() - this.touchStartTime;
      if (
        this.flickable
        && touchingTime < 200
        && this.delta.y > 80
      ) {
        this.closeDrawer();
      } else {
        // それ以外は上に戻る
        this.openDrawer();
      }
    }

    this.flickable = false;
  }

  scroll(event: Event): void {
    this.scrollTop = (event.currentTarget as Element).scrollTop;
  }

  windowLock(): void {
    const html = document.documentElement;

    if (html.style.position !== 'fixed') { // 多重ロック防止
      this.windowScrollTop = window.scrollY;

      html.style.position = 'fixed';
      html.style.overflow = 'hidden';
      html.style.width = '100%';
      html.style.top = `${-this.windowScrollTop}px`;
    }
  }

  windowUnLock(): void {
    const html = document.documentElement;

    if (html.style.position === 'fixed') {
      html.style.position = '';
      html.style.overflow = '';
      html.style.width = '';
      html.style.top = '';
      window.scrollTo(0, this.windowScrollTop);
    }
  }

  openDrawer(): void {
    this.$emit('before-enter');

    this.easing!.animate({
      startValue: this.delta.y,
      endValue: 0,
      progress: (value) => {
        this.delta.y = value > 0 ? value : 0;
      },
      complete: () => {
        this.contentClientHeight = this.scrollableElement!.clientHeight;
        this.contentScrollHeight = this.scrollableElement!.scrollHeight;
        this.$emit('after-enter');
      },
    });
  }

  closeDrawer(): void {
    this.removeEvent();
    this.$emit('before-leave');

    this.easing!.animate({
      startValue: this.delta.y,
      endValue: this.contentClientHeight + this.gap,
      progress: (value) => {
        this.delta.y = value;
      },
      complete: () => {
        this.openState = false;
        this.$emit('after-leave');
        this.$emit('close');
      },
    });
  }
}
</script>

<style module>
.container {
  --common-z-index: var(--z-index, 4);
}

.drawer {
  display: block;
  width: 100%;
  max-height: calc(100% - var(--gap));
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #FFFFFF;
  box-shadow: 0 -2px 20px 0 rgba(0, 0, 0, calc(0.4 * var(--opacity)));
  padding: 0;
  border-radius: 3px 3px 0 0;
  will-change: transform;
  transform: translate3d(0, var(--delta-y), 0);
  box-sizing: border-box;
  z-index: calc(var(--common-z-index) + 1);
}

.contents {
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

.closeButton {
  position: absolute;
  top: calc(-1 * var(--gap));
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  height: var(--gap);
}

.closeButton::before,
.closeButton::after {
  content: "";
  display: block;
  position: absolute;
  width: 20px;
  height: 4px;
  background-color: #FFFFFF;
  border-radius: 10px;
  top: 13px;
}

.closeButton::before {
  left: 0;
  transform: rotate(var(--rotate));
}

.closeButton::after {
  right: 0;
  transform: rotate(calc(-1 * var(--rotate)));
}

.background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: var(--common-z-index);
  opacity: var(--opacity);
}
</style>
