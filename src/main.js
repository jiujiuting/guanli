import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.less'
// 注册全局组件--面包屑
import BreadCrumbs from '@/components/BreadCrumbs.vue'
Vue.component('BreadCrumbs', BreadCrumbs)

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
