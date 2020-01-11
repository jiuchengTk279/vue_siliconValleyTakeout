// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
// import Vuex from 'vuex'
// import vuexI18n from 'vuex-i18n'
import {Button} from 'mint-ui'

// 加载 mockServer
import './mock/mockServer.js'
import loading from './common/imgs/loading.gif'
// 加载过滤器
import './fiters'

Vue.config.productionTip = false

// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-Button></mt-Button>
// 内部会自定义一个指令 lazy
Vue.use(VueLazyload, {
  loading
})
// Vue.use(Vuex)
// const store2 = new Vuex.Store({
//   modules: {
//     i18n: vuexI18n.store
//   }})
// Vue.use(vuexI18n.plugin, store2)
// const translationsEn = {
//   'content': 'This is some {type} content'
// }
// Vue.i18n.add('en', translationsEn)
// Vue.i18n.set('en')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用vue-router
  store // 使用vues
  // components: { App },
  // template: '<App/>'
})
