<template>
  <v-container id="blog-list">
    <v-list dense v-if="(blogList || []).length">
      <v-list-tile v-for="(blog, index) in blogList" :key="index">
        <!-- 博客内容 -->
        <v-list-tile-content>
          <!-- 博客标题 -->
          <v-list-tile-title>
            {{ blog.title }}
          </v-list-tile-title>
        </v-list-tile-content>
        <!-- 动作 -->
        <v-list-tile-action>
          <v-speed-dial
            v-model="blog.isShowDial"
            :direction="'left'"
            :transition="'slide-x-reverse-transition'"
          >
            <template v-slot:activator>
              <v-btn
                class="blog-list__dial"
                v-model="blog.isShowDial"
                @click="showDial(index)"
                small
                icon
                fab
              >
                <i class="iconfont iconshezhi"></i>
                <v-icon>close</v-icon>
              </v-btn>
            </template>

            <v-btn
              fab
              dark
              small
              :key="btnIndex"
              :color="btn.color"
              class="blog-list__dial__btn"
              @click="blogAction(blog, btn)"
              v-for="(btn, btnIndex) in dialBtnList"
            >
              <v-icon>{{ btn.icon }}</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import api from '@/assets/js/api.js';
export default {
  name: 'BlogList',
  data() {
    return {
      blogList: [], //博客列表
      isShowDial: false, //控制按钮转盘的显示
      dialBtnList: [
        {
          color: 'red',
          icon: 'delete',
          method: 'deleteBlog'
        },
        {
          color: 'green',
          icon: 'edit',
          method: 'editBlog'
        }
      ] //转盘按钮列表
    };
  },

  computed: {
    token() {
      return this.$store.state.token;
    }
  },

  created() {
    this.initData();
  },

  methods: {
    /**
     * 初始化数据
     */
    initData() {
      this.$http.get(api.blog.list).then(
        res => {
          if (res.data.code === 200) {
            this.blogList = (res.data.data || []).map(blog => {
              blog.isShowDial = false;
              return blog;
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },

    /**
     * * 控制轮盘的显示
     */
    showDial(index) {
      this.blogList.forEach((blog, curIndex) => {
        if (index !== curIndex) {
          blog.isShowDial = false;
        }
      });
    },

    /**
     * * 博客的操作方法
     */
    blogAction(blog, action) {
      this[action.method](blog);
    },

    /**
     * * 删除博客
     * @param {{}} blog 博客内容
     */
    deleteBlog(blog) {
      this.$http
        .post(`${api.blog.delete}?token=${this.token}`, {
          id: blog.id
        })
        .then(
          res => {
            if (res.data.code === 200) {
              this.$message(res.data.message, 'success');
              this.initData();
            } else {
              this.$message(res.data.message);
            }
          },
          err => {
            this.$message(err);
          }
        );
    },

    /**
     * * 去往更新博客
     */
    editBlog(blog) {
      this.$router.push({ name: 'update', params: { id: blog.id } });
    },

    /**
     * * 显示弹窗
     */
    showMessage() {
      this.$message();
    }
  }
};
</script>

<style lang="scss">
#blog-list {
  height: 100%;
  .blog {
    &-list {
      &__dial {
        margin: 6px 8px;
        margin-right: 0;
        .iconfont {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &__btn {
          margin: 6px 8px;
        }
      }
    }
  }
}
</style>
