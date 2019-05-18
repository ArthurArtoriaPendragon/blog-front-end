<template>
  <v-navigation-drawer id="aside" v-model="isShowAside" fixed app dark>
    <v-list dense>
      <v-list-tile
        ripple
        :key="index"
        :to="link.path"
        class="aside-list"
        v-for="(link, index) in asideList"
      >
        <v-list-tile-action v-if="link.icon.value">
          <v-icon v-if="link.icon.isVuetify">{{ link.icon.value }}</v-icon>
          <i v-else :class="link.icon.value"></i>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ link.label }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      asideList: [
        {
          label: '新建博客',
          icon: {
            value: 'iconfont iconxinjian'
          },
          path: {
            name: 'create'
          }
        },
        {
          label: '博客列表',
          icon: {
            value: 'iconfont iconxinjian'
          },
          path: {
            name: 'list'
          }
        },
        {
          label: '更改博客',
          icon: {
            isVuetify: true,
            value: 'edit'
          },
          path: {
            name: 'update',
            params: {
              id: 2
            }
          }
        }
      ]
    };
  },

  props: {
    isShowAside: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    $route(to) {
      if (to.path.includes('update')) {
        this.asideList[2].path.params = to.params.id;
      }
    }
  },

  created() {
    this.initData();
  },

  methods: {
    /**
     * * 初始化数据
     */
    initData() {
      if (this.$route.path.includes('update')) {
        this.asideList[2].path.params = this.$route.params.id;
      }
    }
  }
};
</script>

<style lang="scss">
#aside {
  .aside {
    &-list {
      &.v-list {
        &__title {
          color: #424242;
        }
      }
    }
  }
}
</style>
