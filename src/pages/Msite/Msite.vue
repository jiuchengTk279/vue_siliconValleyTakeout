<template>
    <div class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <span class="header_search" slot="left">
                <i class="iconfont iconsousuo"></i>
            </span>
            <span class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </span>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav" v-if="categories.length">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(categories, index) of categoriesArr" :key="index">
                    <a href="javascript:" class="link_to_food" v-for="(category, index) of categories" :key="index">
                        <div class="food_container">
                            <img :src="baseImageUrl + category.image_url">
                        </div>
                        <span>{{ category.title }}</span>
                    </a>
                </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <img src="./images/msite_back.svg" alt="blank" v-else>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-new */
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import { mapState } from 'vuex'

export default {
  name: 'Msite',
  components: {
    HeaderTop,
    ShopList
  },
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    // 1. 调用actions
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getShops')
    // 创建一个Swiper 实例对象，实现轮播
    // new Swiper('.swiper-container', {
    //   // 循环轮播
    //   loop: true,
    //   // 分页器
    //   pagination: {
    //     el: '.swiper-pagination'
    //   }
    // })
  },
  watch: {
    // watch监听，在categories中有数组了，有数据了，在异步更新页面之前执行
    categories (val) {
      // 界面更新就立即创建Swiper对象，数据修改以后，就会马上执行
      this.$nextTick(() => {
        // 一旦完成界面更新，就会立即调用
        // 创建一个Swiper 实例对象，实现轮播
        new Swiper('.swiper-container', {
          // 循环轮播
          loop: true,
          // 分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  computed: {
    // 2. 取state中的数据  3. 显示数据
    ...mapState(['address', 'categories']),
    // 根据categories一维数组生成一个二维数组，小数组的元素个数最大是8
    categoriesArr () {
      const {categories} = this
      // 空的二维数组
      const arr = []
      // 空的小数组，最大长度为8，每页显示8个
      let minArr = []
      // 遍历 categories
      categories.forEach(c => {
        // 如果当前小数组已经满了，创建一个新的
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的，将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前的分类保存到小数组中去
        minArr.push(c)
      })
      return arr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import '../../common/stylus/mixins.styl'
    .msite  //首页
        width 100%
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
                width 100%
                height 100%
                .swiper-wrapper
                    width 100%
                    height 100%
                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap
                        .link_to_food
                            width 25%
                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0
                                img
                                    display inline-block
                                    width 50px
                                    height 50px
                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666
                .swiper-pagination
                    >span.swiper-pagination-bullet-active
                        background #02a774
        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
                padding 10px 10px 0
                .shop_icon
                    margin-left 5px
                    color #999
                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px
</style>
