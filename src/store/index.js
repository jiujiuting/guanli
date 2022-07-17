import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: JSON.parse(window.localStorage.getItem('TOKEN'))
  },
  getters: {
  },
  mutations: {
    loginFn (state, payload) {
      state.token = payload
      // token 持久化本地存储
      window.localStorage.setItem('TOKEN', JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
