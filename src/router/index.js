import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      name: 'Msite',
      // 路由组件懒加载，返回路由组件的函数，只有执行函数才会加载路由组件，这个函数在请求对应的路径时才会执行
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
      path: '/shop',
      name: 'Shop',
      component: () => import('../pages/Shop/Shop.vue'),
      children: [
        {
          path: '/shop/goods',
          name: 'ShopGoods',
          component: () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
        },
        {
          path: '/shop/info',
          name: 'ShopInfo',
          component: () => import('../pages/Shop/ShopInfo/ShopInfo.vue')
        },
        {
          path: '/shop/ratings',
          name: 'ShopRatings',
          component: () => import('../pages/Shop/ShopRatings/ShopRatings.vue')
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
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
