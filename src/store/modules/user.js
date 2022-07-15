import { changeThe } from '@/api/home'
const state = {}
const mutations = {}
const actions = {
  async changeThe (context, data) { // 更新用户状态
    try {
      const res = await changeThe(data)
      console.log(res)
      if (res.data.meta.status === 200) { // 判断是否成功
        console.log('更新成功')
      } else { // 返回错误信息
        return Promise.reject(new Error(res.status))
      }
    } catch (err) { // 返回错误信息
      return Promise.reject(new Error('更新失败'))
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
