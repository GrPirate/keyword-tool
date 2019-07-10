import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
const service = axios.create({
  // 设置超时时间
  timeout: 60000,
  baseURL: process.env.BASE_URL
})
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认设置
// 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 请求拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
  const responseCode = response.status
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, err => {
  // 断网 或者请求超时状态
  if (!err.response) {
    // 请求超时状态
    if (err.message.includes('timeout')) {
      console.log('超时了')
      Message.error('请求超时，请检查网络是否链接正常')
    } else {
      // 可以展示断网组件
      console.log('断网了')
      Message.error('请求失败，请检查网络是否已连接')
    }
    return
  }

  // 服务器返回不是2开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  const responseCode = err.response.status
  switch (responseCode) {
    // 401: 未登录
    case 401:
      // 跳转登录页
      router.replace({
        path: './login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
    // 403: token过期
    case 403:
      // 弹出错误信息
      Message({
        type: 'error',
        message: '登录信息过期，请重新登录'
      })
      // 清除token
      localStorage.removeItem('token')
      // 跳转登录页面，并将要浏览的页面fullpath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: './login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    // 其他错误，直接抛出错误提示
    default:
      Message({
        message: err.response.data.message,
        type: 'error'
      })
  }
  return Promise.reject(err)
})

export default service

export const uploadFile = formData => {
  const res = service.request({
    method: 'post',
    url: '/upload',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return res
}
