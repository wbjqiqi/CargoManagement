import * as api from '../api/resource.js'
import * as types from './mutation-types'

export const getAllGoods = ({commit}) => {
  return new Promise((resolve, reject) => {
    api.getAllGoods().then((res) => {
      commit(types.GET_GOODS, res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const searchByName = ({commit}, name) => {
  return new Promise((resolve, reject) => {
    api.searchByName(name).then((res) => {
      commit(types.GET_GOODS_LIST, res.data)
    })
  })
}
