import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Page404 from '../views/features/404'
import Page401 from '../views/features/401'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    component: Page404,
    hidden: true
  },
  {
    path: '/401',
    component: Page401,
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedback',
    name: 'Feedback',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "feedback" */ '../views/Feedback')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/products/index')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
