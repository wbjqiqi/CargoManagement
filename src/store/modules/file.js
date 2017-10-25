import * as types from '../mutation-types'
// import Vue from 'vue'
import Logger from '../../assets/mylogger'
var log = new Logger()

const state = {
  fileType: {},
  isFilesListFetching: false,
  isFilesListMoreFetching: false,
  isFolderGetChildrenFetching: false,
  singleSel: {},
  pageNumber: 1,
  pageSize: 200,
  hasNext: false,
  files: [],
  folders: [],
  tree: [{
    id: '@root',
    name: '根目录',
    files: [],
    folders: [],
    children: [],
    hasCacheChildren: false,
    path: [{id: '@root', name: '根目录'}]
  }],
  activeFolder: {},
  activeFile: {active_version: {size: ''}},
  nodeCache: false
}
state.activeFolder = state.tree[0]

function searchTree (element, id) {
  if (element.id === id) {
    return element
  } else if (element.children != null) {
    var i
    var result = null
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], id)
    }
    return result
  }
  return null
}

function updatePathName (element, newEl) {
  var i
  var pathArr = element.path

  for (var j in pathArr) {
    var path = pathArr[j]
    if (path.id === newEl.id) {
      path.name = newEl.name
    }
  }
  for (i = 0; i < element.children.length; i++) {
    if (element.children && element.children.length > 0) {
      updatePathName(element.children[i], newEl)
    }
  }
}

