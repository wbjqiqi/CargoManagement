import * as StorageActions from './storage-actions';

class StorageUpload {
  private getAllBucket = StorageActions.getAllBucket;
  private postAllBucket = StorageActions.postAllBucket;
  private getBucketObjects = StorageActions.getBucketObjects;
  private getBucketObjectdata = StorageActions.getBucketObjectdata;
  private potBucketObjects = StorageActions.potBucketObjects;

  public uploadStorage (bucket_key: string, object_key: string, imageInfo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.saveAvatar(bucket_key, object_key, imageInfo).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    });
  }

  public getStorage (bucket_key: string, object_key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.initEventdata(bucket_key, object_key).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    });
  }

  private getBucket (bucket_key: string, object_key: string) {
    return new Promise((resolve, reject) => {
      this.getAllBucket().then((res: any) => {
        const temp = res.data.buckets;
        let flag = true
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].bucket_key === bucket_key) {
            flag = false
            this.initEventInfo(bucket_key, object_key).then((res) => {
              resolve(res)
            }).catch((err) => {
              reject(err)
            });;
          }
        }
        // 没找到新建一个bucket_key
        if (flag) {
          this.postAllBucket({
            data: {
              'bucket_key': bucket_key
            }
          }).then(() => {
            this.initEventInfo(bucket_key, object_key).then((res) => {
              resolve(res)
            }).catch((err) => {
              reject(err)
            });
          }).catch((err) => {
            reject({
              status: 'error',
              data: err
            });
          });
        }
      }).catch((err) => {
        reject({
          status: 'error',
          data: err
        });
      });
    })
  }

  // object
  private initEventInfo (bucket_key: string, object_key: string) {
    return new Promise((resolve, reject) => {
      this.getBucketObjects(bucket_key)
        .then((res: any) => {
          const temp = res.data.objects;
          let flag = true
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].object_key === object_key) {
              flag = false
              this.initEventdata(bucket_key, object_key).then((res) => {
                resolve(res)
              }).catch((err) => {
                reject(err)
              })
            }
          }
          if (flag) {
            reject({
              status: 'error',
              data: '未找到object_key对应的文件'
            });
          }
        })
        .catch((err) => {
          reject({
            status: 'error',
            data: err
          });
        });
    })
  }

  // data
  private initEventdata (bucket_key: string, object_key: string) {
    return new Promise((resolve, reject) => {
      this.getBucketObjectdata({
        bucketKey: bucket_key,
        id: object_key
      }).then((res: any) => {
        resolve({
          status: 'success',
          imageData: typeof res.data.length === 'undefined' ? '' : res.data
        });
      }).catch((err) => {
        reject({
          status: 'error',
          data: err
        });
      });
    })
  }

  // save avatar
  private saveAvatar (bucket_key: string, object_key: string, imageInfo: string) {
    // 保存
    return new Promise((resolve, reject) => {
      this.potBucketObjects({
        bucketKey: bucket_key,
        urn: object_key,
        data: imageInfo
      }).then(res => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    })
  }
}

export default StorageUpload;
