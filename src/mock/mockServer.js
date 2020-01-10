// 使用mock.js提供mock数据接口，生成随机数据，拦截ajax请求
import Mock from 'mockjs'
import data from './data.json'

// 返回goods接口
Mock.mock('/goods', {code: 0, data: data.goods})
// 返回info接口
Mock.mock('/info', {code: 0, data: data.info})
// 返回ratings接口
Mock.mock('/ratings', {code: 0, data: data.ratings})

// mock.js是不需要向外暴露任何的数据，只需要保证能够执行就可以
