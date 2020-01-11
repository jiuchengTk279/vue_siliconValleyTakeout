// 通过mutation间接更新state的多个方法的对象
import {RECEIVE_ADDRESS, RECEIVE_CATEGORIES, RECEIVE_SHOPS, RECEIVE_USER_INFO, RESET_USER_INFO, RECEIVE_SHOP_INFO, RECEIVE_SHOP_RATINGS, RECEIVE_SHOP_GOODS, INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART, RECEIVE_SEARCH_SHOPS} from './mutation-types.js'
import {reqAddress, reqFoodList, reqShopList, reqUserInfo, reqLogout, reqShopInfo, reqShopGoods, reqShopRatings, reqSearchShopList} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步的ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取食品分类列表
  async getCategories ({commit, state}) {
    // 发送异步的ajax请求
    const result = await reqFoodList()
    // 提交一个mutation
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_CATEGORIES, {categories})
    }
  },

  // 异步获取商家列表
  async getShops ({commit, state}) {
    // 发送异步的ajax请求
    // const latitude = state.latitude
    // const longitude = state.longitude
    const {latitude, longitude} = state
    const result = await reqShopList(latitude, longitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  // 同步与异步的判断，如果需要先要发请求，然后在处理数据，就是用异步async，如果是请求已经发完了。直接进行处理，就是用同步
  // 同步记录用户信息
  recordUser ({commit, state}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步获取用户的信息
  async getUserInfo ({commit}) {
    // 发起异步的ajax请求
    const result = await reqUserInfo()
    // 登录成功，获取userInfo
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },

  //  异步登出
  async logout ({commit, state}) {
    // 发起异步登出的请求
    const result = await reqLogout()
    // 登出成功,code为0
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家的信息
  async getShopInfo ({commit}, shopInfo) {
    // 发起异步的ajax请求
    const result = await reqShopInfo()
    if (result.code === 0) {
      const shopInfo = result.data
      commit(RECEIVE_SHOP_INFO, {shopInfo})
    }
  },

  // 异步获取商家的评价
  async getShopRatings ({commit}, callback) {
    // 发起异步的ajax请求
    const result = await reqShopRatings()
    if (result.code === 0) {
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATINGS, {shopRatings})
      callback && callback()
    }
  },

  // 异步获取商家的商品
  async getShopGoods ({commit}, callback) {
    // 发起异步的ajax请求
    const result = await reqShopGoods()
    if (result.code === 0) {
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS, {shopGoods})
      callback && callback()
    }
  },

  // 同步更新food中的count值，接收 isAdd 和 food的值
  updateFoodCount ({commit}, {isAdd, food}) {
    // 点击增加
    if (isAdd) {
      // 提交增加
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      // 提交减少
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  // 同步更新清除购物车
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },

  // 异步获取搜索的商家列表
  async searchShops ({commit, state}, keyword) {
    // 获取经纬度的位置信息
    const geohash = state.latitude + '' + state.longitude
    // 发起异步的ajax请求
    const result = await reqSearchShopList(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
