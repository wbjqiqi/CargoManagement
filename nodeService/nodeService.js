/**
 * Created by Administrator on 2017/8/29 0029.
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const fs = require('fs')
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
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, accept, origin, content-type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.route('/goods')
  .get((req, res) => {
    connection.query('SELECT * FROM GOODS_MESSAGE', function (error, results, fields) {
      if (error) throw error
      res.status(200)
      res.send(results)
    })
  })
app.route('/goods/:name')
  .get((req, res) => {
    let name  = req.params.name
    connection.query('SELECT name,id,searchCount FROM GOODS_MESSAGE WHERE name LIKE "%' + name + '%"', function (error, results, fields) {
      if (error) throw error
      res.status(200)
      res.send(results)
    })
  })
app.route('/goods/id/:cargoId')
  .get((req, res) => {
    let id  = req.params.cargoId
    connection.query('SELECT * FROM GOODS_MESSAGE WHERE id =' + id, function (error, results, fields) {
      if (error) throw error
      connection.query('UPDATE `goods_message` SET `searchCount` = searchCount + 1 WHERE `goods_message`.`id` = ' + id, function () {
        res.status(200)
        res.send(results)
      })
    })
  })
  .post((req, res) => {
    var id = req.params.cargoId
    var options = req.body;
    console.log(options)
    var str = 'UPDATE `goods_message` SET '
    for (i in options) {
      str += "`" + i + "`='" + options[i] + "',"
    }
    str = str.substring(0, str.length - 1)
    connection.query(str + ' WHERE id=' + id, (error, results, failed) => {
      if (error) {
        throw error
      }
      if (results.affectedRows) {
        var response = {
          msg: 'success',
        }
        res.status(200)
        res.send(response)
      } else {
        res.status(500)
        res.send({msg: 'failed'})
      }
    })
  })
// app.route('/user')
//   .post((req, res) => {
//     let username = req.body.username
//     let pwd = req.body.pwd
//     let alluser = require('./database/user.js')
//     let allClient = readText('./database/clients.json')
//     for (let i in alluser) {
//       if (alluser[i].username === username && alluser[i].pwd === pwd) {
//         let response = {
//           msg: 'success',
//           user: alluser[i].username,
//           token: alluser[i].pwd,
//           clients: JSON.parse(allClient)
//         }
//         res.status(200)
//         res.send(response)
//         return
//       }
//     }
//     res.status(401)
//     res.send({msg: 'failed'})
//   })
//
// app.route('/client')
//   .put((req, res) => {
//     let options = req.body
//     options.id = Math.random().toString(36).substr(2)
//     options.mainId = Math.random().toString(36).substr(2) + '-' + Math.random().toString(36).substr(2)
//
//     let allClient = readText('./database/clients.json')
//     let t = JSON.parse(allClient)
//     t.push(JSON.stringify(options))
//     fs.writeFileSync('./database/clients.json', JSON.stringify(t))
//     res.status(200)
//     res.send({msg: 'success',clients: options})
//   })
// app.route('/client/*')
//   .put((req, res) => {
//     let options = req.body
//     let id = req.params[0]
//     let allClient = readText('./database/clients.json')
//     let t = JSON.parse(allClient)
//     for (let i in t) {
//       if (JSON.parse(t[i]).id === id) {
//         t[i] = JSON.stringify(options)
//         fs.writeFileSync('./database/clients.json', JSON.stringify(t))
//         let response = {
//           msg: 'success',
//           clients: t[i]
//         }
//         res.status(200)
//         res.send(response)
//         return
//       }
//     }
//     res.status(500)
//     res.send({msg: 'failed'})
//   })
//   .delete((req, res) => {
//     let id = req.params[0]
//     let allClient = readText('./database/clients.json')
//     let t = JSON.parse(allClient)
//     for (let i in t) {
//       if (JSON.parse(t[i]).id === id) {
//         console.log(i)
//         t.splice(i, 1)
//         fs.writeFileSync('./database/clients.json', JSON.stringify(t))
//         let response = {
//           msg: 'success'
//         }
//         res.status(200)
//         res.send(response)
//         return
//       }
//     }
//     res.status(500)
//     res.send({msg: 'failed'})
//   })

const server = app.listen(3000, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
