import axios from 'axios';
import * as config from './config';

const getAllGoods = () => axios.get(config.MY_PHP_SERVICE + '/goods');
const getAllGoodsType = () => axios.get(config.MY_PHP_SERVICE + '/goods/types');
const newBrandType = (options) => axios.put(config.MY_PHP_SERVICE + '/goods/types', options);
const deleteBrandType = (id) => axios.delete(config.MY_PHP_SERVICE + '/goods/types/id/' + id);
const searchByName = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/' + name);
const searchByAllName = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/detail/' + name);
const searchByKeycode = (name) => axios.get(config.MY_PHP_SERVICE + '/goods/keycode/' + name);
const searchById = (id) => axios.get(config.MY_PHP_SERVICE + '/goods/id/' + id);
const newCargo = (options) => axios.post(config.MY_PHP_SERVICE + '/goods', options);
const updateCargo = (options) => axios.post(config.MY_PHP_SERVICE + '/goods/id/' + options.id, options);
const deleteCargo = (id) => axios.delete(config.MY_PHP_SERVICE + '/goods/id/' + id);

const getBucket = () => axios.get(config.MY_PHP_SERVICE + '/buckets');
const postBucket = (options) => axios.post(config.MY_PHP_SERVICE + '/buckets', options.data);
const getObjects = (options) => axios.get(config.MY_PHP_SERVICE + '/buckets' + `/${options}/objects`, options);
const postObjects = (options) => axios.post(config.MY_PHP_SERVICE + '/buckets' + `/${options.bucketKey}/objects/${options.urn}`, JSON.stringify(options.data), {headers: {'Content-Type': 'application/octet-stream'}});
const getObjectsData = (options) => axios.get(config.MY_PHP_SERVICE + '/buckets' + `/${options.bucketKey}/objects/${options.id}`);

export {
  getAllGoods,
  getAllGoodsType,
  newBrandType,
  deleteBrandType,
  searchByName,
  searchByAllName,
  searchByKeycode,
  searchById,
  newCargo,
  updateCargo,
  deleteCargo,

  getBucket,
  postBucket,
  getObjects,
  postObjects,
  getObjectsData
};
