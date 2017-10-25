import * as types from '../mutation-types'
// import Vue from 'vue'

const state = {
  total: 0,
  selected: new Set(),
  folders: [],
  files: [],
  activeItem: {}
}

var by = function (name) {
  return function (o, p) {
    var a, b
    if (typeof o === "object" && typeof p === "object" && o && p) {
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
      throw ("error")
    }
  }
}

// mutations
const mutations = {
  clearRecycle (state) {
    state.files = []
    state.folders = []
  },
  [types.GET_PROJECT_RECYCLE_SUCCESS] (state, data) {
    for (var i in data.folders) {
      data.folders[i].type = 'folder'
      data.folders[i].checked = false
    }
    for (var i in data.files) {
      data.files[i].type = 'file'
      data.files[i].checked = false
    }
    state.folders = data.folders
    state.files = data.files

    if (state.folders)
      state.folders.sort(by("name"))
    if (state.files)
      state.files.sort(by("name"))
    state.total = data.count

  },
  [types.GET_PROJECT_SHARE_SUCCESS] (state, data) {

    for (var i in data.folders) {
      data.folders[i].type = 'folder'
      data.folders[i].checked = false
    }
    for (var i in data.files) {
      data.files[i].type = 'file'
      data.files[i].checked = false
    }
    state.folders = data.folders
    state.files = data.files

    if (state.folders)
      state.folders.sort(by("name"))
    if (state.files)
      state.files.sort(by("name"))
    state.total = data.count

  },
  [types.RESTORE_PROJECT_RECYCLE_SUCCESS] (state, item){

    if (item.type === 'folder') {
      state.folders.splice(state.folders.findIndex(function (ele, index, array) {
        return ele.id === item.id
      }), 1)
    }
    if (item.type === 'file') {
      state.files.splice(state.files.findIndex(function (ele, index, array) {
        return ele.id === item.id
      }), 1)
    }
  },

  [types.CHECK_ALL_PROJECT_RECYCLE_SUCCESS] (state, checked){
    for (var i in state.folders) {
      if (checked) {
        state.folders[i].checked = true
      } else {
        state.folders[i].checked = false
      }
    }
    for (var i in state.files) {
      if (checked) {
        state.files[i].checked = true
      } else {
        state.files[i].checked = false
      }
    }
  },
  [types.DEL_BATCH_PROJECT_RECYCLE_SUCCESS] (state, items){
  },
  [types.ADD_PROJECT_ITEMTO_RECYCLE_SUCCESS] (state, item){
    if (item.type === 'folder') {
      item.checked = false
      state.folders.push(item)
    }
    if (item.type === 'file') {
      item.checked = false
      state.files.push(item)
    }
  }
}

export default {
  state,
  mutations
}
