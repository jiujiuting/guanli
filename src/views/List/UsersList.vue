<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="div">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="input" clearable>
          </el-input>
        </el-col>
        <el-button class="ssbtn">
          <span class="el-icon-search"></span>
        </el-button>
        <el-button type="primary" class="tianjia">添加用户</el-button>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" stripe border>
        <el-table-column prop="a" label="#" width="50px" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="create_time" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" class="button">
          <template>
            <el-button
              class="btn-bg1"
              type="primary"
              icon="el-icon-edit"
              @click="btn1"
            ></el-button>
            <el-button
              class="btn-bg2"
              type="primary"
              icon="el-icon-delete"
              @click="btn2"
            ></el-button>
            <el-button
              class="btn-bg3"
              type="primary"
              icon="el-icon-share"
              @click="btn3"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { usersApi } from '@/api/home'
export default {
  created () {
    this.usersApi()
  },
  data () {
    return {
      // 默认页码
      currentPage4: 1,
      input: '',
      query: null, // 查询参数
      pagenum: 1, // 页码
      pagesize: 5, // 每页显示条数
      userList: [], // 数据列表
      total: null // 总条数
    }
  },
  methods: {
    // 数据列表
    async usersApi () {
      try {
        const res = await usersApi({ query: this.query, pagenum: this.pagenum, pagesize: this.pagesize })
        this.userList = res.data.data.users
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 每页显示条数--显示条数时改变时数据随之改变
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.usersApi()
    },
    // 第几页--页码改变时数据随之改变
    handleCurrentChange (val) {
      this.pagenum = val
      this.usersApi()
    },
    btn1 () {
      console.log('编辑')
    },
    btn2 () {
      console.log('删除')
    },
    btn3 () {
      console.log('分配角色')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  margin-bottom: 15px;
}
.div {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}
.ssbtn {
  background-color: #f5f7fa;
  margin-right: 10px;
}
.el-row {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 20px;
}
/deep/ .tianjia{
  width: 98px !important;
  height: 40px !important;
}
/deep/ .el-button {
  width: 44px;
  height: 28px;
  padding: 0;
  text-align: center;
  border: none;
}
/deep/ .el-icon-edit {
  font-size: 12px;
}

.btn-bg1 {
  background-color: #409eff;
}
.btn-bg2 {
  background-color: #f56c6c;
}
.btn-bg3 {
  background-color: #e6a23c;
}
</style>
