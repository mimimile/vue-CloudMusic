import axios from 'axios'
import { Toast } from 'mint-ui'

// create an axios instance
const service = axios.create({
  baseURL: '/v1', // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response.data,
  error => {
    console.log('err' + error)// for debug
    Toast('网络错误')
    return Promise.reject(error)
  })

export default service
