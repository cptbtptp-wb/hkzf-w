<template>
  <div class="login-container">
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.back()"/>
    <!-- 提交表单 -->
    <van-form class="forminfo" @submit="onSubmit" ref="from">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
        :rules="[
          { required: true },
          { pattern: /^[a-zA-Z0-9_-]{5,16}$/, message: '不符合手机格式' },
        ]"
      />
      <van-field
        v-model.trim="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true },
          { pattern: /^\d{6}$/, message: '验证码长度必须是6位' },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      username: 'itheima',
      password: '123456'
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const data = await login(values)
        console.log(data)
        this.$store.commit('setUser', data.data.body)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log('登录失败', err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  .forminfo {
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 40px;
    .van-cell {
      align-items: center;
      height: 120px;
      font-size: 34px;
      border-bottom: 1px solid #ededed;
    }
  }

  .van-nav-bar {
    line-height: none;
  }
  .van-button {
    background-color: rgb(33, 185, 122);
    border-radius: 2px;
    border: 1px solid #1cb676;
    height: 100px;
    font-size: 36px;
  }
}
</style>
