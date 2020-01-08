<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on: loginWay}" @click="handleToLoginWay">短信登录</a>
                    <a href="javascript:;" :class="{on: !loginWay}" @click="handleToLoginWay">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on: loginWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}" @click.prevent="sendCode">{{ computedTime>0 ? `已发送(${computedTime}s)` : '发送验证码'}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on: !loginWay}">
                        <section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                                <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
                            <div class="switch_button off" @click="handleShowPwd" :class="showPwd ? 'on': 'off'">
                                <div class="switch_circle" :class="{right: showPwd}"></div>
                                <span class="switch_text">{{ showPwd ? 'abc' : '...'}}</span>
                            </div>
                            </section>
                                <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"  ref="captcha" @click="getCaptcha">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="handleToBack()">
                <i class="iconfont iconjiantou"></i>
            </a>
        </div>
        <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></AlertTip>
    </div>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import {reqLogin, reqSendCode, reqLoginSms} from '../../api'

export default {
  name: 'Login',
  data () {
    return {
      // loginWay 为true时短信登录，为false时为密码登录
      loginWay: true,
      // 手机号
      phone: '',
      // 计算的倒计时时间
      computedTime: 0,
      // 密码
      pwd: '',
      // 密码展示，默认为false，不展示
      showPwd: false,
      // 短信验证码
      code: '',
      // 用户名
      name: '',
      // 图形验证码
      captcha: '',
      // 弹出框提示文本
      alertText: '',
      // 显示弹出框，默认为不展示
      showAlert: false
    }
  },
  components: {
    AlertTip
  },
  methods: {
    // 返回功能
    handleToBack () {
      this.$router.back()
    },
    // 切换登录方式
    handleToLoginWay () {
      this.loginWay = !this.loginWay
    },
    // 异步获取短信
    async sendCode () {
      // 如果当前没有计时
      if (!this.computedTime) {
        // 设计倒计时的时间
        this.computedTime = 30
        // 开启倒计时
        this.intervalId = setInterval(() => {
          this.computedTime--
          // 如果时间小于等于0，那么就清除定时器
          if (this.computedTime <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
      }

      // 发送ajax请求，向指定的手机号进行发送
      const result = await reqSendCode(this.phone)
      if (result.code === 1) {
        // 显示提示
        this.showAlert = true
        this.alertText = result.msg
        // 停止计时
        if (this.computedTime) {
          this.computedTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      }
    },
    // 展示密码
    handleShowPwd () {
      this.showPwd = !this.showPwd
    },
    // 关闭弹出警示框
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    // 更新图形验证码，获取新的验证码
    getCaptcha () {
      // 每次指定的src都是不一样的
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    // 异步登录
    async login () {
      // 前台表单验证
      let result
      if (this.loginWay) {
        // 短信验证登录
        const { rightPhone, phone, code } = this
        if (!this.rightPhone) {
          // 手机号不正确
          this.showAlert = true
          this.alertText = '手机号不正确'
        } else if (!/^\d{6}$/.test(this.code)) {
          // 短信验证码不正确
          this.showAlert = true
          this.alertText = '短信验证码不正确'
        }
        // 发送ajax请求短信登录
        result = await reqLoginSms(phone, code)
      } else {
        // 密码验证登录
        const { name, pwd, captcha } = this
        if (!this.name) {
          // 用户名必须指定
          this.showAlert = true
          this.alertText = '用户名必须指定'
        } else if (!this.pwd) {
          // 密码必须指定
          this.showAlert = true
          this.alertText = '密码必须指定'
        } else if (!this.captcha) {
          // 图形验证码必须指定
          this.showAlert = true
          this.alertText = '图形验证码必须指定'
        }
        // 发送ajax请求密码登录
        result = await reqLogin({name, pwd, captcha})
      }

      // 点击登录以后，停止计时
      if (this.computedTime) {
        this.computedTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }

      // 根据结果数据进行处理
      if (result.code === 0) {
        // 登录成功
        const user = result.data
        // 将user存储到vuex中
        // 调用action，去存user
        this.$store.dispatch('recordUser', user)
        // 跳转到用户页面
        this.$router.replace('/profile')
      } else {
        // 登录失败
        // 更新图形验证码
        this.getCaptcha()
        // 显示警告提示
        const msg = result.msg
        this.showAlert = true
        this.alertText = msg
      }
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  }
}
</script>

<style lang="stylus" style="stylesheet/stylus" scoped>
    @import '../../common/stylus/mixins.styl'
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone
                                    color black
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                        padding-right 10px
                                &.on
                                    background #02a774
                                >.switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(30px)
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #02a774
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
                    padding-top 10px
</style>
