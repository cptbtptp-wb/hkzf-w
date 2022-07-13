<template>
  <div class="home-box">
    <!-- banner区域 -->
    <div class="banner">
      <div class="header">
        <div class="left">
          <span>
            北京<van-icon name="arrow-down" @click="$router.push('/city')" />
          </span>
          <p>
            <van-icon name="search" />
            <i>请输入小区或地址</i>
          </p>
        </div>
        <div class="right">
          <van-icon
            name="location-o"
            color="#fff"
            @click="$router.push('/map')"
          />
        </div>
      </div>
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in viewpager" :key="item.id">
          <img :src="'http://liufusong.top:8080' + item.imgSrc" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 标签区域 -->
    <div class="house-info">
      <ul>
        <li>
          <img src="@/assets/zhengzu.png" />
          <p>整租</p>
        </li>
        <li @click="$router.push('/search')">
          <img src="@/assets/hezu.png" />
          <p>合租</p>
        </li>
        <li @click="$router.push('/map')">
          <img src="@/assets/map.png" />
          <p>地图找房</p>
        </li>
        <li @click="$router.push('/lease')">
          <img src="@/assets/chuzu.png" />
          <p>去出租</p>
        </li>
      </ul>
    </div>

    <!-- 更多quyu -->
    <div class="more">
      <h3>租房小组</h3>
      <span>更多</span>
    </div>

    <!-- 图文结合区域 -->
    <van-grid
      class="my-grid"
      direction="horizontal"
      :border="false"
      :column-num="2"
    >
      <van-grid-item class="mini-grid" v-for="item in renthome" :key="item.id">
        <img :src="'http://liufusong.top:8080' + item.imgSrc" />
        <div class="right">
          <p class="p-title">{{ item.title }}</p>
          <p class="p-desc">{{ item.desc }}</p>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getViewpager, getRentHome } from '@/api/home'

export default {
  name: 'Home',
  created () {
    this.getViewpager()
    this.getRentHome()
  },
  data () {
    return {
      viewpager: [],
      active: 0,
      renthome: []
    }
  },
  methods: {
    async getViewpager () {
      try {
        const res = await getViewpager()
        this.viewpager = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getRentHome () {
      try {
        const res = await getRentHome()
        this.renthome = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
body {
  background-color: #f6f5f6;
}
.home-box {
  .banner {
    width: 100%;
    height: 424px;
    .header {
      z-index: 1;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50px;
      width: 100%;
      height: 68px;
      background: transparent;
      .left {
        display: flex;
        align-items: center;
        margin-left: 40px;
        width: 620px;
        height: 100%;
        background-color: #fff;
        border-radius: 6px;
        span {
          margin: 0 10px;
          padding-right: 10px;
          font-size: 30px;
          color: #333;
          border-right: 1px solid #eee;
        }
        p {
          font-size: 28px;
          color: rgb(189, 186, 186);
          .van-icon-search {
            font-size: 34px !important;
            margin-right: 10px;
          }
        }
      }
    }
    .my-swipe .van-swipe-item {
      line-height: 424px;
      text-align: center;
    }
  }
  .house-info {
    margin: 20px 0;
    width: 100%;
    height: 244px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        img {
          margin-top: 20px;
          width: 120px;
          height: 120px;
        }
        p {
          text-align: center;
          margin-top: 22px;
          font-size: 28px;
        }
      }
    }
  }
}
.more {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 30px 20px;
  background-color: #f5f6f5;
  opacity: 1;
  color: #000;
  h3 {
    margin-left: 20px;
    font-size: 32px;
    color: #333;
  }
  span {
    margin-right: 20px;
    font-weight: 400;
    font-size: 30px;
    color: #787d82;
  }
}
.my-grid {
  background-color: #f5f6f5;
  .mini-grid {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 344px;
    height: 120px;
    img {
      margin-right: 20px;
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 0.4rem;
      color: #333;
    }
  }
}
</style>
