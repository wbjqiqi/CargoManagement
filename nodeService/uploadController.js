var muilter = require('./multerUtil');

var upload = muilter.single('file')
exports.dataInput = function (req, res, cb) {
  upload(req, res, function (err) {
    //添加错误处理
    if (err) {
      return console.log(err)
    }
    //文件信息在req.file或者req.files中显示。
    res.send()
  })
}
