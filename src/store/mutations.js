// 直接更新state的多个方法的对象
import Vue from 'vue'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORIES, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_SHOP_INFO, RECEIVE_SHOP_RATINGS, RECEIVE_SHOP_GOODS, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART} from './mutation-types.js'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORIES] (state, {categories}) {
    state.categories = categories
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_SHOP_INFO] (state, {shopInfo}) {
    state.shopInfo = shopInfo
  },
  [RECEIVE_SHOP_RATINGS] (state, {shopRatings}) {
    state.shopRatings = shopRatings
  },
  [RECEIVE_SHOP_GOODS] (state, {shopGoods}) {
    state.shopGoods = shopGoods
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if (!food.count) { // 第一次增加
      // 新增的属性是没有数据绑定的，数据更新了，但是页面也不会更新
      // food.count = 1
      // Vue.set() 对象、属性名、属性值，传入三个参数
      // 可以让新增的数据属性也可以进行数据绑定，默认去新增一个属性是没有数据绑定的
      // 解决问题：如果给一个已经有数据绑定的数据去新增一个新的数据属性，默认是没有数据绑定的
      Vue.set(food, 'count', 1)
      // 将 food添加到 cartFoods中去,购物车里面
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if (food.count) { // 只有有值，大于0才会减减
      food.count--
      if (food.count === 0) {
        // 将food从 cartFoods中移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART] (state) {
    // 清除购物车中food的count
    state.cartFoods.forEach((food) => food.count = 0)
    // 清除购物车中的cartFoods，所有的购物项
    state.cartFoods = []
  }
}
