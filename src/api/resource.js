/**
 * Created by Administrator on 2017/8/28 0028.
 */
// import Vue from 'vue'
// import axios from 'axios'
// import * as config from './config'

// export const judgeUser = (options) => Vue.http.post(config.MY_NODE_SERVICE, options)
// export const judgeUser = (options) => Vue.http.post(config.MY_PHP_SERVICE + '/user', options)

// export const getAllBadMachine = (options) => Vue.http.post(config.MY_PHP_SERVICE + '/allBadMachine', options)
// export const newBadMachine = (options) => Vue.http.put(config.MY_PHP_SERVICE + '/allBadMachine', options)
// export const updateBadMachine = (options) => Vue.http.post(config.MY_PHP_SERVICE + '/allBadMachine/' + options.id, options)
// export const deleteBadMachine = (options) => Vue.http.delete(config.MY_PHP_SERVICE + '/allBadMachine/' + options.id)
// export const newMachineType = (options) => Vue.http.put(config.MY_PHP_SERVICE + '/allBadMachine/type', options)

import axios from 'axios'
import * as config from './config'

const getAllGoods = () => axios.get(config.MY_PHP_SERVICE + '/goods')
const searchByName = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/' + name)

export {
  getAllGoods,
  searchByName
}
