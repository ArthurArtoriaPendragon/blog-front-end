<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon
      @click.stop="$emit(`handleAside`)"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Home</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="isShowLogin = true" icon color="indigo">
      <v-icon>account_circle</v-icon>
    </v-btn>
    <login :is-show-login="isShowLogin" @closeLogin="isShowLogin = false" />
  </v-toolbar>
</template>

<script>
import login from '../login/login.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'Header',

  components: {
    login
  },

  data() {
    return {
      isShowLogin: false
    };
  },

  created() {
    this.initData();
  },

  methods: {
    /**
     * * 初始化数据
     */
    initData() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$emit('noToken');
        return;
      }
      const userInfo = localStorage.getItem('userInfo');
      this.setToken(token);
      this.setUserInfo(JSON.parse(userInfo));
    },

    /**
     * * vuex方法
     */
    ...mapMutations(['setToken', 'setUserInfo'])
  }
};
</script>
