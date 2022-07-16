import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/home', redirect: 'myhome' },
      { path: 'myhome', component: () => import('@/views/Home/MyHome.vue') },
      { path: 'userslist', component: () => import('@/views/List/UsersList.vue') },
      { path: 'roleslist', component: () => import('@/views/List/RolesList') },
      { path: 'permissionslist', component: () => import('@/views/List/PermissionsList') },
      { path: 'productlist', component: () => import('@/views/List/ProductList') },
      { path: 'classification', component: () => import('@/views/List/Classification') },
      { path: 'goodscategory', component: () => import('@/views/List/GoodsCategory') },
      { path: 'orderlist', component: () => import('@/views/List/OrderList') },
      { path: 'datareport', component: () => import('@/views/List/DataReport') }

    ]
  },
  { path: '/404', component: () => import('@/views/404.vue') },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/404'] // 白名单
// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 查看权限
  const token = store.state.user.token
  if (token) { // 已登录
    if (to.path === '/login') { // 已登录的情况下还要去login
      next('/')
    } else { // 放行
      next()
    }
  } else { // 未登录
    if (whiteList.includes(to.path)) { // 未登录的情况下要去白名单以外的页面
      next()
    } else {
      next('/login')
    }
  }
})

export default router
