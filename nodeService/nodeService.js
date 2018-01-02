/**
 * Created by Administrator on 2017/8/29 0029.
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const uploadController = require('./uploadController')
var path = require('path')
const connection = require('./mysql/mysql')

connection.connect()

// function readText (pathname) {
//   var bin = fs.readFileSync(pathname)
//
//   if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
//     bin = bin.slice(3)
//   }
//
//   return bin.toString('utf-8')
// }

// 设置跨域访问
// function allowOrigin () {
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, origin, content-type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  // res.header('Content-Type', 'application/json;charset=utf-8')
  // res.header('Content-Type', 'multipart/form-data;charset=utf-8')
  return next()
})
// }


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.route('/goods')
  .get((req, res) => {
    connection.query('SELECT * FROM GOODS_MESSAGE', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      res.status(200)
      res.send(results)
      return
    })
  })
  .post((req, res) => {
    var options = req.body
    let id = Math.random().toString(36).substr(2)
    var key = '`id`,'
    var str = '\'' + id + '\','
    for (i in options) {
      key += '`' + i + '`,'
      let value = options[i].split('\'').join()
      str += '\'' + value + '\','
    }
    key = key.substring(0, key.length - 1)
    str = str.substring(0, str.length - 1)
    console.log('INSERT INTO GOODS_MESSAGE (' + key + ') VALUES (' + str + ')')
    connection.query('INSERT INTO GOODS_MESSAGE (' + key + ') VALUES (' + str + ')', (error, results, failed) => {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      if (results.affectedRows) {
        res.status(200)
        res.send({id: id})
      } else {
        res.status(500)
        res.send({msg: 'failed'})
      }

    })
    return
  })
app.route('/goods/types')
  .get((req, res) => {
    connection.query('SELECT * FROM goods_brands', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      res.status(200)
      res.send(results)
    })
    return
  })
  .put((req, res) => {
    var name = req.body.name
    let id = Math.random().toString(36).substr(2)
    connection.query('INSERT INTO GOODS_BRANDS (name, id) VALUES ("' + name + '","' + id + '")', (error, results, failed) => {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      if (results.affectedRows) {
        res.status(200)
        res.send({id: id})
      } else {
        res.status(500)
        res.send({msg: 'failed'})
      }
    })
    return
  })
app.route('/goods/types/:name')
  .get((req, res) => {
    let name = req.params.name
    connection.query('SELECT name,id,searchCount FROM GOODS_MESSAGE WHERE name LIKE "%' + name + '%"', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      res.status(200)
      res.send(results)
    })
    return
  })
app.route('/goods/types/id/:id')
  .delete((req, res) => {
    var id = req.params.id
    var str = 'DELETE FROM `goods_brands` WHERE id=\'' + id + '\''
    connection.query(str, (error, results, failed) => {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      if (results.affectedRows) {
        var response = {
          msg: 'success'
        }
        res.status(200)
        res.send({id: id})
      } else {
        res.status(500)
        res.send({msg: 'failed'})
      }
    })
    return
  })
app.route('/goods/:name')
  .get((req, res) => {
    let name = req.params.name
    connection.query('SELECT name,id,searchCount FROM GOODS_MESSAGE WHERE name LIKE "%' + name + '%"', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      res.status(200)
      res.send(results)
    })
    return
  })
app.route('/goods/detail/:name')
  .get((req, res) => {
    let name = req.params.name
    connection.query('SELECT * FROM GOODS_MESSAGE WHERE name ="' + name + '"', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      res.status(200)
      res.send(results)
    })
    return
  })
app.route('/goods/keycode/:name')
  .get((req, res) => {
    let name = req.params.name
    connection.query('SELECT name,id,searchCount FROM GOODS_MESSAGE WHERE keycode LIKE "%' + name + '%"', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      res.status(200)
      res.send(results)
    })
    return
  })
app.route('/goods/id/:cargoId')
  .get((req, res) => {
    let id = req.params.cargoId
    connection.query('SELECT * FROM GOODS_MESSAGE WHERE id =\'' + id + '\'', function (error, results, fields) {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
        return
      }
      let searchCount = results.searchCount
      connection.query('UPDATE `goods_message` SET `searchCount` = ' + (searchCount + 1) + ' WHERE `goods_message`.`id` = ' + id, function () {
        res.status(200)
        res.send(results)
      })
    })
    return
  })
  .put((req, res) => {
    var id = req.params.cargoId
    var options = req.body
    var str = 'UPDATE `goods_message` SET '
    for (i in options) {
      str += '`' + i + '`=\'' + options[i] + '\','
    }
    str = str.substring(0, str.length - 1)
    console.log(str + ' WHERE id=' + id)
    connection.query(str + ' WHERE id= \'' + id + '\'', (error, results, failed) => {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      if (results && results.affectedRows) {
        var response = {
          msg: 'success'
        }
        res.status(200)
        res.send(response)
      } else {
        res.status(500)
        res.send({msg: 'failed'})
      }
    })
    return
  })
  .delete((req, res) => {
    var id = req.params.cargoId
    var str = 'DELETE FROM `goods_message` WHERE id=\'' + id + '\''
    connection.query(str, (error, results, failed) => {
      if (error) {
        res.status(500)
        res.send({msg: 'failed'})
      }
      if (results.affectedRows) {
        var response = {
          msg: 'success'
        }
        res.status(200)
        res.send({id: id})
      } else {
        res.status(500)
        res.send({msg: 'failed'})
      }
    })
    return
  })

app.post('/goods/file-upload/:id', uploadController.dataInput, () => {
  return
})

function getFilePath (filename) {
  return path.join(__dirname, '/images', filename || 'default.jpg')
}

app.get('/images/:filename', (req, res) => {
  var filePath = getFilePath(req.params.filename)
  console.log(filePath)
  fs.exists(filePath, function (exists) {
    if (!exists) {
      filePath = getFilePath()
    }
    res.sendfile(filePath)
  })
  return
})

const server = app.listen(3000, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
