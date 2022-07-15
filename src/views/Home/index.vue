<template>
  <el-container class="container">
    <!-- 标题 上部分-->
    <el-header class="title">
      <el-row>
        <el-col :span="22"
          ><div class="grid-content bg-purple-dark">
            <img
              class="title-img"
              src="@/assets/logo.png"
              alt=""
            />遇见后台管理系统
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple-dark">
            <el-button @click="btndel">退出</el-button>
          </div></el-col
        >
      </el-row>
    </el-header>
    <!-- 下部分 -->
    <el-container>
      <!-- 左侧菜单 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="mbx" @click="isCollapse = !isCollapse">|||</div>
        <el-menu
          :collapse="isCollapse"
          background-color="#373d41"
          active-text-color="#e84133"
          text-color="#fff"
          unique-opened
          :router="true"
        >
          <el-submenu index="1">
            <template #title><i class="el-icon-s-custom"></i>用户管理</template>
            <el-menu-item index="/home/userslist"
              ><span class="el-icon-menu"></span>用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title
              ><i class="el-icon-bank-card"></i>权限管理</template
            >
            <el-menu-item index="/home/roleslist"
              ><span class="el-icon-menu"></span>角色列表</el-menu-item
            >
            <el-menu-item index="/home/permissionslist"
              ><span class="el-icon-menu"></span>权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title
              ><i class="el-icon-s-cooperation"></i>商品管理</template
            >
            <el-menu-item index="/home/productlist"
              ><span class="el-icon-menu"></span>商品列表</el-menu-item
            >
            <el-menu-item index="/home/classification"
              ><span class="el-icon-menu"></span>分类参数</el-menu-item
            >
            <el-menu-item index="/home/goodscategory"
              ><span class="el-icon-menu"></span>商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title><i class="el-icon-s-order"></i>订单管理</template>
            <el-menu-item index="/home/orderlist"
              ><span class="el-icon-menu"></span>订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template #title
              ><i class="el-icon-s-platform"></i>数据统计</template
            >
            <el-menu-item index="/home/datareport"
              ><span class="el-icon-menu"></span>数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  created () {

  },
  data () {
    return {
      isCollapse: false
    }
  },
  // 退出功能
  methods: {
    btndel () {
      localStorage.removeItem('TOKEN')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  font-size: 22px;
  font-family: "华文彩云";
  color: rgb(43, 182, 122);
  .title-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .el-button {
    margin: 10px 20px;
  }
}
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu {
  border-right: none;
}
.el-submenu {
  i {
    color: #909399;
  }
}
.mbx {
  height: 40px;
  background-color: rgb(200, 42, 129);
  text-align: center;
  line-height: 40px;
  font-weight: 800;
  color: #fff;
}

</style>
