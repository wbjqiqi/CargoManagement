import * as api from '../api/resource.js'
import * as types from './mutation-types'

export const getAllGoods = ({commit}) => {
  return new Promise((resolve, reject) => {
    api.getAllGoods().then((res) => {
      commit(types.GET_GOODS, res.data)
      console.log(res)
    }).catch((error) => {
      reject(error)
    })
  })
}
