import Vue from 'vue'; // 引入 Vue 是因为要用到 Vue.extend() 这个方法
import Message from './message.vue';

Message.newInstance = (props = {}) => {
  const Instance = new Vue({
    data: props,
    render(h) {
      return h(Message, {
        props
      });
    }
  });

  const component = Instance.$mount();
  document.body.appendChild(component.$el);

  // 通过闭包维护组件的调用
  const message = Instance.$children[0];
  return {
    add(noticeProps) {
      message.add(noticeProps);
    }
  };
};

// 提示单例
let messageInstance;
function getMessageInstance() {
  messageInstance = messageInstance || Message.newInstance();
  return messageInstance;
}

/**
 * 对外暴露的显示消息的方法
 * @param {String} content 消息内容
 * @param {String} type 消息类型
 * @param {Number} duration 持续时间
 */
function notice(content, type = 'error', duration = 2000) {
  const instance = getMessageInstance();
  instance.add({
    content,
    type,
    duration
  });
}

/**
 * * 添加颜色属性调用
 */
['error', 'success', 'info', 'warning'].forEach(type => {
  notice[type] = (content, duration) => {
    notice(content, type, duration);
  };
});

// 对外暴露的方法
export default notice;

// let ToastConstructor = Vue.extend(message);
// let instance;

// const Message = function(data) {
//   instance = new ToastConstructor({
//     data
//   }); // 渲染组件
//   document.querySelector('#app').appendChild(instance.$mount().$el); // 挂载到 body 下
// };

// const $message = function(content, type = 'error', duration = 3000) {
//   return Message({
//     content,
//     type,
//     duration
//   });
// };

// ['error', 'success', 'info', 'warning'].forEach(type => {
//   $message[type] = content => {
//     return Message(content, type);
//   };
// });

// export default $message;
