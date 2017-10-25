import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  user: {
    username: localStorage.user ? JSON.parse(localStorage.user).username : '',
    authorised: !!localStorage.token,
    info: localStorage.user != null ? JSON.parse(localStorage.user).info : {headPic: '../../assets/img/user.jpg'},
    token: localStorage.token != null ? localStorage.token : ''
  }
}
// mutations
const mutations = {
  [types.SIGN_IN_SUCCESS] (state, {res, username}) {
    state.user.token = res.data.access_token
    state.user.authorised = true
    state.user.username = username
    state.user.token = 'token'
    state.user.info = {headPic: '../../assets/img/user.jpg'}

    localStorage.token = res.data.access_token
    localStorage.user = JSON.stringify(state.user)

    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.token
  },
  [types.REFRESH_TOKEN_SUCCESS] (state, {res, username}) {
    state.user.token = res.data.access_token
    state.user.authorised = true
    localStorage.token = res.data.access_token
    localStorage.user = JSON.stringify(state.user)

    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.token

    state.user.authorised = true
    state.user.token = 'token'
  },
  [types.SIGN_OUT_SUCCESS] (state, item) {
    state.user.authorised = false
    state.user.token = ''
    state.user.info = {}
    delete localStorage.token
    delete localStorage.user
  },

  [types.REG_SUCCESS] (state, item) {
  },

  [types.GET_USER_INFO_SUCCESS] (state, user) {
    state.user.info = user
    localStorage.user = JSON.stringify(state.user)
  }
}

export default {
  state,
  mutations
}
