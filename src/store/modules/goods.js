/**
 * Created by Administrator on 2017/8/28 0028.
 */
import * as types from '../mutation-types'

const state = {
  goods: []
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
  }
}
export default {
  state,
  mutations
}
