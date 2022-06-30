import axios from 'axios'
//在开发环境中的测试 development
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://localhost:9999/'
}
//在生产环境中的测试 production
if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://wap.365msmk.com/'
}
//还有一种环境 debug


//响应超时的时间
axios.defaults.timeout = 5000;
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


//接口请求拦截
axios.interceptors.request.use(
  config => {
    config.headers = {
      DeviceType: 'H5'
    } //设置响应头部
    const token = localStorage.getItem('userToken');
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.accessToken = token;
    }
    return config
  },
  error => {
    return Promise.reject(error);
  })

// 响应拦截器
axios.interceptors.response.use(response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  })

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {

      params: params
    }).then(res => {

      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export default axios
