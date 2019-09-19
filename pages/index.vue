<template>
  <div :class="$style.container">
    <template v-for="n in 10">
      <button :key="n" :class="$style.button" @click="toggleModal" />
    </template>

    <HalfModal :opened="opened" @close="toggleModal">
      aasdfasd aasdsd aasdsd aasdsd aasdsd aasdsd aasdfasdfa aasdfasdfa
      aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa
      aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa
      aasdfasdfa aasdfasdfa aasdfasdfa aasdfasdfa a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
      a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
      a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
      a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
    </HalfModal>
  </div>
</template>

<script>
import HalfModal from '~/components/HalfModal.vue';

export default {
  components: {
    HalfModal,
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    toggleModal() {
      this.opened = !this.opened;
    },
  },
};
</script>

<style module>
.container {
  background: #f3f1ea;
  padding: 10px;
}

.button {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
  border: none;
  margin-bottom: 10px;
  width: 100%;
  height: calc(20vmin + 20px);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.button:before {
  content: '';
  display: block;
  width: 20vmin;
  height: 0;
  padding-bottom: 20vmin;
  background: #ddd;
}

.button:after {
  content: 'テキストが入ります。テキストが入ります。テキストが入ります。';
  display: block;
  text-align: left;
  width: 66vmin;
}
</style>
