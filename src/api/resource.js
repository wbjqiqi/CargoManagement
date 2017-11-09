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
const getAllGoodsType = () => axios.get(config.MY_PHP_SERVICE + '/goods/types')
const newBrandType = (options) => axios.put(config.MY_PHP_SERVICE + '/goods/types', options)
const searchByName = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/' + name)
const searchByAllName = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/detail/' + name)
const searchByKeycode = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/keycode/' + name)
const searchById = (id) => axios.get(config.MY_PHP_SERVICE + '/goods/id/' + id)
const newCargo = (options) => axios.post(config.MY_PHP_SERVICE + '/goods', options)
const updateCargo = (options) => axios.post(config.MY_PHP_SERVICE + '/goods/id/' + options.id, options)
const deleteCargo = (id) => axios.delete(config.MY_PHP_SERVICE + '/goods/id/' + id)

export {
  getAllGoods,
  getAllGoodsType,
  newBrandType,
  searchByName,
  searchByAllName,
  searchByKeycode,
  searchById,
  newCargo,
  updateCargo,
  deleteCargo
}
