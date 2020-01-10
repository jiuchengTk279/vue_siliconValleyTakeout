<template>
    <div>
      <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <!-- current -->
            <li class="menu-item" v-for="(good, index) of shopGoods" :key="index" :class="{current: index === currentIndex}" @click="clickMenuItem(index)">
              <span class="text bottom-border-1px">
                <img class="icon" :src="good.icon" v-if="good.icon">
                {{ good.name }}
              </span>
            </li>
          </ul>
        </div>

        <div class="foods-wrapper" ref="foodsWrapper">
          <ul ref="foodsUl">
            <li class="food-list-hook" v-for="(good, index) of shopGoods" :key="index">
              <h1 class="title">{{ good.name }}</h1>
              <ul>
                <li class="food-item bottom-border-1px" v-for="(food, index) of good.foods" :key="index" @click="showFood(food)">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{ food.name }}</h2>
                    <p class="desc">{{ food.description }}</p>
                    <div class="extra">
                      <span class="count">月售{{ food.sellCount }}份</span>
                      <span>好评率{{ food.rating }}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{ food.price }}</span>
                      <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <CartControl :food="food"></CartControl>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <ShopCart></ShopCart>
      </div>
      <Food :food="food" ref="food"></Food>
    </div>
</template>

<script>
/* eslint-disable no-new */
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/Food/Food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
import {mapState} from 'vuex'
export default {
  name: 'ShopGoods',
  data () {
    return {
      // 右侧滑动的Y轴坐标，滑动过程中是实时发生变化的
      scrollY: 0,
      // 所有右侧分类li的top组成的数组，列表第一次显示后就不会再发生变化
      tops: [],
      // 商品的值，为动态传递的，需要显示的food
      food: {}
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  },
  mounted () {
    // 触发异步的actions，调actions
    // BScroll滚动的触发条件，内容的高度需要大于可视区域div的高度，才能产生滚动，滚动的是内容的高度
    this.$store.dispatch('getShopGoods', () => { // 数据更新以后就会执行
      // 列表数据更新以后，nextTick立马拿到更新后的DOM，列表数据更新显示后执行
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    // 从vuex中读取state数据
    ...mapState(['shopGoods']),

    // 计算得到当前分类的下标
    currentIndex () { // 初始化和相关的数据发生变化以后就会执行
      // 获取条件数据
      const {scrollY, tops} = this
      // 根据条件数据计算出结果
      const index = tops.findIndex((top, index) => {
        // scrollY >= 当前的top && scrollY < 下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回结果
      return index
    }
  },
  methods: {
    // 初始化滚动
    _initScroll () {
      // 列表显示后创建滚动
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        // proType的值为2，惯性滑动是不会触发的   3会触发惯性滑动
        probeType: 2,
        click: true
      })

      // 给右侧的列表绑定scroll滚动监听
      this.foodsScroll.on('scroll', ({x, y}) => {
        // console.log(x, y)
        this.scrollY = Math.abs(y)
      })

      // 给右侧的列表绑定scroll结束的监听
      this.foodsScroll.on('scrollEnd', ({x, y}) => {
        // console.log('scrollEnd', x, y)
        this.scrollY = Math.abs(y)
      })
    },

    // 初始化收集tops
    _initTops () {
      // 初始化tops
      const tops = []
      let top = 0
      tops.push(top)
      // 收集
      // 找到所有分类的li
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.clientHeight
        tops.push(top)
      })
      // 更新数据
      this.tops = tops
      // console.log(tops)
    },

    // 点击左侧的分类更新右侧的列表
    clickMenuItem (index) {
      // 使用右侧的列表滑动到对应的位置
      console.log(index)
      // 获取目标位置的scrollY
      const scrollY = this.tops[index]
      // 点击的分类成为当前的分类，立即更新scrollY
      this.scrollY = scrollY
      // 平滑滑动更新列表
      this.foodsScroll.scrollTo(0, -scrollY, 300)
    },

    // 点击商品展示对应的商品详情，显示点击的food
    showFood (food) {
      // 设置food
      this.food = food
      // 显示food，父组件调用子组件对象的方法，toggleShow
      this.$refs.food.toggleShow()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
