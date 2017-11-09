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

export const getAllGoodsType = ({commit}) => {
  return new Promise((resolve, reject) => {
    api.getAllGoodsType().then((res) => {
      commit(types.GET_TYPES, res.data)
      resolve()
    })
  })
}

export const searchByName = ({commit}, name) => {
  return new Promise((resolve, reject) => {
    api.searchByName(name).then((res) => {
      commit(types.GET_GOODS_LIST, res.data)
      resolve(res.data)
    })
  })
}

export const searchByAllName = ({commit}, name) => {
  return new Promise((resolve, reject) => {
    api.searchByAllName(name).then((res) => {
      commit(types.GET_GOODS, res.data)
      resolve(res.data)
    })
  })
}

export const searchByKeycode = ({commit}, name) => {
  return new Promise((resolve, reject) => {
    api.searchByKeycode(name).then((res) => {
      commit(types.GET_GOODS_LIST, res.data)
      resolve(res.data)
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

export const newCargo = ({commit}, options) => {
  return new Promise((resolve, reject) => {
    api.newCargo(options).then((res) => {
      resolve(res.data)
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

export const deleteCargo = ({commit}, id) => {
  return new Promise((resolve, reject) => {
    api.deleteCargo(id).then((res) => {
      commit(types.DELETE_GOODS, id)
      resolve()
    })
  })
}

export const newBrandType = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    api.newBrandType(data).then((res) => {
      let brand = {}
      Object.assign(brand, data, res.data)
      commit(types.ADD_BRAND_TYPE, brand)
      resolve()
    })
  })
}

export const deleteBrandType = ({commit}, id) => {
  return new Promise((resolve, reject) => {
    api.deleteBrandType(id).then((res) => {
      commit(types.DELETE_BRAND_TYPE, id)
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
