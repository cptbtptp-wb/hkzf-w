<template>
  <div class="city-container">
    <div class="city-box">
      <!-- header区域 -->
      <div class="header-city">
        <div class="page-nav-bar">
          <van-nav-bar
            title="城市列表"
            left-arrow
            @click-left="$router.back()"
          />
        </div>
      </div>

      <!-- 滑动栏 -->
      <van-index-bar :index-list="indexList">
        <div
          class="div"
          v-for="(val, index) in indexList"
          :key="index"
          :sticky="false"
        >
          <van-index-anchor :index="val">{{
            val === "#" ? "当前城市" : val === "热" ? "热门城市" : val
          }}</van-index-anchor>
          <van-cell
            @click="handleCellClick(item)"
            :title="item.label"
            v-for="(item, index) in allCityList[val]"
            :key="index"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getCityList, getHotCity } from '@/api/area'
import { mapState } from 'vuex'
export default {
  name: 'CityListIndex',
  created () {
    this.getCityList()
    this.getHotCity()
  },
  data () {
    return {
      indexList: ['#', '热'],
      allCityList: {},
      hotcity: []
    }
  },
  methods: {
    async getCityList () {
      try {
        const res = await getCityList(1)
        const citylist = {}
        // console.log(res)
        res.data.body.forEach(item => {
          const first = item.short[0].toUpperCase()
          if (citylist[first]) {
            citylist[first].push(item)
          } else {
            citylist[first] = [item]
          }
        })
        this.allCityList = { ...this.allCityList, ...citylist }
        const allCityListIndex = Object.keys(citylist).sort()
        this.indexList = [...this.indexList, ...allCityListIndex]
      } catch (err) {
        console.log(err)
      }
    },
    async getHotCity () {
      // this.toast.loading({
      //   message: '加载中...',
      //   forbidClick: true
      // })
      try {
        const res = await getHotCity()
        this.hotcity = res.data.body
        this.allCityList = { ...this.allCityList, 热: [...this.hotcity], '#': [{ label: '北京' }] }
        this.getHotCity()
      } catch (err) {
        console.log(err)
      }
    },
    // 点击城市获取房源数据
    handleCellClick (val) {
      const res = this.hotcity.some(item => item.label === val.label)
      // console.log(res)
      if (res) {
        this.$store.commit('setCurrentCity', val)
        this.$router.back()
      } else {
        this.$toast('暂无该城市房源')
      }
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.city-box {
  padding-top: 90px !important;
}
.header-city {
  position: fixed;
  width: 100%;
  margin-top: -90px;
  z-index: 9999;
}
/deep/.van-index-bar__sidebar {
  margin-top: 50px !important;
}
/deep/.van-index-bar__index {
  margin-bottom: 30px !important;
}
</style>
