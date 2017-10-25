import Vue from 'vue'
import VueResource from 'vue-resource'
import axios from 'axios'
import * as config from './config'
// import qs from 'qs'

Vue.use(VueResource)
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.token

// 注册和登录
// export const getOauth2Token = (options) => axios.post(config.AUTH_SERVICE_HOST + '/authentication/v1/oauth/token', qs.stringify(options), {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
export const getOauth2Token = (options) => Vue.http.post(config.AUTH_SERVICE_HOST + '/authentication/v1/oauth/token', options, {emulateJSON: true})
export const refreshOauth2Token = (options) => Vue.http.post(config.AUTH_SERVICE_HOST + '/authentication/v1/token/refresh', options, {headers: {Authorization: ''}})
export const reg = (options) => Vue.http.post(config.AUTH_SERVICE_HOST + '/authentication/v1/users', options, {headers: {Authorization: ''}})
export const getUserInfo = (options) => Vue.http.get(config.AUTH_SERVICE_HOST + '/authentication/v1/users/' + options)

// 项目相关
export const getUserProjects = (options) => Vue.http.get(config.PROJECT_SERVICE_HOST + '/projects', options)
export const saveUserProject = (options) => Vue.http.post(config.PROJECT_SERVICE_HOST + '/projects', options)
export const updateUserProject = (options) => Vue.http.put(config.PROJECT_SERVICE_HOST + '/projects/' + options.id, options)
export const delUserProject = (options) => Vue.http.delete(config.PROJECT_SERVICE_HOST + '/projects/' + options.id, options)

