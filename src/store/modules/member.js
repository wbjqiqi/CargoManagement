import * as types from '../mutation-types'
// import Vue from 'vue'
import Logger from '../../assets/mylogger'
var log = new Logger()

const state = {
  total: 0,
  items: [],
  activeItem: {}
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
        if (a.admin) {
          return -1
        }
        return a < b ? -1 : 1
      }
      return typeof a < typeof b ? -1 : 1
    } else {
      log.debug('error')
    }
  }
}

// mutations
const mutations = {
  clearMember (state) {
    state.items = []
    state.activeItem = []
  },
  [types.GET_PROJECT_MEMBERS_SUCCESS] (state, data) {
    state.items = data
    var admin = []
    var normal = []
    for (var i in data) {
      var member = data[i]
      if (member.admin) {
        admin.push(member)
      } else {
        normal.push(member)
      }
    }
    admin.sort(by('name'))
    normal.sort(by('name'))
    state.items = admin.concat(normal)
  },
  [types.GET_PROJECT_MEMBER_INFO_SUCCESS] (state, data) {
  },
  [types.SAVE_PROJECT_MEMBER_SUCCESS] (state, item) {
  },
  [types.AUTH_PROJECT_MEMBER_ADMIN] (state, item) {
  },
  [types.DEL_PROJECT_MEMBER] (state, item) {
  },
  [types.DEL_PROJECT_MEMBER_ADMIN] (state, item) {
  }
}

export default {
  state,
  mutations
}
