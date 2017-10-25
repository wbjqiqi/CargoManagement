import * as types from '../mutation-types'

const state = {
  // 所有的评论
  comments: [],
  // fileter中当前选项信息
  fileters: {
    version: '全部版本',
    commenter: '所有创建者',
    commentStatus: '打开'
  },
  // 当前激活的板块，relation or comment
  active: 'none',
  // 当前查看的视图id
  cmtActiveId: '',
  // 是否删除，应该属于文件
  star: false,
  // comment板块默认不加载，第一次查看时加载
  showComponent: false,
  // comment板块加载的时候显示加载中动画
  commentFetching: true,
  // 更改过滤的时候commentBody加载动画
  commentBodyFetching: false
}

function findCommentIndex (commentId) {
  return state.comments.findIndex((ele) => ele.id === commentId)
}
function findResponseIndex (responseId, resArray) {
  return resArray.findIndex((ele) => ele.id === responseId)
}

const mutations = {
  // 数据请求完成，可以加载页面上的组件
  [types.LOAD_COMMIT_COMPONENTS] (state) {
    state.showComponent = true
  },
  [types.CHANGE_ACTIVE] (state, item) {
    state.active = state.active === item ? 'none' : item
  },
  [types.SHIFT_STAR] (state) {
    state.star = !state.star
  },
  [types.LOAD_COMMIT_FETCHING] (state) {
    state.commentFetching = true
  },
  [types.LOAD_COMMENT_FILTERS] (state) {
    state.comments = []
    state.commentBodyFetching = true
  },
  [types.ACTIVE_COMMENT] (state, [id, ifCamera]) {
    state.cmtActiveId = !ifCamera ? 'none' : state.cmtActiveId === id ? 'none' : id
  },
  [types.SHIFT_COMMENT_STATUS] (state, options) {
    let index = findCommentIndex(options.commentId)
    state.comments[index].commentOpen = options.commentStatus
  },
  [types.GET_COMMENTS] (state, comments) {
    state.comments = comments
    state.commentFetching = false
    state.commentBodyFetching = false
  },
  [types.ADD_COMMENT] (state, comment) {
    state.comments.push(comment)
    state.commentFetching = false
  },
  [types.DELETE_COMMENT] (state, options) {
    let index = findCommentIndex(options.commentId)
    state.comments.splice(index, 1)
  },
  // 批注评论相关
  [types.ADD_RESPONSE] (state, [options, response]) {
    let index = findCommentIndex(options.commentId)
    state.comments[index].responses.push(response)
    state.commentFetching = false
  },
  [types.DELETE_RESPONSE] (state, options) {
    let index = findCommentIndex(options.commentId)
    let resIndex = findResponseIndex(options.responseId, state.comments[index].responses)
    state.comments[index].responses.splice(resIndex, 1)
  }
}

export default {
  state,
  mutations
}
