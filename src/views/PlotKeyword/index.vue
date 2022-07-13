<template>
  <div class="plot-keyword">
    <form action="/">
      <van-search
        show-action
        placeholder="请输入小区或地址"
        @cancel="$router.back()"
      >
        <!-- <template #action>
          取消
        </template> -->
      </van-search>
    </form>
  </div>
</template>

<script>
export default {
  created () { },
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
</style>
