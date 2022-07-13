<template>
  <div class="least-house">
    <div class="least-box">
      <!-- 一.发布房源 -->
      <div class="header">
        <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
      </div>
      <!-- 二.房源信息 -->
      <div class="least-info">
        <div class="least-info-title">房源信息</div>
        <div class="least-info-body">
          <!-- 小区名称 -->
          <van-cell-group>
            <van-field
              class="house-plot"
              v-model="value1"
              label="小区名字"
              placeholder="请输入小区名称"
              is-link
              @click="$router.push('plotkeyword')"
            >
            </van-field>
          </van-cell-group>
          <!-- 租金 -->
          <van-cell-group>
            <van-field
              class="house-rent"
              v-model="value2"
              label="租金"
              placeholder="请输入租金/月"
              ><template #extra>￥/月</template></van-field
            >
          </van-cell-group>
          <!-- 建筑面积 -->
          <van-cell-group>
            <van-field
              class="house-area"
              v-model="value3"
              label="建筑面积"
              placeholder="请输入建筑面积"
              ><template #extra>㎡</template>
            </van-field>
          </van-cell-group>
          <!-- 户型 -->
          <HouseComfig
            label="户型"
            class="least-info-type"
            :columns="list.roomType"
          ></HouseComfig>
          <!-- 所在楼层 -->
          <HouseComfig
            label="所在楼层"
            class="least-info-type"
            :columns="list.floor"
          ></HouseComfig>
          <!-- 朝向 -->
          <HouseComfig
            label="朝向"
            class="least-info-type"
            :columns="list.oriented"
          ></HouseComfig>
        </div>
      </div>
      <!-- 三.房屋标题 -->
      <div class="least-info-title">
        <div class="least-info-titleTop">房屋标题</div>
        <div class="least-info-control">
          <div class="least-infoInput">
            <input
              type="text"
              placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
            />
          </div>
        </div>
      </div>
      <!-- 四、房屋图像 -->
      <div class="least-info-pic">
        <div class="least-info-head">房屋图像</div>
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="uploader" />
          </template>
        </van-field>
      </div>
      <!-- 五、房屋配置 -->
      <div class="least-info-deploy">
        <div class="least-info-title">房屋配置</div>
        <div class="least-info-list">
          <van-grid :column-num="5">
            <van-grid-item
              icon="photo-o"
              v-for="(item, index) in list.supporting"
              :key="index"
              :text="item.label"
            />
          </van-grid>
        </div>
      </div>
      <!-- 六、房屋描述 -->
      <div class="least-info-desc">
        <div class="least-info-title">房屋描述</div>
        <div class="least-info-body">
          <textarea
            placeholder="请输入房屋描述信息"
            rows="5"
            style="height: 128px"
          ></textarea>
        </div>
      </div>
      <!-- 七、底部按钮 -->
      <div class="least-info-btn">
        <div class="left">取消</div>
        <div class="right">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import HouseComfig from './components/HouseConfig.vue'
import { getHouseTerm } from '@/api/house'
export default {
  name: 'LeaseIndex',
  created () {
    this.getHouseTerm()
  },
  data () {
    return {
      uploader: [],
      value1: '',
      value2: '',
      value3: '',
      list: {}
    }
  },
  methods: {
    async getHouseTerm () {
      try {
        const res = await getHouseTerm()
        // console.log(res)
        this.list = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseComfig
  }
}
</script>

<style scoped lang='less'>
.least-house {
  overflow: auto;
  height: 100vh;
  background-color: #f5f5f9;
  .least-box {
    // padding-bottom: 140px;
    background-color: #f5f5f9;
    // 二、房源信息
    .least-info {
      width: 100%;
      .least-info-title {
        padding: 30px 30px 18px;
        color: #21b97a;
        background-color: #fff;
        font-size: 30px;
        border-bottom: 1px solid #ededed;
      }
      .least-info-body {
        padding-left: 30px;
        background-color: #fff;
        line-height: 3;
        .left {
          font-size: 28px;
          color: #666;
        }
        .right {
          vertical-align: bottom;
          font-size: 28px;
          color: #888;
          margin-right: 30px;
          .van-icon {
            font-size: 34px;
          }
        }
        .least-info-plot {
          display: flex;
          justify-content: space-between;
        }
        .house-plot,
        .house-area,
        .house-rent {
          padding-left: 0;
        }
      }
    }
    // 三、房屋标题
    .least-info-title {
      .least-info-titleTop {
        padding: 30px 30px 18px;
        color: #333;
        font-size: 28px;
        background-color: #fff;
        border-bottom: 1px solid #ededed;
      }
      .least-info-control {
        background-color: #fff;
        .least-infoInput {
          display: flex;
          padding-left: 30px;
          width: 100%;
          height: 88px;
          font-size: 28px;
          color: #efefef;
          line-height: 2;
          width: 100%;
          input {
            flex: 1;
          }
        }
      }
    }
    // 四、房屋图像
    .least-info-pic {
      .least-info-head {
        padding: 30px 30px 18px;
        color: #333;
        font-size: 28px;
        background-color: #fff;
        border-bottom: 1px solid #ededed;
      }
      .least-info-list {
        padding: 18px 16px 0;
        padding-bottom: 30px;
        background-color: #fff;
        .least-info-center {
          position: relative;
          flex: 1;
          margin-right: 10px;
          margin-left: 0;
          min-width: 20px;
          .up-img {
            width: 200px;
            height: 200px;
            border: 1px solid #ededed;
            border-radius: 6px;
            .van-icon {
              margin-left: 40px;
              margin-top: 40px;
              font-size: 100px;
              color: #ededed;
            }
          }
        }
      }
    }
    // 五、房屋配置
    .least-info-deploy {
      .least-info-title {
        padding: 30px 30px 18px;
        color: #333;
        font-size: 28px;
        background-color: #fff;
        border-bottom: 1px solid #ededed;
      }
      .least-info-list {
        padding-bottom: 40px;
      }
    }
    // 六、房屋描述
    .least-info-desc {
      margin-bottom: 300px;
      .least-info-title {
        padding: 30px 30px 18px;
        color: #333;
        font-size: 28px;
        background-color: #fff;
        border-bottom: 1px solid #f6f6f6;
      }
      .least-info-body {
        display: flex;
        width: 100%;
        height: 128px;
        textarea {
          flex: 1;
          border: none;
          font-size: 28px;
          line-height: 3;
          text-indent: 30px;
          color: #999;
        }
      }
    }
    // 七
    .least-info-btn {
      display: flex;
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      line-height: 90px;
      height: 90px;
      z-index: 1;
      color: #fff;
      font-size: 30px;
      background-color: #fff;
      .left {
        flex: 1;
        color: #21b97a;
      }
      .right {
        flex: 1;
        color: #fff;
        background-color: #21b97a;
      }
    }
  }
}
</style>
