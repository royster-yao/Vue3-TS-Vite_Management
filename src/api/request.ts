import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
    baseURL:"http://120.24.64.5:8088/mall-admin",
    timeout:15000
})

// 请求拦截器
instance.interceptors.request.use(config => {
    let token = Cookies.get("token")
    if (token) {
        config.headers = config.headers || {}
        config.headers["Authorization"] = token
    }
    return config
},err => {
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(result => {
    return result.data
},err => {
    return Promise.reject(err)
})

export default instance