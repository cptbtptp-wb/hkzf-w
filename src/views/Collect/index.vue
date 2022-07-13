<template>
  <div class="collect-box">
    <div class="header">
      <van-nav-bar title="收藏列表" left-arrow @click-left="$router.back()" />
    </div>
    <!-- 收藏列表 -->
    <HouseItem
      v-for="(item, index) in collectList"
      :key="index"
      :obj="item"
    ></HouseItem>
  </div>
</template>

<script>
import { getCollectList } from '@/api/user'
import HouseItem from '@/components/HouseItem.vue'
export default {
  async created () {
    try {
      const res = await getCollectList()
      console.log(res)
      this.collectList = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      collectList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    HouseItem
  }
}
</script>

<style scoped lang='less'>
.header {
  .van-nav-bar {
    background-color: #21b97a;
  }
}
</style>
