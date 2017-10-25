import * as types from '../mutation-types'

const state = {
  // 整个mainify信息
  mainify: '',
  // 是否显示错误框
  errorText: false,
  // 错误提示内容
  errorContent: '',
  // 是否是支持的类型
  ifSupportType: false,
  // 文件状态是否处于加载状态
  jobLoading: false,
  // 文件状态加载的时候提示的信息
  jobText: '',
  // 文件状态获取成功，文件列表是否处于加载状态
  folderLoading: false,
  // 控制定时器
  timer: false,
  // 所有的文件夹（所有的tab标签）
  allFolder: []
}

const mutations = {
  [types.DETAIL_INITIALIZATION] (state) {
    state.errorText = false
    state.errorContent = ''
    state.ifSupportType = false
    state.allFolder = []
    state.mainifyDocument = {}
    state.jobLoading = false
    state.jobText = ''
    state.folderLoading = false
    // 控制定时器
    state.timer = true
    state.allFolder = []
  },
  [types.GET_MINIFY_FOLDERS] (state, allFolder) {
    allFolder.map((item) => { item.complate = false })
    state.allFolder = allFolder
  },
  [types.SHOW_ERROR_AND_TEXT] (state, text) {
    state.errorText = true
    state.errorContent = text
  }
}

export default{
  state,
  mutations
}
