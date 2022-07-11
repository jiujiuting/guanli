import Vue from 'vue'
import Vuex from 'vuex'

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
      window.localStorage.setItem('TOKEN', JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
