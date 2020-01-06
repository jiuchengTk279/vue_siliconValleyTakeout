import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      name: 'Msite',
      component: () => import('../pages/Msite/Msite.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('../pages/Order/Order.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../pages/Profile/Profile.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../pages/Search/Search.vue'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login/Login.vue')
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/*',
      redirect: '/msite'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
