
const state = {
  onUploads: 0,
  files: []
}
// mutations
const mutations = {
  clearUploads (state) {
    state.files = []
    state.onUploads = 0
  },
  addFile (state, file) {
    state.files.push(file)
    state.onUploads = state.onUploads + 1
  },
  removeOnUploadFile (state, file) {
  },
  updateFile (state, {oldFile, newFile}) {
    var index = state.files.indexOf(oldFile)
    if (index === -1) {
      return
    }
    state.files.splice(index, 1, newFile)
  },
  afterFile (state, file) {
    state.onUploads = state.onUploads - 1
  },
  removeFile (state, file) {
    if (file.progress < 100) {
    }
    state.onUploads = state.onUploads - 1
    var index = state.files.indexOf(file)
    if (index !== -1) {
      state.files.splice(index, 1)
    }
  }
}

export default {
  state,
  mutations
}
