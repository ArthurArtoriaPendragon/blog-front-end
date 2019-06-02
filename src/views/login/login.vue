<template>
  <v-app id="login">
    <v-content class="login-content">
      <v-layout row wrap fill-height align-center justify-center>
        <login-card :is-reject="true" />
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import loginCard from '../../components/login/login_card.vue';

export default {
  components: {
    loginCard
  }
};
</script>

<style lang="scss">
#login {
  .login {
    &-card {
      width: 500px;
    }
  }
}
</style>
