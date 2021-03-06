import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/dashboard',
        component: () => import('../views/dashboard')
      },
      {
        path: '/department',
        component: () => import('../views/department')
      },
      {
        path: '/user',
        component: () => import('../views/user')
      },
      {
        path: '/device',
        component: () => import('../views/device')
      }
    ]
  },
  {
    path: '*',
    component: () => import('../components/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
