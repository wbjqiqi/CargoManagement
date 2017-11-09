/**
 * Created by Administrator on 2017/8/28 0028.
 */
import * as types from '../mutation-types'

const state = {
  goods: [],
  goodsNameList: [],
  isOpenDialog: false,
  goodsBrandTypes: []
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
  },
  [types.GET_TYPES] (state, allTypes) {
    let allBrands = []
    allTypes.map(type => {
      let brand = {
        value: type.name,
        text: type.name
      }
      allBrands.push(brand)
    })
    state.goodsBrandTypes = allBrands
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
  [types.ADD_BRAND_TYPE] (state, name) {
    let brand = {
      value: name,
      text: name
    }
    state.goodsBrandTypes.push(brand)
  }
}
export default {
  state,
  mutations
}
