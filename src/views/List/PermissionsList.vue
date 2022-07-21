<template>
  <div>
    <BreadCrumbs two="权限管理" three="权限列表"></BreadCrumbs>
    <div class="div">
      <el-table :data="list" style="width: 100%" border stripe>
        <el-table-column prop="id" label="#" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-if="scope.row.level === '1'"
              >等级二</el-tag
            >
            <el-tag type="warning" v-if="scope.row.level === '2'"
              >等级三</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { permissionsList } from '@/api/permissions'
export default {
  created () {
    this.permissionsList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 获取权限列表
    async permissionsList () {
      try {
        const res = await permissionsList('list')
        this.list = res.data.data
      } catch (err) {
        console.log(err)
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
.div {
  background-color: #fff;
  padding: 20px;
  padding-top: 10px;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
