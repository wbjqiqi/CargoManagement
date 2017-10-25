import * as types from '../mutation-types'

const detailInitialization = ({commit}) => {
  commit(types.DETAIL_INITIALIZATION)
}

const getMainifyFolders = ({commit}, allFolder) => {
  commit(types.GET_MINIFY_FOLDERS, allFolder)
}

const showError = ({commit}, text) => {
  commit(types.SHOW_ERROR_AND_TEXT, text)
}

export {
  detailInitialization,
  showError,
  getMainifyFolders
}
