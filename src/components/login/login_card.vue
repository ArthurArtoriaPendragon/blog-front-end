<template>
  <v-card id="loginCard" class="login-card">
    <v-card-title>
      <span class="headline">{{ cardTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-form class="login-form" ref="form" lazy-validation>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 v-for="(item, index) in form[activeForm]" :key="index">
              <v-text-field
                :label="item.label"
                :rules="item.rules"
                v-model="item.value"
                :required="item.required"
                :type="item.password ? 'password' : 'text'"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row justify-end>
            <small>*表示必填字段</small>
          </v-layout>
          <v-layout row justify-center>
            <v-btn
              dark
              :loading="isShowLoading"
              :disabled="isShowLoading"
              @click="validate"
              color="blue darken-1"
              class="login-form__submit"
              >{{ cardTitle }}
              <template v-slot:loader>
                <span>Loading...</span>
              </template>
            </v-btn>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-layout class="login-card__tip" row justify-center align-center>
        <span class="span">{{ jumpText.span }}有账号？</span>
        <v-btn
          @click="switchFormType"
          class="login-card__jump"
          flat
          small
          color="blue darken-1"
        >
          <strong>立即{{ jumpText.btn }}</strong>
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from '../../assets/js/api.js';
import { mapMutations } from 'vuex';
export default {
  name: 'Login',

  data() {
    return {
      form: {
        login: {
          account: {
            value: '',
            label: 'Username*',
            required: true,
            rules: [
              v => !!v || '用户名不能为空！',
              v => (v && v.length <= 20) || '用户名长度不能大于20位！'
            ]
          },
          password: {
            value: '',
            label: 'Password*',
            required: true,
            password: true,
            rules: [
              v => !!v || '密码不能为空！',
              v => (v && v.length > 6) || '密码不能少于六位！'
            ]
          }
        },
        register: {
          account: {
            value: 'Artoria',
            label: 'Username*',
            required: true,
            rules: [
              v => !!v || '用户名不能为空！',
              v => (v && v.length <= 20) || '用户名长度不能大于20位！'
            ]
          },
          nickname: {
            value: '骑士王的荣耀',
            label: 'Nickname*',
            required: true,
            rules: [v => !!v || '昵称不能为空！']
          },
          phone: {
            value: '',
            label: 'Phone',
            rules: [
              v => !v || /^1[34578]\d{9}$/.test(v) || '请输入正确的手机号码！'
            ]
          },
          password: {
            value: 'Artoria314',
            label: 'Password*',
            required: true,
            password: true,
            rules: [
              v => !!v || '密码不能为空！',
              v => (v && v.length > 6) || '密码不能少于六位！'
            ]
          }
        }
      },
      activeForm: 'login',
      isShowLoading: false //控制提交按钮的loading显示
    };
  },

  props: {
    isShowLogin: {
      type: Boolean,
      default: true
    },
    isReject: {
      type: Boolean,
      default: false
    }
  },

  watch: {},

  computed: {
    cardTitle() {
      return `${this.activeForm[0].toUpperCase()}${this.activeForm.slice(1)}`;
    },
    jumpText() {
      return {
        span: this.activeForm === 'login' ? '还没' : '已',
        btn: this.activeForm === 'login' ? '注册' : '登录'
      };
    }
  },

  methods: {
    /**
     * * 验证表单
     */
    validate() {
      if (this.$refs.form.validate()) {
        this[this.activeForm]();
      }
    },

    /**
     * * 登录
     */
    login() {
      const { account, password } = this.form[this.activeForm];
      this.$http
        .post(`${api.user.login}`, {
          account: account.value,
          password: password.value
        })
        .then(
          res => {
            const data = res.data;
            if (data.code === 200) {
              // this.$message('登陆成功！', 'success');
              this.formatUserInfo(data.data);
            } else {
              this.$message(data.message, 'error');
            }
          },
          err => {
            console.log(err);
            this.$message();
          }
        );
    },

    /**
     * * 设置用户信息
     */
    formatUserInfo(data) {
      this.setToken(data.token);
      this.setUserInfo(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (this.isReject) {
        this.$router.push(this.$route.query.reject_url);
      }
    },

    /**
     * * 注册
     */
    register() {
      const { account, password, nickname, phone } = this.form[this.activeForm];
      this.$http
        .post(`${api.user.register}`, {
          account: account.value,
          password: password.value,
          nickname: nickname.value,
          phone: phone.value,
          avatar: ''
        })
        .then(
          res => {
            const data = res.data;
            if (data.code === 1) {
              this.$message('注册成功！', 'success');
              this.formatUserInfo(data.data);
            } else {
              this.$message(data.message);
            }
          },
          err => {
            console.log(err);
            this.$message();
          }
        );
    },

    /**
     * * 切换表单方式
     */
    switchFormType() {
      this.activeForm = ['register', 'login'].find(
        item => item !== this.activeForm
      );
    },

    /**
     * * vuex方法
     */
    ...mapMutations(['setToken', 'setUserInfo'])
  }
};
</script>

<style lang="scss">
#loginCard {
  .login {
    &-card {
      &__jump {
        margin: 0;
      }
    }
  }
}
</style>
