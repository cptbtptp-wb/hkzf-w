<template>
  <div class="look-house">
    <!-- 地址栏 -->
    <div class="header">
      <van-icon name="arrow-left" @click-left="$router.go(-1)" class="tuichu" />
      <div class="search-box">
        <div class="left">
          <span
            >{{ currentCity.label }}
            <van-icon name="arrow-down" @click="$router.push('/city')" />
          </span>
          <p>
            <van-icon name="search" />
            <i>请输入小区或地址</i>
          </p>
        </div>
      </div>
      <div class="right">
        <van-icon
          name="location-o"
          color="#fff"
          @click="$router.push('/map')"
        />
      </div>
    </div>
    <!-- 筛选区域 -->
    <div>
      <van-dropdown-menu active-color="#21b97a">
        <van-dropdown-item title="区域" ref="area">
          <van-picker
            show-toolbar
            toolbar-position="bottom"
            value-key="label"
            :columns="columns"
            @cancel="$refs.area.toggle()"
            @confirm="onConfirm"
          />
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="method">
          <van-picker
            show-toolbar
            value-key="label"
            :columns="houseCondition.rentType"
            @confirm="onConfirmFnA"
            @cancel="$refs.method.toggle()"
            toolbar-position="bottom"
          />
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="renMoney">
          <van-picker
            show-toolbar
            value-key="label"
            :columns="houseCondition.price"
            @cancel="$refs.renMoney.toggle()"
            @confirm="onConfirmFnB"
            toolbar-position="bottom"
          />
        </van-dropdown-item>
        <van-dropdown-item title="筛选" id="filter" ref="filter">
          <!-- <van-picker
            show-toolbar
            toolbar-position="bottom"
            @cancel="$refs.filter.toggle()"
            @confirm="clickConfirmc"
          > -->
          <!-- 右弹出框 -->
          <!-- <template #columns-top>
              <div class="choose">
                <dl>
                  <dt class="choose-title">户型</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: roomSelected.indexOf(item.value) !== -1,
                      }"
                      v-for="(item, index) in houseCondition.roomType"
                      :key="index"
                      @click="clickChoose(roomSelected, item)"
                    >
                      {{ item.label }}
                    </span>
                  </dd>
                  <dt class="choose-title">朝向</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: orientedSelected.indexOf(item.value) !== -1,
                      }"
                      class@click="clickChoose(orientedSelected, item)"
                      v-for="(item, index) in houseCondition.oriented"
                      :key="index"
                    >
                      {{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">楼层</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: floorSelected.indexOf(item.value) !== -1,
                      }"
                      @click="clickChoose(floorSelected, item)"
                      v-for="(item, index) in houseCondition.floor"
                      :key="index"
                      >{{ item.label }}</span
                    >
                  </dd>
                  <dt class="choose-title">房屋亮点</dt>
                  <dd class="choose-key">
                    <span
                      class="key-type"
                      :class="{
                        active: charSelected.indexOf(item.value) !== -1,
                      }"
                      @click="clickChoose(charSelected, item)"
                      v-for="(item, index) in houseCondition.characteristic"
                      :key="index"
                      >{{ item.label }}</span
                    >
                  </dd>
                </dl>
              </div>
            </template> -->
          <!-- </van-picker> -->
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <!-- 房源数据 -->
    <HouseItem
      v-for="(item, index) in houseItem.list"
      :key="index"
      :obj="item"
    ></HouseItem>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HouseItem from '@/components/HouseItem.vue'
