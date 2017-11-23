class CommonFunction {
  public static storageShow (files): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!files[0]) {
        reject({message: '未输入文件参数'})
      }
      if (!/image\/\w+/.test(files[0].type)) {
        reject({message: '请确保文件为图像类型'})
      }
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        resolve({
          message: '读取成功',
          imageData: reader.result
        })
      }
    })
  }
}

export {
  CommonFunction
}
