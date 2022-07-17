<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{two}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{three}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    two: {
      type: String,
      required: true
    },
    three: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
