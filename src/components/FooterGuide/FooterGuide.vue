<template>
    <div class="footer-guide">
        <div href="javascript:;" class="guide-item" :class="{on: '/msite' === $route.path }" @click="handleTo('/msite')">
            <span class="item_icon">
                <i class="iconfont iconhome"></i>
            </span>
            <span>外卖</span>
        </div>
        <div href="javascript:;" class="guide-item" :class="{on: '/search' === $route.path }" @click="handleTo('/search')">
            <span class="item_icon">
                <i class="iconfont iconsousuo"></i>
            </span>
            <span>搜索</span>
        </div>
        <div href="javascript:;" class="guide-item" :class="{on: '/order' === $route.path }" @click="handleTo('/order')">
            <span class="item_icon">
                <i class="iconfont icondingdan"></i>
            </span>
            <span>订单</span>
        </div>
        <div href="javascript:;" class="guide-item" :class="{on: '/profile' === $route.path }" @click="handleTo('/profile')">
            <span class="item_icon">
                <i class="iconfont iconwodedangxuan"></i>
            </span>
            <span>我的</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FooterGuide',
  methods: {
    handleTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .footer-guide  //footer
        top-border-1px(#e4e4e4)
        position fixed
        z-index 100
        left 0
        right 0
        bottom 0
        background-color #fff
        width 100%
        height 50px
        display flex
        .guide-item
            display flex
            flex 1
            text-align center
            flex-direction column
            align-items center
            margin 5px
            color #999999
            &.on
                color #02a774
            span
                font-size 12px
                margin-top 2px
                margin-bottom 2px
                .iconfont
                    font-size 22px
</style>
