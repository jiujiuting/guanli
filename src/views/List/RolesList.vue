<template>
  <div>
    <BreadCrumbs two="权限管理" three="角色列表"></BreadCrumbs>
    <el-card class="div">
      <el-button class="div-btn" type="primary">添加角色</el-button>
      <el-table style="width: 100%" border :data="roleList" stripe>
        <el-table-column label="#" width="50px" type="expand">
          <template slot-scope="props">
            <el-row
              v-for="item in props.row.children"
              :key="item.id"
              class="row1"
            >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <el-tag>{{ item.authName }}</el-tag>
                </div></el-col
              >
              <el-col :span="16"
                ><div class="grid-content bg-purple-light">
                  <el-row
                    v-for="item1 in item.children"
                    :key="item1.id"
                    class="row2"
                  >
                    <el-col :span="8"
                      ><div class="grid-content bg-purple">
                        <el-tag type="success">{{ item1.authName }}</el-tag>
                      </div></el-col
                    >
                    <el-col :span="16"
                      ><div class="grid-content bg-purple-light">
                        <el-row
                          v-for="item2 in item1.children"
                          :key="item2.id"
                          class="row3"
                        >
                          <span class="grid-content bg-purple">
                            <el-tag
                              closable
                              @close="btn(props.row.id, item2.id)"
                            >
                              {{ item2.authName }}
                            </el-tag>
                          </span>
                        </el-row>
                      </div></el-col
                    >
                  </el-row>
                </div></el-col
              >
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" width="50px" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-share"
              @click="permissions(scope.row.id)"
              >分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="AssignPermissions" width="50%">
      <!-- 自定义标签节点--默认展开--节点可选择 -->
      <el-tree
        v-if="AssignPermissions"
        ref="myTree"
        :data="permissionslist"
        :props="{ label: 'authName' }"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultList"
      ></el-tree>
      <!-- v-if="AssignPermissions" 防止节点选中的缓存影响下一个对话框--props--指定节点--node-key="id"--唯一值---:default-checked-keys="defaultList"--默认选中节点key值的数组
         -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="AssignPermissions = false">取 消</el-button>
        <el-button type="primary" @click="permissionsFn(permissionslist.id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { TheRoleList, permissionsList, AssignPermissions, delPermissions } from '@/api/permissions'
export default {
  created () {
    this.TheRoleList()
  },
  data () {
    return {
      roleList: [], // 角色列表
      AssignPermissions: false, // 分配权限对话框
      permissionslist: [], // 全部权限列表
      list: [], // 当前的角色信息
      defaultList: [], // 当前默认权限
      id: null, // 当前的id
      defaultKey: null // 分配权限的key值
    }
  },
  methods: {
    // 获取角色列表
    async TheRoleList () {
      try {
        const res = await TheRoleList()
        this.roleList = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    //! 分配权限
    async permissions (id) {
      this.id = id
      this.AssignPermissions = true
      const res = await permissionsList('tree') // 获取全部权限
      this.permissionslist = res.data.data // 获取全部权限列表
      this.defaultList = [] // 默认选中的节点数组--每次定义前先清空
      this.list = this.roleList.filter(item => item.id === id) // 获取当前选中的角色的信息
      this.list[0].children.forEach(item1 => { // 第一级
        item1.children.forEach(item2 => { // 第二级
          item2.children.forEach(val => { // 第三级
            this.defaultList.push(val.id) // 添加被选中节点的id
          })
        })
      })
    },
    // 分配权限确认
    async permissionsFn () {
      this.AssignPermissions = false
      console.log(this.id)
      const k1 = this.$refs.myTree.getCheckedKeys() // 被选中节点的key
      const k2 = this.$refs.myTree.getHalfCheckedKeys() // 半选中节点的key
      k1.push(...k2) // 数组拼接
      const s = k1.toString() // 数组转字符串
      await AssignPermissions(this.id, s) // 分配权限请求
      this.TheRoleList() // 重新获取数据列表
    },
    // 删除单个权限
    async btn (id, id1) {
      console.log(id, id1)
      const res = await delPermissions(id, id1)
      console.log(res)
      this.TheRoleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.div {
  border-radius: 5px;
  margin-top: 20px;
  .div-btn {
    margin-bottom: 20px;
  }
}
.row1 {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  margin: 0 20px;
  &:first-child {
    border-top: 1px solid #ccc;
  }
}
.row2 {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  &:last-child {
    border: none;
  }
}
.row3 {
  display: inline-block;
  padding: 5px;
}
</style>
