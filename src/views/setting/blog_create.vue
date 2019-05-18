<template>
  <v-container fluid id="create-blog">
    <!-- 博客标题 -->
    <v-text-field
      class="create-title"
      v-model="blog.title"
      label="博客标题"
    ></v-text-field>
    <mavon-editor
      class="create-editor"
      v-model="blog.content"
      :ishljs="true"
      :code-style="'atom-one-dark'"
    />
    <v-layout justify-end>
      <v-btn @click="saveBlog" class="create-save" color="success">保存</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import api from '@/assets/js/api.js';
export default {
  name: 'CreateBlog',
  data() {
    return {
      blog: {
        content: '',
        title: '',
        author: '骑士王的荣耀',
        category: '编程'
      }
    };
  },

  computed: {
    token() {
      return this.$store.state.token;
    }
  },

  mounted() {},

  methods: {
    /**
     * * 初始化数据
     */
    initData() {},

    /**
     * * 保存博客
     */
    saveBlog() {
      this.$http.post(`${api.blog.create}?token=${this.token}`, this.blog).then(
        res => {
          if (res.data.code === 200) {
            this.$message(res.data.message, 'success');
          } else {
            this.$message(res.data.message);
          }
        },
        err => {
          this.$message(err.data.message);
        }
      );
    }
  }
};
</script>

<style lang="scss">
#create-blog {
  height: 100%;
  .create {
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