import { getHouseItem, getHouseCondition } from '@/api/house'
// const H_M = 'houseMessage'
// const key = null
export default {
  created () {
    this.getHouseItem()
    this.getHouseCondition()
    //   const area = this.areaFormat(this.houseCondition.area.children)
    //   const subway = this.areaFormat(this.houseCondition.subway.children)
    //   this.columns = [{ label: '区域', children: area }, { label: '地铁', children: subway }]
  },
  data () {
    return {
      houseItem: [],
      columns: [],
      show: false,
      houseCondition: {},
      state: {
        area: '',
        subway: ''
      },
      roomSelected: [],
      orientedSelected: [],
      floorSelected: [],
      charSelected: []
    }
  },
  methods: {
    // onConfirm () {
    //   Toast(`当前值：${value}, 当前索引：${index}`)
    // },
    onCancel () {
      Toast('取消')
    },
    showPopup () {
      this.show = true
    },
    async getHouseItem () {
      try {
        const res = await getHouseItem(this.currentCity.value)
        // console.log(res)
        this.houseItem = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getHouseCondition () {
      try {
        const res = await getHouseCondition(this.currentCity.value)
        console.log(res)
        this.houseCondition = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
    // areaFormat (Arr) {
    //   return Arr.map(item => {
    //     return {
    //       label: item.label,
    //       value: item.value,
    //       children: item.children
    //         ? item.children.map(v => ({
    //           label: v.label,
    //           value: v.value
    //         }))
    //         : [{ label: '' }]
    //     }
    //   })
    // },
    // cv部分
    // onConfirm (value) {
    //   console.log(value)
    //   const val = value[2] ? value[2] : value[1]
    //   const result = this.findValue(this.columns[0].children, val)
    //   if (value[0] === '区域') {
    //     this.state.area = result
    //   } else {
    //     this.state.subway = result
    //   }
    //   this.$refs.area.toggle()
    //   this.housesList = []
    //   this.renderHousesList()
    // },
    // findValue (arr, val) {
    //   // console.log(arr, val)
    //   arr.forEach(item => {
    //     if (item.label === val) {
    //       key = item.value
    //     } else if (item.children && item.children.length > 0) {
    //       this.findValue(item.children, val)
    //     }
    //   })
    //   console.log(key)
    //   return key
    // },
    // onConfirmFnA (value) {
    //   // console.log(value)
    //   this.state.rentType = value.value
    //   this.$refs.method.toggle()
    //   this.housesList = []
    //   this.renderHousesList()
    // },
    // onConfirmFnB (value) {
    //   // console.log(value)
    //   this.state.price = value.value
    //   this.$refs.renMoney.toggle()
    //   this.housesList = []
    //   this.renderHousesList()
    // },
    // clickChoose (Array, val) {
    //   if (Array.length === 0) {
    //     Array.push(val.value)
    //   } else if (Array.indexOf(val.value) !== -1) {
    //     const index = Array.findIndex(item => item === val.value)
    //     Array.splice(index, 1)
    //   } else {
    //     Array.push(val.value)
    //   }
    // },
    // clickConfirmc () {
    //   this.$refs.filter.toggle()
    //   this.housesList = []
    //   this.renderHousesList()
    // }
  },
  computed: {
    ...mapState(['currentCity'])
    // more () {
    //   const str1 = this.roomSelected.join(',')
    //   const str2 = this.orientedSelected.join(',')
    //   const str3 = this.floorSelected.join(',')
    //   const str4 = this.charSelected.join(',')
    //   return str1 + ',' + str2 + ',' + str3 + ',' + str4
    // }
  },
  watch: {},
  filters: {},
  components: {
    HouseItem
  }
}
</script>

<style scoped lang='less'>
.look-house {
  .header {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #21b97a;
    .tuichu {
      color: #fff;
      margin-left: 5px;
      font-size: 40px;
    }
    .search-box {
      width: 570px;
      height: 60px;
      margin-right: 40px;
    }
    .left {
      display: flex;
      align-items: center;
      margin-left: 40px;
      width: 100%;
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
          font-size: 34px;
          margin-right: 10px;
        }
      }
    }
    .right {
      margin-left: 20px;
      .van-icon {
        font-size: 40px;
      }
    }
  }
  /deep/.van-picker__toolbar {
    height: 100px !important;
    border-top: 1px solid #eee;
  }
  /deep/.van-picker__cancel {
    // flex: 1;
    width: 250px;
    color: #21b97a;
    font-size: 36px;
  }
  /deep/.van-picker__confirm {
    flex: 1;
    color: #fff;
    background-color: #21b97a;
    font-size: 36px;
  }
  // 最后一个筛选框
  #filter {
    /deep/.van-dropdown-item {
      position: unset;
    }
    /deep/.van-dropdown-item__content {
      position: fixed;
      min-height: 1400px;
    }
    /deep/.van-overlay {
      height: 1334px;
    }
    /deep/.van-popup--top {
      left: unset;
      right: 0;
      width: 75%;
    }
    /deep/.van-picker {
      height: 1334px;
      padding-bottom: 100px;
      .van-picker__mask {
        background: unset;
      }
    }
    /deep/.van-picker__columns {
      position: unset;
      display: none;
    }
    /deep/.van-picker__toolbar {
      position: fixed;
      bottom: 0;
      width: 580px;
    }
    /deep/.van-picker__cancel {
      background-color: #fff;
    }
  }
  .choose {
    padding-bottom: 100px;
    margin-bottom: -476px;
    .choose-title {
      padding: 0 30px;
      margin: 40px 0;
      font-size: 30px;
      color: #333;
    }
    .choose-key {
      margin-left: 80px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 14px;
      .key-type {
        display: inline-block;
        height: 64px;
        width: 140px;
        margin: 0 36px 30px 0;
        border: 1px solid #ddd;
        border-radius: 6px;
        line-height: 64px;
        text-align: center;
        font-size: 24px;
        color: #888;
      }
      .active {
        border: 1px solid #21b97a;
        color: #21b97a;
        background-color: #defaef;
      }
    }
  }
}
</style>
