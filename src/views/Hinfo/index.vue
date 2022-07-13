<template>
  <div class="home-info">
    <div class="bg-color">
      <!-- 头顶区域 -->
      <div class="header">
        <van-nav-bar
          :title="houseInfo.title"
          left-arrow
          @click-left="$router.back()"
        />
      </div>
      <!-- 轮播图 -->
      <img
        :src="`http://liufusong.top:8080${
          houseInfo.houseImg && houseInfo.houseImg[0]
        }`"
        alt=""
      />
      <div class="slider-slide">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <!-- <van-swipe-item>{{
            houseInfo.houseImg && houseInfo.houseImg[0]
          }}</van-swipe-item> -->
        </van-swipe>
      </div>
      <!-- 房源信息 -->
      <div class="house-detail">
        <h3>{{ houseInfo.community }}</h3>
        <div class="house-subway">
          <span>{{ houseInfo.tags && houseInfo.tags[0] }}</span>
        </div>
        <div class="house-detail-info">
          <div class="rent">
            {{ houseInfo.price }}<span>/月</span>
            <p>租金</p>
          </div>
          <div class="room">
            {{ houseInfo.roomType }}
            <p>房型</p>
          </div>
          <div class="acreage">
            {{ houseInfo.size }}平米
            <p>面积</p>
          </div>
        </div>
        <div class="house-pattern">
          <div class="left">
            <div class="fitment"><span>装修：</span>精装</div>
            <div class="floor"><span>楼层：</span>{{ houseInfo.floor }}</div>
          </div>
          <div class="right">
            <div class="aspect">
              <span>朝向：</span
              >{{ houseInfo.oriented && houseInfo.oriented[0] }}
            </div>
            <div class="types"><span>类型：</span>普通住宅</div>
          </div>
        </div>
      </div>
      <!-- 房屋地图 -->
      <div class="house-map">
        <div class="house-name">小区:<span>天山星城</span></div>
        <div class="house-map-mask" id="map"></div>
      </div>
      <!-- 房源  配套 -->
      <div class="house-assort">
        <div class="house-title">房屋配套</div>
        <ul class="house-package">
          <li v-for="(item, index) in houseInfo.supporting" :key="index">
            <van-icon name="tv-o" /><span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <!-- 房源  概况 -->
      <div class="house-survey">
        <div class="house-title">房源概况</div>
        <div class="house-contact">
          <div class="house-user">
            <img src="" />
            <div class="huose-userInfo">
              <div class="house-userInfo-name">王女士</div>
              <div class="house-userAuth">
                <van-icon name="shield-o" />
                已认证房主
              </div>
            </div>
            <span class="house-userMsg">发信息</span>
          </div>
        </div>
        <div class="house-destText">
          {{ houseInfo.description }}
          <!-- "1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。" -->
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <div class="house-recommend">
        <div class="house-title">猜你喜欢</div>
        <div class="house-items">
          <div class="house-items-one">
            <div class="house-items-img">
              <img src="@/assets/1.png" />
            </div>
            <div class="house-items-content">
              <h3 class="house-items-title">安贞西里 3室1厅</h3>
              <div class="house-items-desc">72.32㎡/南 北/低楼层</div>
              <span class="house-items-tag">随时看房</span>
              <div class="house-items-price">
                <span class="house-items-priceNum">4500</span>"元/月"
              </div>
            </div>
          </div>
          <div class="house-items-one">
            <div class="house-items-img">
              <img src="@/assets/1.png" />
            </div>
            <div class="house-items-content">
              <h3 class="house-items-title">安贞西里 3室1厅</h3>
              <div class="house-items-desc">72.32㎡/南 北/低楼层</div>
              <span class="house-items-tag">随时看房</span>
              <div class="house-items-price">
                <span class="house-items-priceNum">4500</span>"元/月"
              </div>
            </div>
          </div>
          <div class="house-items-one">
            <div class="house-items-img">
              <img src="@/assets/1.png" />
            </div>
            <div class="house-items-content">
              <h3 class="house-items-title">安贞西里 3室1厅</h3>
              <div class="house-items-desc">72.32㎡/南 北/低楼层</div>
              <span class="house-items-tag">随时看房</span>
              <div class="house-items-price">
                <span class="house-items-priceNum">4500</span>"元/月"
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部栏 -->
      <div class="house-footer">
        <div class="house-shoucang">
          <!-- <van-icon name="star-o" />
          收藏 -->
          <HouseCollect
            :is_collected.sync="is_collected"
            :id="id"
          ></HouseCollect>
        </div>
        <div class="house-zixun">在线资讯</div>
        <div class="house-phone">电话预约</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHouseInfo } from '@/api/house'
import { getFavorites } from '@/api/user'
import HouseCollect from '@/components/HouseCollect.vue'
const { BMapGL } = window
const labelStyle = {
  position: 'absolute',
  zIndex: -7982820,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  userSelect: 'none'
}
const mapArrow = `
  background: url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat;
  position: absolute;
  width: 11px;
  height: 10px;
  top: 23px;
  left: 10px;
  overflow: hidden
