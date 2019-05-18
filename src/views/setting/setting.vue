<template>
  <v-app>
    <aside-component :is-show-aside="isShowAside" />
    <toolbar @noToken="noToken" @handleAside="isShowAside = !isShowAside" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import asideComponent from '../../components/setting/aside';
import toolbar from '../../components/setting/toolbar';
export default {
  components: {
    asideComponent,
    toolbar
  },

  data() {
    return {
      isShowAside: true
    };
  },

  computed: {
    token() {
      return this.$store.state.token;
    }
  }
};
</script>

<style lang="scss">
h1 {
  font-size: 20px;
}
</style>
