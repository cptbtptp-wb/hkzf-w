<template>
  <div>
    <!-- 一登陆 -->
    <div class="bigbox" v-if="user && user.token">
      <div class="header header-login">
        <div class="login-box">
          <div class="auatar">
            <div class="auatar-box">
              <img :src="userInfo.avatar" />
            </div>
          </div>
          <div class="div">{{ userInfo.nickname }}</div>
          <div class="button" v-if="user && user.token" @click="logout">
            退出
          </div>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="bigbox" v-else>
      <div class="header header-gologin">
        <div class="login-box">
          <div class="auatar">
            <div class="auatar-box">
              <img src="@/assets/avatar.png" />
            </div>
            <!-- <p>游客</p>
            <div class="button">点击登录</div> -->
          </div>
          <div>游客</div>
          <div class="button" @click="$router.push('/login')">点击登录</div>
        </div>
      </div>
    </div>
    <!-- more -->
    <van-grid :column-num="3" class="my-icon" icon-size="20px">
      <van-grid-item icon="star-o" text="我的收藏" to="/collect"/>
      <van-grid-item icon="wap-home-o" text="我的出租" to="/rental"/>
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="ecard-pay" text="成为房主" />
      <van-grid-item icon="user-circle-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <!-- 底部bannar -->
    <div class="myjoin">
      <img src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// .header {
//   width: 100%;
//   height: 382px;
//   background: url("@/assets/bg.png") no-repeat;
//   background-size: cover;
// }
// 登录盒子
// .bigbox1{
//   width: 750px;
//   height: 600px;
//   background-color: pink;
// }

// 未登录盒子
.bigbox {
  width: 750px;
  height: 600px;
  .header {
    position: relative;
    width: 100%;
    height: 382px;
    background: url("@/assets/bg.png") no-repeat;
    background-size: cover;
    .login-box {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      position: absolute;
      bottom: -50%;
      left: 50%;
      transform: translateX(-50%);
      width: 636px;
      height: 330px !important;
      margin-top: 100px;
      padding: 0 100px;
      background-color: #fff;
      box-shadow: 0 0 10px 3px #ddd;
      .auatar {
        position: absolute;
        bottom: 80%;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 140px;
        border: 11px solid #f5f5f5;
        border-radius: 50%;
        // background-color: skyblue;
        .auatar-box {
          width: 120px;
          height: 120px;
          img {
            width: 100%;
            border-radius: 50%;
            border-style: none;
            box-sizing: border-box;
          }
        }
      }
      .div {
        // margin-top: 40px;
        // margin-bottom: 40px;
        // margin-left: 30px;
        font-size: 26px;
        color: rgb(0, 0, 0);
      }
      .button {
        margin-top: -28px;
        width: 140px;
        height: 60px;
        background-color: rgb(33, 185, 122);
        color: #fff;
        font-size: 26px;
        text-align: center;
        line-height: 60px;
        border-radius: 8px;
      }
    }
  }
}
// /deep/.myicon {
//   border-width:unset;
// }
.myjoin {
  width: 92%;
  margin-left: 30px;
  .img {
    border-style: none;
    box-sizing: border-box;
  }
}
</style>
