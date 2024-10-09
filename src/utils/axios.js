const axios = require('axios')

const token = 'aSuperSecretKey'

const onRequest = config => {
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
}

const onRequestError = error => {
  return Promise.reject(error)
}

const onResponse = response => {
  return response
}

const onResponseError = error => {
  return Promise.reject(error)
}

const axiosInstance = axios.create({
  baseURL: 'https://echo-serv.tbxnet.com/v1'
})

axiosInstance.interceptors.request.use(onRequest, onRequestError)
axiosInstance.interceptors.response.use(onResponse, onResponseError)

module.exports = axiosInstance
