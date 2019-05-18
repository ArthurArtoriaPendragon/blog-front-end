import Vue from 'vue'; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import { VAlert } from 'vuetify/lib'; // 引入刚才的 toast 组件

let ToastConstructor = Vue.extend(VAlert); // 这个在前面的前置知识内容里面有讲到
let instance;

const Message = function() {
  instance = new ToastConstructor().$mount(); // 渲染组件
  document.body.appendChild(instance.$el); // 挂载到 body 下
};

export default Message;
