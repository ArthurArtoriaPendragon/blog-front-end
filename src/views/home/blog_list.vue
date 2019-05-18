<template>
  <v-layout id="blog-list" column>
    <!-- 博客列表 -->
    <v-flex xs1 :key="index" class="blog" v-for="(blog, index) in blogList">
      <!-- 博客标题 -->
      <h2 class="blog-title">{{ blog.title }}</h2>
      <!-- 博客信息 -->
      <v-layout class="blog-info" row wrap>
        <p class="blog-info__time">
          <v-icon>event</v-icon>
          <span>{{ blog.fromateCreatedAt }}</span>
        </p>
      </v-layout>
      <!-- 博客摘要 -->
      <p class="blog-summary">
        In ac felis quis tortor malesuada pretium. Nam at tortor in tellus
        interdum sagittis. Sed fringilla mauris sit amet nibh. Nullam nulla
        eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Phasellus
        dolor.
      </p>
      <!-- 博客标签 -->
      <v-layout class="blog-tags" row wrap align-center>
        <v-icon>mdi-tag-multiple</v-icon>
        <span>test</span>
      </v-layout>
      <!-- 阅读更多 -->
      <v-btn :to="{ name: 'detail', params: { id: blog.id } }" class="blog-more"
        >READ MORE</v-btn
      >
    </v-flex>
  </v-layout>
</template>

<script>
import api from '../../assets/js/api.js';
import dayjs from 'dayjs';
export default {
  name: 'BlogList',

  data() {
    return {
      blogList: [] // 博客列表
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
      this.getBlogList();
    },

    /**
     * * 获取文章列表
     */
    getBlogList() {
      this.$http.get(`${api.blog.list}`).then(
        res => {
          if (res.data.code === 200) {
            this.blogList = res.data.data.map(blog => {
              blog.fromateCreatedAt = dayjs(blog.createdAt).format(
                'MMMM DD, YYYY'
              );
              return blog;
            });
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
#blog-list {
  .blog {
    &:not(:last-child) {
      margin-bottom: 48px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    &-title {
      margin-bottom: 24px;
      font-size: 45px;
      color: #2b2d42;
      font-weight: 300;
    }
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
    &-summary {
      margin-bottom: 48px;
    }
    &-tags {
      margin-bottom: 48px;
      .v-icon {
        padding-right: 5px;
      }
    }
    &-more {
      margin-left: 0;
      margin-bottom: 48px;
      color: #fff;
      background-color: #8d99ae;
    }
  }
}
</style>
