import * as types from '../mutation-types'
// import Vue from 'vue'

const state = {
  device: 'desktop'

}
// mutations
const mutations = {
  [types.SET_DEVICE_SUCCESS] (state, size) {
    if (size <= 600) {
      state.device = 'mobile'
    }
    if (size > 600 && size <= 900) {
      state.device = 'pad'
    }
    if (size > 900) {
      state.device = 'desktop'
    }
  }
}

export default {
  state,
  mutations
}
