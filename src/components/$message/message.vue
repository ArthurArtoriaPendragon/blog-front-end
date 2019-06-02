<template>
  <section id="message_wrapper">
    <v-snackbar
      class="message-snackbar"
      :key="index"
      v-model="notice.show"
      v-for="(notice, index) in noticeList"
      :multi-line="notice.mode === 'multi-line'"
      :left="notice.x === 'left'"
      :right="notice.x === 'right'"
      :top="notice.y === 'top'"
      :bottom="notice.y === 'bottom'"
      :color="notice.type"
      :vertical="notice.mode === 'vertical'"
      :timeout="notice.duration"
    >
      {{ notice.content }}
      <v-btn v-if="false" color="pink" flat @click="remove(notice.name)">
        Close
      </v-btn>
    </v-snackbar>
  </section>
</template>

<script>
let seed = 0;

function getUuid() {
  return 'alert_' + seed++;
}

export default {
  data() {
    return {
      noticeList: []
    };
  },

  mounted() {},

  methods: {
    /**
     * * 添加消息
     */
    add(notice) {
      // 生成唯一名称
      const name = getUuid();

      // 向消息列表添加一条消息
      const _notice = Object.assign(
        {
          name,
          content: '网络错误，请刷新重试！',
          type: 'error',
          x: '',
          y: 'top',
          mode: '',
          show: false
        },
        notice
      );
      this.noticeList.push(_notice);
      this.$nextTick(function() {
        _notice.show = true;
        setTimeout(this.remove, _notice.duration + 1000);
      });
    },

    /**
     * * 移除
     */
    remove() {
      this.noticeList = this.noticeList.filter(notice => notice.show);
    }
  }
};
</script>

<style lang="scss">
#message_wrapper {
  z-index: 1000;
  .message {
    &-snackbar {
      // animation: scrollIn 0.3s both;
      .v-snack {
        &__wrapper {
          border-radius: 3px;
        }
      }
    }
  }
  @keyframes scrollIn {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
