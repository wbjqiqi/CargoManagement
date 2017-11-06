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

export const searchById = ({commit}, id) => {
  return new Promise((resolve, reject) => {
    api.searchById(id).then((res) => {
      commit(types.GET_GOODS, res.data)
    })
  })
}

export const updateCargo = ({commit}, options) => {
  return new Promise((resolve, reject) => {
    api.updateCargo(options).then((res) => {
      commit(types.UPDATE_GOODS, options)
      resolve()
    })
  })
}

export const closeDialog = ({commit}) => {
  commit(types.CLOSE_DIALOG)
}

export const openDialog = ({commit}) => {
  commit(types.OPEN_DIALOG)
}