`
export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  async created () {
    this.getFavorites()
    try {
      const res = await getHouseInfo(this.id)
      // console.log(res)
      this.renderMap(res.data.body.community, res.data.body.coord)
      this.houseInfo = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      houseInfo: {},
      // houseFavorites: {}
      is_collected: ''
    }
  },
  methods: {
    renderMap (community, coord) {
      // console.log(community)
      const { latitude, longitude } = coord
      const map = new BMapGL.Map('map')
      const point = new BMapGL.Point(longitude, latitude)
      map.centerAndZoom(point, 17)
      const label = new BMapGL.Label('', {
        position: point,
        offset: new BMapGL.Size(0, -36)
      })
      label.setStyle(labelStyle)
      label.setContent(`
        <span>${community}</span>
        <div style="${mapArrow}"></div>
      `)
      map.addOverlay(label)
    },
    async getFavorites () {
      try {
        const res = await getFavorites(this.id)
        // console.log(res)
        this.is_collected = res.data.body.isFavorite
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseCollect
  }
}
</script>

<style scoped lang='less'>
img {
  width: 100%;
  height: 504px;
}
.home-info {
  overflow: auto;
  height: 100vh;
  .bg-color {
    position: relative;
    background-color: #f6f5f6;
  }
}
.van-nav-bar {
  background-color: #21b97a;
}
// 轮播图
.slider-slide {
  .my-swipe .van-swipe-item {
    width: 100%;
    height: 504px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
// 房源信息
.house-detail {
  width: 100%;
  height: 532px;
  padding: 30px;
  // background-color: pink;
  h3 {
    margin-top: 32px;
    font-weight: 400;
    font-size: 32px;
    color: #333;
  }
  .house-subway {
    span {
      display: inline-block;
      font-size: 24px;
      color: #39becd;
      background: #e1f5f8;
      border-radius: 6px;
      padding: 8px 10px;
      margin-right: 10px;
      line-height: 24px;
    }
  }
  .house-detail-info {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    margin: 30px 0;
    padding: 30px 0;
    p {
      margin-top: 8px;
      text-align: center;
      font-size: 28px;
      color: #999;
    }
    .rent,
    .room,
    .acreage {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      text-align: center;
      color: #fa5741;
      font-weight: bolder;
      font-size: 32px;
      span {
        color: #fa5741;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  .house-pattern {
    display: flex;
    height: 104px;
    .left,
    .right {
      flex: 1;
      font-size: 26px;
      color: #333;
      span {
        display: inline-block;
        color: #999;
        padding-right: 10px;
        line-height: 26px;
      }
    }
  }
}
// 房屋地图
.house-map {
  margin-top: 20px;
  width: 100%;
  height: 378px;
  .house-name {
    padding: 0 30px;
    height: 88px;
    line-height: 88px;
    font-size: 28px;
    color: #666;
    span {
      margin-left: 20px;
      font-size: 28px;
      color: #333;
    }
  }
  .house-map-mask {
    width: 100%;
    height: 290px;
    background: skyblue;
  }
}
// 房源配套
.house-assort {
  margin-bottom: 20px;
  padding: 0 20px;
  background: #fff;
  .house-title {
    font-weight: 600;
    font-size: 30px;
    color: #333;
    margin-bottom: 20px;
    padding: 30px 0;
    border-bottom: 1px solid #cecece;
  }
  .house-package {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    text-align: center;
    background: #fff;
    font-size: 28px;
    color: #333;
    li {
      display: flex;
      flex-direction: column;
      margin: 20px 0;
      width: 20%;
      line-height: 46px;
      font-size: 28px;
      .van-icon {
        font-size: 46px;
        color: #333;
      }
      span {
        color: #333;
        font-size: 28px;
      }
    }
  }
}
// 房源概况
.house-survey {
  margin: 20px 0;
  padding: 0 20px;
  line-height: 150%;
  .house-title {
    font-weight: 600;
    font-size: 30px;
    color: #333;
    margin-bottom: 20px;
    padding: 30px 0;
    border-bottom: 1px solid #cecece;
  }
  .house-contact {
    position: relative;
    .house-user {
      margin-bottom: 20px;
      display: flex;
      color: #333;
      img {
        width: 104px;
        height: 104px;
        margin: 20px 20px 0 0;
        border-style: none;
      }
      .huose-userInfo {
        padding: 30px 0 0 10px;
        line-height: 1.8;
        .house-userInfo-name {
          font-size: 28px;
          color: #333;
        }
        .house-userAuth {
          text-align: center;
          font-size: 24px;
          color: #fa5741;
          .van-icon {
            font-size: 32px;
            font-style: normal;
            font-weight: 600;
          }
        }
      }
      .house-userMsg {
        position: absolute;
        right: 30px;
        top: 40px;
        color: #33be85;
        border: 1px solid #33be85;
        border-radius: 6px;
        padding: 6px 30px;
        font-size: 28px;
        line-height: 1.5;
      }
    }
  }
  .house-destText {
    line-height: 1.6;
    padding: 20px 0;
    font-size: 28px;
    color: #333;
  }
}
// 猜你喜欢
.house-recommend {
  margin: 20px 0 0;
  margin-bottom: 100px;
  padding: 0 30px;
  .house-title {
    font-weight: 600;
    font-size: 30px;
    color: #333;
    margin-bottom: 20px;
    padding: 30px 0;
    border-bottom: 1px solid #cecece;
  }
  .house-items {
    &:last-child {
      border-bottom: none;
    }
    .house-items-one {
      height: 240px;
      position: relative;
      box-sizing: border-box;
      justify-content: space-around;
      padding-top: 36px;
      border-bottom: 1px solid #e5e5e5;
      .house-items-img {
        float: left;
        width: 212px;
        height: 160px;
        img {
          width: 212px;
          height: 160px;
        }
      }
      .house-items-content {
        overflow: hidden;
        line-height: 1.2;
        padding-left: 24px;
        h3 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
          margin: 0;
          font-size: 30px;
          color: #394043;
        }
        .house-items-desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
          font-size: 24px;
          color: #afb2b3;
        }
        .house-items-tag {
          display: inline-block;
          font-size: 24px;
          border-radius: 6px;
          padding: 8px 10px;
          margin-right: 10px;
          line-height: 24px;
          color: #39becd;
          background: #e1f5f8;
        }
        .house-items-price {
          font-size: 24px;
          color: #fa5741;
          .house-items-priceNum {
            font-size: 32px;
            font-weight: bolder;
            color: #fa5741;
          }
        }
      }
    }
  }
}
// 底部栏
.house-footer {
  z-index: 9999;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  border-top: 1px solid #cecece;
  text-align: center;
  font-size: 34px;
  color: #999;
  background-color: #fff;
  .house-shoucang {
    flex: 1;
    margin-left: 0;
    text-align: center;
    line-height: 100px;
    font-size: 34px;
    color: #999;
    border-right: 1px solid #cecece;
    .van-icon {
      margin-right: 6px;
      font-size: 36px;
    }
  }
  .house-zixun {
    flex: 1;
  }
  .house-phone {
    flex: 1;
    background-color: #33be85;
    color: #fff;
  }
}
</style>
