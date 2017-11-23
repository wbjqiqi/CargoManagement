import * as storageService from '../api/resource'

// getAllBucket storageService
const getAllBucket = () => {
  return new Promise((resolve, reject) => {
    storageService.getBucket().then(res => {
      console.log(res)
      resolve(res);
    });
  });
};

const postAllBucket = (data) => {
  return new Promise((resolve, reject) => {
    storageService.postBucket(data).then(res => {
      resolve(res);
    });
  });
};
const getBucketObjects = (data) => {
  return new Promise((resolve, reject) => {
    storageService.getObjects(data).then(res => {
      resolve(res);
    });
  });
};
const getBucketObjectdata = (data) => {
  return new Promise((resolve, reject) => {
    storageService.getObjectsData(data).then(res => {
      resolve(res);
    });
  });
};
const potBucketObjects = (data) => {
  return new Promise((resolve, reject) => {
    storageService.postObjects(data).then(res => {
      resolve(res);
    });
  });
};

export {
  getAllBucket,
  postAllBucket,
  getBucketObjects,
  getBucketObjectdata,
  potBucketObjects
};