function clone (obj) {
  var o
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null
    } else {
      if (obj instanceof Array) {
        o = []
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]))
        }
      } else {
        o = {}
        for (var j in obj) {
          o[j] = clone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
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
  clearFile (state) {
    state.tree = [{
      id: '@root',
      name: '根目录',
      files: [],
      folders: [],
      children: [],
      hasCacheChildren: false,
      path: [{id: '@root', name: '根目录'}]
    }]
    state.files = []
    state.folders = []
    state.activeFolder = {}
  },
  [types.GET_FILE_TYPE_SUCCESS] (state, data) {
    state.fileType = data.body.converters
  },
  [types.GET_PROJECT_FILES_SUCCESS] (state, {data, node}) {
    var parentNode = searchTree(state.tree[0], node.id)

    if (!parentNode.hasCacheChildren) {
      var currentPath = parentNode.path
      for (let i in data.folders) {
        var obj = data.folders[i]
        obj.children = []
        var clonePath = currentPath.concat()
        clonePath.push({id: obj.id, name: obj.name})
        obj.path = clonePath
        obj.type = 'folder'
        obj['checked'] = false
        // parentNode.children.push(obj)
      }
      for (let i in data.files) {
        data.files[i].type = 'file'
        obj['checked'] = false
      }
      var objClone = parentNode.children.concat()
      state.folders = objClone
      state.files = data.files
      parentNode.hasCacheChildren = true
    } else {
      for (let i in data.folders) {
        data.folders[i].type = 'folder'
        data.folders[i]['checked'] = false
      }
      for (let i in data.files) {
        data.files[i].type = 'file'
        data.files[i]['checked'] = false
      }
      state.folders = data.folders
      state.files = data.files
    }
    state.hasNext = data.hasNext
    state.activeFolder = parentNode
    state.singleSel = clone(parentNode)
    state.isFilesListFetching = false
    state.folders.sort(by('name'))
    state.files.sort(by('name'))
    state.pageNumber = 1
  },
  [types.GET_PROJECT_FILES_MORE_SUCCESS] (state, {data}) {
    for (let i in data.folders) {
      data.folders[i].type = 'folder'
      data.folders[i].checked = false
      state.folders.push(data.folders[i])
    }
    for (let i in data.files) {
      data.files[i].type = 'file'
      data.files[i].checked = false
      state.files.push(data.files[i])
    }
    state.isFilesListMoreFetching = false
    state.pageNumber = state.pageNumber + 1
    state.hasNext = data.hasNext
  },
  [types.GET_PROJECT_FILES_BY_ID_SUCCESS] (state, {data, id}) {
    var parentNode = searchTree(state.tree[0], id)

    for (let i in data.folders) {
      data.folders[i].type = 'folder'
      data.folders[i].checked = false
    }
    for (let i in data.files) {
      data.files[i].type = 'file'
      data.files[i].checked = false
    }
    state.folders = data.folders
    state.files = data.files
    state.hasNext = data.hasNext
    state.activeFolder = parentNode

    state.singleSel = clone(parentNode)
    state.isFilesListFetching = false
    state.folders.sort(by('name'))
    state.files.sort(by('name'))
    state.pageNumber = 1
  },
  [types.GET_PROJECT_FILES_REQUEST] (state) {
    state.isFilesListFetching = true
  },
  [types.GET_PROJECT_FILES_MORE_REQUEST] (state) {
    state.isFilesListMoreFetching = true
  },
  [types.GET_PROJECT_FOLDER_CHILDREN_REQUEST] (state) {
    state.isFolderGetChildrenFetching = true
  },
  [types.GET_PROJECT_FOLDER_CHILDREN_BYID_SUCCESS] (state, {data, id}) {
    // var parentNode = searchTree(state.tree[0], node.id)
  },
  [types.GET_PROJECT_FOLDER_CHILDREN_SUCCESS] (state, {data, node}) {
    var parentNode = searchTree(state.tree[0], node.id)
    if (!node.hasCacheChildren) {
      var currentPath = parentNode.path
      for (var i in data.folders) {
        var obj = data.folders[i]
        obj.children = []
        var clonePath = currentPath.concat()
        clonePath.push({id: obj.id, name: obj.name})
        obj.path = clonePath
        obj.type = 'folder'
        parentNode.children.push(obj)
      }
      parentNode.hasCacheChildren = true
    }
    state.isFolderGetChildrenFetching = false

    state.singleSel = clone(parentNode)
  },
  [types.SAVE_PROJECT_FOLDER_SUCCESS] (state, item) {
    var parentNode = searchTree(state.tree[0], item.parent_id)
    item.children = []
    var clonePath = parentNode.path.concat()
    clonePath.push({id: item.id, name: item.name})
    item.path = clonePath

    var itemClone = clone(item)

    parentNode.children.push(item)
    state.folders.push(itemClone)
  },
  [types.UPDATE_PROJECT_FOLDER_SUCCESS] (state, item) {
    var node = searchTree(state.tree[0], item.id)
    // var newPath = {id: item.id, name: item.name}
    updatePathName(state.tree[0], item)
    node.name = item.name
  },
  [types.UPDATE_PROJECT_FILE_SUCCESS] (state, item) {
  },
  [types.DEL_PROJECT_FOLDER_SUCCESS] (state, {data, item}) {
    var parentNode = searchTree(state.tree[0], data.parent_id)
    parentNode.children.splice(parentNode.children.findIndex(function (ele, index, array) {
      return ele.id === item.id
    }), 1)
    state.folders.splice(state.folders.findIndex(function (ele, index, array) {
      return ele.id === item.id
    }), 1)
  },
  [types.DEL_PROJECT_FILE_SUCCESS] (state, {data, item}) {
    state.files.splice(state.files.findIndex(function (ele, index, array) {
      return ele.id === item.id
    }), 1)
  },
  [types.RESTORE_PROJECT_ITEM_SUCCESS] (state, item) {
    var parentNode = searchTree(state.tree[0], item.parent_id)
    var clonePath = parentNode.path.concat()
    clonePath.push({id: item.id, name: item.name})
    item.path = clonePath

    var itemClone = clone(item)

    if (item.type === 'folder') {
      if (parentNode.hasCacheChildren) {
        parentNode.children.push(item)
        if (parentNode.id === state.activeFolder.id) {
          state.folders.push(itemClone)
        }
      }
    }
    if (item.type === 'file') {
      if (parentNode.hasCacheChildren && parentNode.id === state.activeFolder.id) {
        state.files.push(itemClone)
      }
    }
  },
  [types.ACTIVE_PROJECT_FOLDER_SUCCESS] (state, item) {
    state.activeFolder = item
  },
  [types.SET_PROJECT_FILES_INIT] (state) {
    state.tree = [{id: '@root', name: '根目录', children: [], hasCacheChildren: false, path: [{id: '@root', name: '根目录'}]}]
  },
  [types.GET_FILE_INFO_SUCCESS] (state, data) {
    let res = data.body.data
    res.versions.sort(by('version'))
    for (let i = 0; i < res.versions.length; i++) {
      var dat = res.versions[i]
      if (dat.size < 1024) {
        dat.size = Math.round(dat.size / 1024) + 'Byte'
      }
      if (dat.size > 1024 && dat.size < 1024 * 1024) {
        dat.size = Math.round(dat.size / 1024) + 'K'
      }
      if (dat.size >= 1024 * 1024) {
        dat.size = Math.round(dat.size / (1024 * 1024)) + 'M'
      }
      if (dat.version === res.current_version) {
        res.active_version = dat
      }
    }
    res.mobileTitle = (res.name.length > 15 ? res.name.substring(0, 15) + '...' : res.name) + ' (' + res.versions.length + '个版本)'
    res.pcTitle = res.name + ' (' + res.versions.length + '个版本)'
    res.title = res.name
    state.activeFile = res
  },
  [types.SEARCH_NODE_CACHE] (state, id) {
    var parentNode = searchTree(state.tree[0], id)
    state.nodeCache = (parentNode && parentNode.hasCacheChildren) ? parentNode.hasCacheChildren : false
  },
  [types.CREATE_JOB_SUCCESS] (state, item) {
    state.files.push(item)
  },
  [types.GET_JOB_SUCCESS] (state, item) {
  },
  [types.GET_FILES_MODEL] (state, item) {
  }
}

export default {
  state,
  mutations
}
