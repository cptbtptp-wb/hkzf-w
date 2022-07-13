<template>
  <div>
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      :label="label"
      @click="showPicker = true"
      is-link
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="label"
        :columns="columns"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    columns: {
      // type: Array,
      required: true
    }
  },
  name: 'PinkIndex',
  created () { },
  data () {
    return {
      value: '',
      showPicker: false
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
.van-cell {
  padding: 0 30px 0 0;
  height: 86px;
  align-items: center;
  border-bottom: 1px solid #ededed;
}
.van-picker__confirm {
  font-size: 34px;
  color: #108ee9;
}
</style>
