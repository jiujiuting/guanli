<template>
  <div>
    <BreadCrumbs two="权限管理" three="角色列表"></BreadCrumbs>
    <div class="div">
      <el-button type="primary">添加角色</el-button>
    </div>
  </div>
</template>

<script>
import { TheRoleList } from '@/api/permissions'
export default {
  created () {
    this.TheRoleList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 获取权限列表
    async TheRoleList () {
      try {
        const res = await TheRoleList()
        console.log(res)
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
  border-radius: 5px;
  margin-top: 20px;
}
</style>
