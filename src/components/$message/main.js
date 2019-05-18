import Vue from 'vue'; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import message from './message.vue';

let ToastConstructor = Vue.extend(message); // 这个在前面的前置知识内容里面有讲到
let instance;

const Message = function(data) {
  instance = new ToastConstructor({
    data
  }); // 渲染组件
  document.querySelector('#app').appendChild(instance.$mount().$el); // 挂载到 body 下
};

const $message = function(content, type = 'error', duration = 3000) {
  return Message({
    content,
    type,
    duration
  });
};

['error', 'success', 'info', 'warning'].forEach(type => {
  $message[type] = content => {
    return Message(content, type);
  };
});

export default $message;