// 文件夹相关
export const getProjectFiles = (options) => Vue.http.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/folder/' + options.folderId, options)
export const saveProjectFolder = (options) => Vue.http.post(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/parent/' + options.folderId + '/folder', options.body)
export const updateProjectFolder = (options) => Vue.http.put(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/folder/' + options.folderId, options.body)
export const updateProjectFile = (options) => Vue.http.put(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/file/' + options.fileId, options.body)
export const delProjectFolder = (options) => Vue.http.delete(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/folder/' + options.folderId)
export const delProjectFile = (options) => Vue.http.delete(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/file/' + options.id)

// 获取文件夹 --zyc
// export const getProjectFiles2 = (options) => Vue.http.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/folder/' + options.folderId, {headers: {'Authorization': 'Bearer ' + localStorage.token}})

// export const getFiles = (options) => Vue.http.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/folder/' + options.folderId + '/info', {headers: {'Authorization': 'Bearer ' + options.token}})
// 文件相关
export const getFileInfo = (options) => Vue.http.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/file/' + options.fileId + '/info', {headers: {'Authorization': 'Bearer ' + localStorage.token}})
export const copyFile = (options) => Vue.http.post(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/parent/' + options.id + '/file', options.body)
export const getFileType = () => Vue.http.get(config.VIEWING_SERVICE_HOST + '/viewers/file-type.json')

// 文件分享 --zyc
export const shareView = (options) => Vue.http.post(config.BOX_SERVICE_HOST + '/shares' + '/projects/' + options.projectId + '/files/' + options.fileId + '/versions/' + options.version + '/views/' + options.viewId, options.body)
export const shareVersion = (options) => Vue.http.post(config.BOX_SERVICE_HOST + '/shares' + '/projects/' + options.projectId + '/files/' + options.fileId + '/versions/' + options.version, options.body)
export const shareFile = (options) => Vue.http.post(config.BOX_SERVICE_HOST + '/shares' + '/projects/' + options.projectId + '/files/' + options.fileId, options.body)
export const shareFolder = (options) => Vue.http.post(config.BOX_SERVICE_HOST + '/shares' + '/projects/' + options.projectId + '/folders/' + options.folderId, options.body)
export const getShare = (options) => Vue.http.get(config.BOX_SERVICE_HOST + '/shares/' + options, options, {headers: {'Authorization': options}})
export const getShareToken = (options) => Vue.http.post(config.BOX_SERVICE_HOST + '/shares/' + options.sharedId + '/token', options.body)
export const getUserShare = (options) => Vue.http.get(config.BOX_SERVICE_HOST + '/shares' + '/projects/' + options)
export const getPassword = (options) => Vue.http.get(config.BOX_SERVICE_HOST + '/shares/' + options + '/password')
export const deleteShare = (options) => Vue.http.delete(config.BOX_SERVICE_HOST + '/shares/' + options)

export const getView = (options) => Vue.http.get(config.VIEWING_SERVICE_HOST + '/' + options.urn, {headers: {'Authorization': 'Bearer ' + localStorage.token}})
// 分配ACCOUNT
export const getAllAccounts = (options) => Vue.http.get(config.BOX_SERVICE_ACCOUNT + '/accounts')
export const newAccount = (options) => Vue.http.post(config.BOX_SERVICE_ACCOUNT + '/accounts', options)

// 设置权限
export const postPermit = (options) => Vue.http.post(config.BOX_SERVICE_HOST + '/accounts/' + options.account + '/projects/' + options.projectId + '/folders/' + options.folderId + '/privileges', options.permission)
export const getPermitAll = (options) => Vue.http.get(config.BOX_SERVICE_HOST + '/accounts/' + options.account + '/projects/' + options.projectId + '/folders/' + options.folderId + '/privileges', options)
export const editPermit = (options) => Vue.http.put(config.BOX_SERVICE_HOST + '/accounts/' + options.account + '/projects/' + options.projectId + '/folders/' + options.folderId + '/privileges', options.permission)
export const deletePermit = (options) => Vue.http.delete(config.BOX_SERVICE_HOST + '/permissions/projects/' + options.projectId + '/folders/' + options.folderId + '/users/' + options.userId, options.body)
// 获取accounts
export const getActiveAccounts = (options) => Vue.http.get(config.BOX_SERVICE_HOST + '/accounts', options.body)

export const deleteSharedResource = (options) => Vue.http.delete(config.SFS_SERVICE_HOST + '/sharedresources/' + options.id)
export const createSharedPublicUrl = (options) => Vue.http.post(config.SFS_SERVICE_HOST + '/sharedresources/' + options.id, options.body, {
  emulateJSON: true,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
})
// 文件分享
// export const getProjectShare = (options) => Vue.http.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/sharedfiles', options)

// job
export const createJob = (options) => Vue.http.post(config.TRANSLATION_SERVICE_HOST + '/jobs', options)
export const getJob = (options) => Vue.http.get(config.TRANSLATION_SERVICE_HOST + '/jobs?urn=' + options.urn, {headers: {'Authorization': 'Bearer ' + localStorage.token}})

// 回收站
export const getProjectRecycle = (options) => Vue.http.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/recyclebin')
export const recoverProjectRecycle = (options) => Vue.http.post(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/recyclebin/' + options.id)

// 成员
export const getProjectMembers = (options) => Vue.http.get(config.PROJECT_SERVICE_HOST + '/projects/' + options.projectId + '/members')
export const getMembersByQuery = (options) => Vue.http.get(config.AUTH_SERVICE_HOST + '/authentication/v1/users', options)
export const getProjectMemberInfo = (options) => Vue.http.get(config.PROJECT_SERVICE_HOST + '/projects/' + options.projectId + '/members/' + options.id)
export const saveProjectMember = (options) => Vue.http.post(config.PROJECT_SERVICE_HOST + '/projects/' + options.projectId + '/members', options.body)
export const delProjectMember = (options) => Vue.http.delete(config.PROJECT_SERVICE_HOST + '/projects/' + options.projectId + '/members/' + options.id)
export const delProjectMemberAdmin = (options) => Vue.http.delete(config.PROJECT_SERVICE_HOST + '/projects/' + options.projectId + '/members/' + options.id + '/roles/admin')
export const authProjectMemberAdmin = (options) => Vue.http.post(config.PROJECT_SERVICE_HOST + '/projects/' + options.projectId + '/members/' + options.id + '/roles/admin')

// bimmodel
export const saveModelFiles = (options) => Vue.http.post('/projects/' + options.projectId + '/bimbox', options.data)
export const getSaveModelFiles = (options) => Vue.http.get('/projects/' + options.projectId + '/bimbox')

// 下载
export const downloadFile = (options) => axios.get(config.SFS_SERVICE_HOST + '/projects/' + options.projectId + '/file/' + options.detailId + '/versions/' + options.activeVersion, {headers: {'Authorization': 'Bearer ' + localStorage.token}, responseType: 'blob'})

// 批注相关
export const addComment = (options) => axios.put(config.NODE_TEST + '/comments', { data: options })
export const getComments = (options) => axios.get(config.NODE_TEST + '/comments/' + options.projectId + '/' + options.fileId + '/' + options.modelId, {dataType: 'json'})
export const deleteComment = (options) => axios.delete(config.NODE_TEST + '/comments/' + options.commentId, {dataType: 'json'})
export const addResponse = (options) => axios.post(config.NODE_TEST + '/comments/response', {data: options, dataType: 'json'})
export const deleteResponse = (options) => axios.delete(config.NODE_TEST + '/comments/' + options.commentId + '/response/' + options.responseId, {dataType: 'json'})
export const shiftComment = (options) => axios.put(config.NODE_TEST + '/comments/' + options.commentId, {data: {commentStatus: options.commentStatus}, dataType: 'json'})
export const changeFilters = (options) => axios.get(config.NODE_TEST + '/comments/fileters', {data: options, dataType: 'json'})

// getAllBucket
export const getAllBucket = (options) => Vue.http.get(config.STOAGE_SERVICE_HOST + '/buckets', {headers: {'Authorization': 'Bearer ' + localStorage.token}})
export const postAllBucket = (options) => Vue.http.post(config.STOAGE_SERVICE_HOST + '/buckets', options.data)
export const getBucketObjects = (options) => Vue.http.get(config.STOAGE_SERVICE_HOST + `/buckets/bimbox-model-link/objects`, {headers: {'Authorization': 'Bearer ' + localStorage.token}})

export const getBucketObjectdata = (options) => Vue.http.get(config.STOAGE_SERVICE_HOST + `/buckets/bimbox-model-link/objects/${options.id}`, {headers: {'Authorization': 'Bearer ' + localStorage.token}})

export const potBucketObjects = (options) => Vue.http.post(config.STOAGE_SERVICE_HOST + `/buckets/bimbox-model-link/objects/${options.urn}`, JSON.stringify(options.data), {
  headers: {'Content-Type': 'application/octet-stream'}
})
