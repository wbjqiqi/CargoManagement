import * as types from '../mutation-types'
const state = {
  user: [
    {name: '项目', path: 'BIMBOX_CONTEXT_PATH/project', icon: 'fa fa-pencil'},
    {name: '文件', path: 'BIMBOX_CONTEXT_PATH/files', icon: 'fa fa-star'},
    {name: 'BIM模型', path: 'BIMBOX_CONTEXT_PATH/bimmodel', icon: 'fa'},
    {name: '项目任务', path: 'BIMBOX_CONTEXT_PATH/task', icon: 'fa'},
    {name: '成员', path: 'BIMBOX_CONTEXT_PATH/member', icon: 'fa fa-group'}
    // { name: '设置', path: '/user/setting', icon: 'fa fa-setting' }
  ],
  index: [
    {name: '文件', path: 'user-files', icon: 'fa fa-star'},
    {name: 'BIM模型', path: 'bimmodel', icon: 'fa'},
    {name: '项目任务', path: 'task', icon: 'fa'},
    {name: '成员', path: 'member', icon: 'fa fa-group'}
    /*
    {name: '首页', path: '/', icon: 'fa fa-pencil'},
     {name: '功能', path: '/feature', icon: 'fa fa-star'},
     {name: '服务', path: '/service', icon: 'fa fa-group'},
     {name: 'BIMBox', path: '/bimbox', icon: 'fa fa-setting'},
     {name: '联系我们', path: '/contact', icon: 'fa fa-setting'}
     */
  ]
}

// mutations
const mutations = {
  [types.GET_SIDERBAR] (state, path) {
    if (path) {
      var item = state.items.find(function (element, index, array) {
        return element.path === path
      })
      if (item) {
        state.activeItem = item
      }
    }
  },
  [types.SET_SIDERBAR_ACTIVE_ITEM] (state, item) {
    state.activeItem = item
  }
}

export default {
  state,
  mutations
}
