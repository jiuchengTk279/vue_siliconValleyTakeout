<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import { reqFoodList } from './api/index.js'

export default {
  name: 'App',
  components: {
    FooterGuide
  },
  async mounted () {
    const result = await reqFoodList()
    console.log(result)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background  #f5f5f5
</style>
