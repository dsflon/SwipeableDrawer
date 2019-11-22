<template>
  <div :class="$style.container">
    <h1 :class="$style.title">
      SwipeableDrawer
    </h1>
    <template v-for="n in 10">
      <button
        :key="n"
        :class="[$style.button, $style.card]"
        @click="opened = true"
      />
    </template>

    <SwipeableDrawer
      :open="opened"
      @close="opened = false"
    >
      <div :class="$style.card" />
      <section :class="$style.box">
        <p>テキストが入ります。テキストが入ります。テキストが入ります。</p>
        <ul :class="$style.flip">
          <li>横スクロール</li>
          <li>横スクロール</li>
          <li>横スクロール</li>
          <li>横スクロール</li>
          <li>横スクロール</li>
        </ul>
      </section>
      <section :class="$style.box">
        テキストが入ります。テキストが入ります。テキストが入ります。
      </section>
      <section :class="$style.box">
        テキストが入ります。テキストが入ります。テキストが入ります。
      </section>
      <section :class="$style.box">
        テキストが入ります。テキストが入ります。テキストが入ります。
      </section>
    </SwipeableDrawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { SwipeableDrawer } from '~/components/SwipeableDrawer';

@Component({
  components: {
    SwipeableDrawer,
  },
})
export default class Index extends Vue {
  opened = false;
}
</script>

<style module>
.container {
  background: #f3f1ea;
  padding: 0px 10px 10px;
}

.title {
  text-align: center;
  line-height: 1;
  font-size: 8vmin;
  padding: 20px 0;
}

.button {
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
  border: none;
  margin-bottom: 10px;
}

.card {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.card:before {
  content: '';
  display: block;
  width: 25%;
  height: 0;
  padding-bottom: 25%;
  background: #ddd;
}

.card:after {
  content: 'テキストが入ります。テキストが入ります。テキストが入ります。';
  display: block;
  text-align: left;
  width: 75%;
  box-sizing: border-box;
  padding-left: 10px;
}

.box {
  height: 200px;
  padding: 10px;
}

.box:nth-child(even) {
  background: #F7F7F7;
}

.flip {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: 20px 0 0;
  padding: 0;
}

.flip li {
  flex: none;
  list-style: none;
  white-space: normal;
  margin-right: 10px;
  padding: 25px 10px;
  background-color: #FFFFFF;
  border: 1px solid #CCCCCC;
}
</style>
