<template>
  <div class="div">
    <img src="@/assets/404.gif" alt="" style="width: 100%; height: 100%" />
    <div class="div_p">生活不易，我也叹气，要不刷新一下再继续？</div>
  </div>
</template>

<script>
export default {
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

<style scoped lang='less'>
.div {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.div_p{
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
  font-size: 30px;
  color: rgb(195, 8, 8);
  margin: 0 auto;
  font-family: '华文彩云';
}
</style>
