<template>
  <v-container fluid id="update-blog">
    <!-- 博客标题 -->
    <v-text-field
      class="update-title"
      v-model="blog.title"
      label="博客标题"
    ></v-text-field>
    <mavon-editor
      class="update-editor"
      v-model="blog.content"
      :ishljs="true"
      :code-style="'atom-one-dark'"
    />
    <v-layout justify-end>
      <v-btn @click="saveBlog" class="update-save" color="success">更新</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/assets/js/api.js';

export default {
  name: 'UreateBlog',
  data() {
    return {
      blog: {
        content: '',
        title: '',
        author: '',
        category: ''
      }
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

  mounted() {},

  methods: {
    /**
     * * 初始化数据
     */
    initData() {
      this.getBlogById(this.$route.params.id);
    },

    /**
     * * 根据路由id获取对应博客内容
     * @param {Number} id 博客id
     */
    getBlogById(id) {
      this.$http.get(`${api.blog.detail}/${id}`).then(
        res => {
          const data = res.data;
          if (data.code === 200) {
            this.blog = Object.assign({}, this.blog, data.data);
          } else {
            this.$message(res.data.message);
          }
        },
        err => {
          this.$message(err.message);
        }
      );
    },

    /**
     * * 保存博客
     */
    saveBlog() {
      const { title, category, content } = this.blog;
      this.$http
        .post(`${api.blog.update}?id=${this.blog.id}&token=${this.token}`, {
          title,
          category,
          content
        })
        .then(
          res => {
            const data = res.data;
            if (data.code === 200) {
              this.$message(data.message, 'success');
            } else {
              this.$message(data.message);
            }
          },
          err => {
            this.$message(err.message);
          }
        );
    }
  }
};
</script>

<style lang="scss">
#update-blog {
  height: 100%;
  .update {
    &-title {
      font-size: 22px;
    }
    &-editor {
      margin: 10px 0;
      height: calc(100% - 136px);
    }
    &-save {
      margin-right: 0;
    }
  }
}
</style>
