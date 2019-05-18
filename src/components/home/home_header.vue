<template>
  <div id="header">
    <v-responsive :aspect-ratio="16 / 3">
      <v-toolbar fixed :dark="scrollHeight < 300" class="header-nav">
        <v-toolbar-items>
          <v-text-field
            v-if="false"
            hide-details
            prepend-icon="search"
            single-line
          ></v-text-field>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-btn
          v-for="(link, index) in linkList"
          :key="index"
          large
          class="header-nav__link"
          flat
          :to="link.path"
          >{{ link.label }}</v-btn
        >
      </v-toolbar>
      <v-container class="header-inner">
        <v-layout justify-center fill-height align-center>
          <h1 v-if="headerTitle" class="header-title">{{ headerTitle }}</h1>
          <v-avatar v-else class="header-avatar" size="avatarSize">
            <img src="../../assets/images/home/avatar.png" alt="头像" />
          </v-avatar>
        </v-layout>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',

  data() {
    return {
      backgroundList: [], // 背景图片列表
      linkList: [
        {
          path: '/',
          label: 'Home'
        },
        {
          path: {
            name: 'detail',
            params: {
              id: 2
            }
          },
          label: 'Detail'
        }
      ],
      scrollHeight: 0
    };
  },

  computed: {
    headerTitle() {
      return this.$store.state.headerTitle;
    }
  },

  mounted() {
    window.addEventListener('scroll', this.scroll);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
  },

  methods: {
    scroll() {
      this.scrollHeight = window.scrollY;
    }
  }
};
</script>

<style lang="scss">
#header {
  position: relative;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.32),
      rgba(0, 0, 0, 0.32)
    ),
    url(../../assets/images/home/324988.jpg);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: inherit;
    filter: blur(5px);
  }
  .header {
    &-nav {
      background-color: #fff;
      &.theme--dark {
        background-color: transparent;
        box-shadow: none;
      }
      z-index: 2;
    }
    &-inner {
      height: 100%;
    }
    &-avatar {
      height: 100px;
      cursor: pointer;
    }
    &-title {
      font-size: 56px;
      font-weight: 700;
      letter-spacing: 4px;
      color: #fff;
    }
  }
}
</style>
