<template>
  <div>
    <!-- 房源数据 -->
    <div
      class="houseItems"
      @click="$router.push({ name: 'hinfo', params: { id: obj.houseCode } })"
    >
      <!-- <div style="overflow: visible; height: 0px; width: 0px"> -->
      <!-- 每一套房 -->
      <div class="houseItem-oneOf">
        <!-- 左侧图片区域 -->
        <div class="left">
          <img :src="`http://liufusong.top:8080${obj.houseImg}`" />
        </div>
        <!-- 右侧详细信息 -->
        <div class="right">
          <h4>{{ obj.title }}</h4>
          <div class="houseItem-address">{{ obj.desc }}</div>
          <span class="houseItem-traffic"> {{ obj.tags[0] }} </span>
          <div class="houseItem-price">
            <span class="houseItem-priceNum">{{ obj.price }}</span>
            元/月
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .houseItems {
  width: 750px;
  // height: 500px;
  // background-color: pink;
  .houseItem-oneOf {
    margin-left: 30px;
    padding-top: 36px;
    padding-left: 26px;
    padding-bottom: 36px;
    width: 690px;
    height: 240px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 2px solid #e5e5e5;
    .left {
      img {
        margin-right: 24px;
        width: 212px;
        height: 160px;
        background-color: green;
      }
    }
    .right {
      flex: 1;
      h4 {
        font-size: 30px;
        color: #394043;
      }
      .houseItem-address {
        width: 454px;
        height: 44px;
        font-size: 20px;
        color: #afb2b3;
      }
      .houseItem-traffic {
        padding: 6px 10px;
        display: inline-block;
        background-color: #e1f5f8;
        color: #39becd;
        font-size: 24px;
        border-radius: 6px;
      }
      .houseItem-price {
        width: 454px;
        height: 44px;
        font-size: 20px;
        color: #fa5741;
        .houseItem-priceNum {
          font-size: 32px;
          font-weight: 600;
          color: #fa5741;
        }
      }
    }
  }
}
</style>
