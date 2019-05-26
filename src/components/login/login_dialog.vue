<template>
  <v-dialog
    content-class="login"
    v-model="isShowFrom"
    scrollable
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <login-card />
  </v-dialog>
</template>

<script>
import loginCard from './login_card.vue';

export default {
  components: {
    loginCard
  },

  name: 'LoginDialog',

  data() {
    return {
      isShowFrom: false, //控制表单显示
      isShowLoading: false //控制提交按钮的loading显示
    };
  },

  props: {
    isShowLogin: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    isShowLogin() {
      this.isShowFrom = this.isShowLogin;
    },
    isShowFrom() {
      !this.isShowFrom && this.$emit('closeLogin');
    }
  }
};
</script>
