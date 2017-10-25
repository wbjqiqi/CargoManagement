import * as types from '../mutation-types'
// import Vue from 'vue'
import Logger from '../../assets/mylogger'
var log = new Logger()

const state = {
  total: 0,
  allAccounts: []
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
      log.debug('error')
    }
  }
}

// mutations
const mutations = {

  [types.GET_BOX_SERVICE_ACCOUNT] (state, data) {
    var accounts = []
    for (var i in data.accounts) {
      accounts.push(data.accounts[i])
    }
    state.total = accounts.length
    state.allAccounts = accounts
    state.allAccounts.sort(by('name'))
  },
  [types.NEW_BOX_SERVICE_ACCOUNT] (state, account) {
    state.allAccounts.push(account)
  }
}

export default {
  state,
  mutations
}
