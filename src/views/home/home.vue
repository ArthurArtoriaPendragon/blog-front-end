<template>
  <v-app id="home">
    <home-header />
    <!-- 主要内容 -->
    <public-content>
      <slot>
        <router-view />
      </slot>
    </public-content>
  </v-app>
</template>

<script>
import homeHeader from '../../components/home/home_header.vue';
import publicContent from '../../components/public/content.vue';
export default {
  components: {
    homeHeader,
    publicContent
  },

  name: 'Home',

  beforeRouteUpdate(to, from, next) {
    // 路由进入首页时，取消显示标题
    if (to.name === 'homeList') {
      this.$store.commit('setHeaderTitle', '');
    }
    next();
  }
};
</script>

<style lang="scss">
#home {
}
</style>
