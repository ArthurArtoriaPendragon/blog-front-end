<template>
  <v-container id="blog-detail" grid-list-xs>
    <!-- 博客时间等信息 -->
    <v-layout row wrap class="blog-info">
      <p class="blog-info__time">
        <v-icon>event</v-icon>
        <span>{{ blogDetail.fromateCreatedAt }}</span>
      </p>
    </v-layout>
    <!-- 博客内容 -->
    <v-layout class="blog-content" row wrap>
      <mavon-editor
        class="blog-editor"
        v-model="blogDetail.content"
        :ishljs="true"
        :editable="false"
        :toolbars-flag="false"
        :subfield="false"
        :box-shadow="false"
        :short-cut="false"
        :default-open="'preview'"
        :code-style="'atom-one-dark'"
      />
    </v-layout>
  </v-container>
</template>

<script>
import api from '../../assets/js/api.js';
import dayjs from 'dayjs';
import { mapMutations } from 'vuex';
export default {
  name: 'BlogDetail',

  data() {
    return {
      blogDetail: {}
    };
  },

  computed: {
    /**
     * * 博客id
     */
    blogId() {
      return this.$route.params.id;
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
      this.getBlogDetail();
    },

    /**
     * * 初始化vuex提交方法映射
     */
    ...mapMutations(['setHeaderTitle']),

    /**
     * * 根据博客id获取博客详情
     */
    getBlogDetail() {
      this.$http.get(`${api.blog.detail}/${this.blogId}`).then(
        res => {
          const { data, code } = res.data;
          if (code === 200) {
            const { title, createdAt } = data;
            this.setHeaderTitle(title);
            data.fromateCreatedAt = dayjs(createdAt).format('MMMM DD, YYYY');
            this.blogDetail = data;
          } else {
            this.$message(res.data.message);
          }
        },
        err => {
          console.log(err);
          this.$message();
        }
      );
    }
  }
};
</script>

<style lang="scss">
#blog-detail {
  padding: 0;
  .blog {
    &-info {
      margin-bottom: 24px;
      &__time {
        margin-bottom: 0;
        font-size: 14px;
        .v-icon {
          padding-right: 5px;
          font-size: 16px;
        }
      }
    }
    &-editor {
      width: 100%;
      .v {
        &-note {
          &-panel {
            border: 0;
          }
        }
        &-show {
          &-content {
            padding: 0;
            background: none;
          }
        }
      }
    }
  }
}
</style>
