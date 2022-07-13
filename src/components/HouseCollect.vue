<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    :style="{ color: is_collected ? 'red' : '' }"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/user'
export default {
  name: 'HouseCollect',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      // const id = this.$route.params.cityID
      if (this.is_collected) { // 值是true说明当前是已收藏
        // 取消收藏
        try {
          await delCollect(this.id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 添加收藏
        try {
          await addCollect(this.id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      // ajax结束后
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
