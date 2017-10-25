import * as types from '../mutation-types'
// import Vue from 'vue'
import Logger from '../../assets/mylogger'
var log = new Logger()

const state = {
  total: 0,
  items: [],
  delItems: [],
  activeItem: {name: '', id: ''}
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
  clearProject (state) {
    state.items = []
    state.delItems = []
    state.activeItem = []
  },

  [types.GET_USER_PROJECTS_SUCCESS] (state, data) {
    var active = []
    var del = []
    for (var i in data.projects) {
      if (data.projects[i].active) {
        active.push(data.projects[i])
      } else {
        del.push(data.projects[i])
      }
    }
    state.items = active
    state.delItems = del
    state.items.sort(by('name'))
    state.delItems.sort(by('name'))
    state.total = data.count
  },
  [types.SAVE_USER_PROJECT_SUCCESS] (state, item) {
    state.items.push(item)
    state.activeItem = item
  },
  [types.UPDATE_USER_PROJECT_SUCCESS] (state, item) {
    // item.active = false
    // state.items.splice(state.items.findIndex(function(ele,index,array){return ele.id===item.id}),1)
  },
  [types.DEL_USER_PROJECT_SUCCESS] (state, item) {
    item.active = false
    // state.items.splice(state.items.findIndex(function(ele,index,array){return ele.id===item.id}),1)
  },
  [types.ACTIVE_USER_PROJECT_SUCCESS] (state, item) {
    state.activeItem = item
  },
  [types.ACTIVE_USER_PROJECT_BY_ID_SUCCESS] (state, id) {
    state.activeItem = state.items[state.items.findIndex(function (ele, index, array) { return ele.id === id })]
  }
}

export default {
  state,
  mutations
}
