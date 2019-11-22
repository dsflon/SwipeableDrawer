<template>
  <div :class="$style.container">
    <template v-for="n in 10">
      <button
        :key="n"
        :class="[$style.button, $style.card]"
        @click="toggleModal"
      />
    </template>

    <HalfModal :opened="opened" @close="toggleModal">
      <div :class="$style.card" />
      <div :style="{ padding: '10px' }">
        aasdfasd aasdsd aasdsd aasdsd aasdsd aasdsd aasdfasdfa aasdfasdfa
        aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa
        aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa
        aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
        a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
        a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
        a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
      </div>
    </HalfModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import HalfModal from '~/components/HalfModal.vue';

@Component({
  components: {
    HalfModal,
  },
})
export default class Index extends Vue {
  opened = false;

  toggleModal() {
    this.opened = !this.opened;
  }
}
</script>

<style module>
.container {
  background: #f3f1ea;
  padding: 10px;
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
</style>
