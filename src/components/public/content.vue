<template>
  <v-content id="content">
    <v-container class="content-container">
      <v-sheet class="content-slot">
        <slot />
      </v-sheet>
    </v-container>
  </v-content>
</template>

<script>
export default {};
</script>

<style lang="scss">
#content {
  .content {
    &-container {
      position: relative;
      margin-top: -64px;
      padding: 48px;
      max-width: 95%;
      height: 100%;
      border-radius: 6px;
      box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
        0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
      z-index: 1;
      background-color: #fff;
    }
    &-slot {
      margin: auto;
      padding: 50px 0;
      height: 100%;
      max-width: 1000px;
    }
  }
}
</style>
