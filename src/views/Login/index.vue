<template>
  <div class="login-container">
    <div class="form-box">
      <p class="p">后台管理</p>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'login',
  created () { },
  data () {
    return {
      token: '',
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3~8位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3~8位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      // 重置
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      // 二次校验
      try {
        await this.$refs.loginFormRef.validate()
        try {
          const res = await login(this.loginForm)
          this.token = res.data.data.token
          this.$message.success('登录成功')
          this.$store.commit('loginFn', res.data.data.token)
          this.$router.push('/home')
        } catch (err) {
          console.log(err)
          this.$message.error('登录失败')
        }
      } catch (err) {
        this.$message.error('登录表单校验失败')
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
.p{
  display: inline-block;
  font-size: 30px;
  color: #fff;
  margin: 0 auto;
  font-family: '华文彩云';
}
.login-container {
  text-align: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/36ea399b2afb4b38bcfd1dc48a6eee05.png') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    padding: 30px 15px;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
