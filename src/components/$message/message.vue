<template>
  <section id="message_wrapper">
    <v-alert v-model="show" :type="type">
      {{ content }}
    </v-alert>
  </section>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      content: '网络错误，请刷新重试！',
      type: 'error',
      duration: 3000
    };
  },

  mounted() {
    setTimeout(() => {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }, this.duration);
  }
};
</script>

<style lang="scss">
#message_wrapper {
  position: absolute;
  min-width: 300px;
  top: 50px;
  left: 50%;
  z-index: 1000;
  animation: scrollIn 0.3s both;
  .v-alert {
    border-radius: 3px;
  }
  @keyframes scrollIn {
    from {
      opacity: 0;
      transform: translate(-50%, -100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
}
</style>
