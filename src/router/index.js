import Vue from 'vue'
import VueRouter from 'vue-router'

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
      { path: 'permissionslist', component: () => import('@/views/List/PermissionsList') }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router