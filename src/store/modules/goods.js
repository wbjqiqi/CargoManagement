/**
 * Created by Administrator on 2017/8/28 0028.
 */
import * as types from '../mutation-types'

const state = {
  goods: [],
  goodsNameList: []
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
  }
}
export default {
  state,
  mutations
}
