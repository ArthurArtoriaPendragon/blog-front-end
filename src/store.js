import Vue from 'vue';
import Vuex from 'vuex';
import home from './views/home/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: Object.assign(
    {
      token: '',
      userInfo: {}
    },
    home.state
  ),
  mutations: Object.assign(
    {
      setToken(state, token) {
        state.token = token;
      },
      setUserInfo(state, userInfo) {
        state.userInfo = userInfo;
      }
    },
    home.mutations
  ),
  actions: {}
});
