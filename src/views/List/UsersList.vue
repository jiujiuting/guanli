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
        <el-button class="ssbtn" @click="searchFn">
          <span class="el-icon-search"></span>
        </el-button>
        <el-button
          type="primary"
          class="tianjia"
          @click="centerDialogVisible = true"
          >添加用户</el-button
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" stripe border>
        <el-table-column prop="a" label="#" width="50px" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="btn(scope.row.id, scope.row.mg_state)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" class="button">
          <template v-slot="scope">
            <!-- 编辑 -->
            <el-button
              class="btn-bg1"
              type="primary"
              icon="el-icon-edit"
              @click="editData(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              class="btn-bg2"
              type="primary"
              icon="el-icon-delete"
              @click="open(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-button
              class="btn-bg3"
              type="primary"
              icon="el-icon-share"
              @click="
                assignRoles(
                  scope.row.username,
                  scope.row.role_name,
                  scope.row.id
                )
              "
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
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
    <!-- 添加用户功能 -->
    <el-dialog
      class="dv-title"
      title="添加用户对话框"
      :visible.sync="centerDialogVisible"
      width="50%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑功能 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      class="dv-title"
    >
      <el-form ref="editor" :model="compile" :rules="rules" label-width="80px">
        <el-form-item label="用户名称">
          <el-input
            v-model="compile.name"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="compile.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="compile.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editingFeatures">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色功能 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible" class="dv-title">
      <el-form :model="role">
        <p>当前的用户:{{ role.username }}</p>
        <p>当前的角色:{{ role.role_name }}</p>
        <el-form-item label="分配新角色">
          <el-select v-model="role.roleNames" placeholder="请选择">
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validateMobile, validateEMail } from '@/utils/validate' // 自定义规则
import { usersApi, addUser, editData, editingFeatures, deleteApi, roleListApi, roleDetermine } from '@/api/home' // 请求
export default {
  created () {
    this.usersApi()
  },
  data () {
    // 自定义校验规则
    const validateMobileFn = (rule, value, callback) => {
      if (validateMobile(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    const validateEMailFn = (rule, value, callback) => {
      if (validateEMail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
      }
    }
    return {
      currentPage4: 1, // 默认页码
      input: '', // 搜索数据
      query: null, // 查询参数
      pagenum: 1, // 页码
      pagesize: 5, // 每页显示条数
      userList: [], // 数据列表
      total: null, // 总条数
      centerDialogVisible: false, // 添加用户对话框
      dialogFormVisible: false, // 编辑功能对话框
      dialogVisible: false, // 分配角色对话框
      form: { //! 添加用户数据
        username: null,
        password: null,
        email: null,
        mobile: null
      },
      compile: { //! 编辑功能数据
        name: null,
        email: null,
        mobile: null,
        id: null,
        rid: null
      },
      state: { //! 更新状态数据
        uld: null,
        type: null
      },
      rules: { //! 校验规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2~7位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2~7位之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEMailFn, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobileFn, trigger: 'blur' }
        ]
      },
      role: { //! 分配角色数据
        username: null,
        role_name: null,
        roleNames: null, // 分配角色id
        id: null // 角色id
      },
      roleList: null // 角色列表数据
    }
  },
  methods: {
    //! 获取数据列表
    async usersApi () {
      try {
        const res = await usersApi({ query: this.query, pagenum: this.pagenum, pagesize: this.pagesize })
        this.userList = res.data.data.users
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 根据显示条数获取数据列表
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.usersApi()
    },
    // 根据页码获取数据列表
    handleCurrentChange (val) {
      this.pagenum = val
      this.usersApi()
    },
    // 根据搜索参数获取数据列表
    searchFn () {
      this.query = this.input
      this.usersApi()
    },
    //! 添加用户---发送请求 + 二次校验
    async addUser () {
      this.centerDialogVisible = false
      try {
        await this.$refs.form.validate()
        // 发送请求-vuex
        try {
          const res = await addUser(this.form)
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success('添加成功')
            this.usersApi() // 重新获取数据列表
          } else {
            this.$message.error('添加失败：' + res.data.meta.msg)
          }
        } catch (err) {
          console.log(err)
        }
        this.form = {}
      } catch (err) {
        this.$message.error('无效添加，数据验证失败')
      }
    },
    //! 更新角色状态
    async btn (id, type) {
      this.state.uld = id
      this.state.type = type
      try { // 向vuex 发送请求
        await this.$store.dispatch('user/changeThe', this.state)
        this.$message.success('更新用户状态成功')
      } catch (err) {
        this.$message.error('更新失败')
        console.log(err)
      }
    },
    //! 编辑功能获取用户数据
    async editData (id) {
      this.dialogFormVisible = true
      try {
        const res = await editData(id) // 获取数据
        console.log(res)
        const lists = res.data.data
        this.compile.name = lists.username
        this.compile.email = lists.email
        this.compile.mobile = lists.mobile
        this.compile.id = lists.id
      } catch (err) {
        console.log(err)
      }
    },
    //! 编辑功能--发送请求 + 二次校验
    async editingFeatures () {
      this.dialogFormVisible = false
      try {
        await this.$refs.editor.validate()
        try {
          const res = await editingFeatures(this.compile)
          console.log(res)
          this.$message.success('修改成功')
          this.usersApi()
        } catch (err) {
          this.$message.error('修改失败')
          console.log(err)
        }
      } catch (err) {
        this.dialogFormVisible = true
        this.$message.error('编辑失败，请检查数据')
        console.log(err)
      }
    },
    //! 删除功能
    open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await deleteApi(id)
          if (res.data.meta.status === 400) {
            throw Error(res.data.meta.msg)
          }
          this.$message.success('删除成功')
          this.usersApi()
        } catch (err) {
          this.$message.error(err.message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //! 分配角色数据
    async assignRoles (name, role, id) {
      this.dialogVisible = true
      this.role.username = name
      this.role.role_name = role
      this.role.id = id
      try {
        const res = await roleListApi()
        console.log(res)
        this.roleList = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    //! 确定分配角色
    async dialogVisibleFn () {
      this.dialogVisible = false
      try {
        const res = await roleDetermine(this.role.id, this.role.roleNames)
        console.log(res)
        if (res.data.meta.status === 400) {
          this.$message.error(res.data.meta.msg)
        }
        this.$message.success('设置成功')
      } catch (err) {
        console.log(err)
        this.$message.error('无效操作')
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
  width: 56px !important;
  height: 39px !important;
}
.el-row {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 20px;
}
:deep(.tianjia) {
  width: 98px !important;
  height: 40px !important;
}
:deep(.el-button) {
  width: 44px;
  height: 28px;
  padding: 0;
  text-align: center;
  border: none;
}
:deep(.el-icon-edit) {
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
// 对话框的样式
.dv-title {
  .el-button {
    width: 73px;
    height: 40px;
  }
}
</style>
