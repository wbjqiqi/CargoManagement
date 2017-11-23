/**
 * Created by Administrator on 2017/8/28 0028.
 */
import * as types from '../mutation-types'
import StorageUpload from '../../common/storage-upload'

const state = {
  goods: [],
  goodsNameList: [],
  isOpenDialog: false,
  goodsBrandTypes: []
}

var by = function (name) {
  return function (o, p) {
    var a, b
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name]
      b = p[name]
      if (a === b) {
        return 0
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      // log.debug('error')
    }
  }
}
const mutations = {
  // clearMachines () {
  //   state.machines = []
  // },
  // [types.GET_GOODS] (state, res) {
  //   if (res.res.body.msg !== 'success') {
  //     return false
  //   }
  //   localStorage.username = res.res.body.username
  // },
  [types.GET_GOODS] (state, allGoods) {
    state.goods = allGoods
    let storageUpload = new StorageUpload()
    allGoods.map((item, index) => {
      storageUpload.getStorage('cargo_management_cargo_img', item.id).then((res) => {
        console.log(res)
        if (res.imageData) {
          let buffer = new Buffer(res.imageData[0].data)
        }
        // state.goods[index].imageData = res.data
      })
    })
  },
  [types.GET_TYPES] (state, allTypes) {
    let allBrands = []
    allTypes.map(type => {
      let brand = {
        id: type.id,
        value: type.name,
        text: type.name
      }
      allBrands.push(brand)
    })
    state.goodsBrandTypes = allBrands
    state.goodsBrandTypes.sort(by('text'))
  },
  [types.UPDATE_GOODS] (state, goods) {
    Object.assign(state.goods[0], goods)
  },
  [types.GET_GOODS_LIST] (state, goodsListRes) {
    let goodList = []
    goodsListRes.map(goods => {
      goodList.push({
        id: goods.id,
        value: goods.name,
        searchCount: goods.searchCount
      })
    })
    state.goodsNameList = goodList.sort((a, b) => b.searchCount - a.searchCount)
  },
  [types.OPEN_DIALOG] (state) {
    state.isOpenDialog = true
  },
  [types.CLOSE_DIALOG] (state) {
    state.isOpenDialog = false
  },
  [types.DELETE_GOODS] (state, id) {
    state.goods.splice(state.goods.findIndex((i) => i.id === id), 1)
  },
  [types.DELETE_BRAND_TYPE] (state, id) {
    state.goodsBrandTypes.splice(state.goodsBrandTypes.findIndex((i) => i.id === id), 1)
  },
  [types.ADD_BRAND_TYPE] (state, type) {
    let brand = {
      id: type.id,
      value: type.name,
      text: type.name
    }
    state.goodsBrandTypes.push(brand)
    state.goodsBrandTypes.sort(by('text'))
  }
}
export default {
  state,
  mutations
}
