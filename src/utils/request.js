import axios from 'axios'
import store from '@/store/index'
// import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // ----给请求添加请求头
  config.headers = {
    Authorization: store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  // const { meta } = response.data

  // // console.log(success)
  // if (meta.status === 200) {
  return response
  // } else {
  //   Message.error(meta.msg) // 捕获的错误信息
  //   return Promise.reject(new Error(meta.msg))
  // }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request
