// ajax 请求函数模块
// 返回值是一个promise对象, response.data
// 异步返回的数据是 response.data，不是response
// axios拿到的是response数据，而axios+promise拿到的是response.data的数据

import axios from 'axios'
export default function ajax (url, data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步的 ajax 请求
    let promise
    // 判读请求类型为get
    if (type === 'GET') {
    // 准备拼接的字符串，进行遍历，拼接到url中
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
    // 判断请求类型为post
    // 发送post请求
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
    // 成功了调用resolve()
      resolve(response.data)
    }).catch(function (error) {
    // 失败了调用reject()
      reject(error)
    })
  })
}
