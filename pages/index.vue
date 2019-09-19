<template>
  <div :class="$style.container">
    <button @click="toggleModal">
      開く
    </button>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <button @click="toggleModal">
      開く
    </button>
    <HalfModal :opened="opened" @close="toggleModal">
      asdfasdfs
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
  height: 1000px;
  background: linear-gradient(
    to bottom,
    rgba(33, 28, 14, 0) 0%,
    rgba(33, 28, 14, 0.7) 100%
  );
}
</style>
