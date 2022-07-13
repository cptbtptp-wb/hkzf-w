<template>
  <div class="container">
    <router-view />
    <van-tabbar class="" v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o">首页 </van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search">房源</van-tabbar-item>
      <van-tabbar-item replace to="/news" icon="newspaper-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LaoutIndex',
  created () { },
  data () {
    return {
      active: 0
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  .van-tabbar-item{
    color: #888888;
  }
  .van-tabbar-item--active{
    color:rgb(33, 185, 122)
  }
}
</style>
