const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'my_test',
    user: 'mysql',
    password: 'mysql',
  })
  connection.connect()
  const sql = 'select * from todo where delete_flg = 0 order by task_state, create_dt desc, update_dt desc;'
  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    const todo = results.map(result => {
      return {
        id: result.task_id,
        name: result.task_title,
        isOpen: result.task_state == 'open' ? true : false,
      }
    })
    res.json({ todo })
  })
  connection.end()
})

app.post('/add', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'my_test',
    user: 'mysql',
    password: 'mysql',
  })
  connection.connect()
  const sql = 'insert into todo set ?'
  const values = {
    task_title: req.body.name,
    task_state: req.body.isOpen ? 'open' : 'done',
  }
  connection.query(sql, values, (error, results, fields) => {
    if (error) throw error
    const id = results.insertId
    res.json({ id })
  })
  connection.end()
})

app.put('/task/:id', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'my_test',
    user: 'mysql',
    password: 'mysql',
  })
  connection.connect()
  let setCol = ''
  let setVal = []
  const keys = Object.keys(req.body)
  keys.forEach(key => {
    if (key === 'name') {
      setCol += (setCol ? ', ' : '')
      setCol += 'task_title = ?'
      setVal.push(req.body.name)
    } else if (key === 'isOpen') {
      setCol += (setCol ? ', ' : '')
      setCol += 'task_state = ?'
      setVal.push(req.body.isOpen ? 'open' : 'done')
    }
  })
  const sql = `update todo set ${setCol} where task_id = ?`
  const set = setVal.concat([req.params.id])
  connection.query(sql, set, (error, results, fields) => {
    if (error) throw error
  })

  const sql2 = 'select * from todo where task_id = ?'
  const where = [
    req.params.id,
  ]
  connection.query(sql2, where, (error, results, fields) => {
    if (error) throw error
    const task = results.map(result => {
      return {
        id: result.task_id,
        name: result.task_title,
        isOpen: result.task_state == 'open' ? true : false,
      }
    })
    res.json({ task })
  })
  connection.end()
})

app.delete('/task/:id', (req, res) => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'my_test',
    user: 'mysql',
    password: 'mysql',
  })
  connection.connect()
  // const sql = 'delete from todo where task_id = ?'
  const sql = 'update todo set delete_flg = ? where task_id = ?'
  const where = [
    '1',
    req.params.id,
  ]
  connection.query(sql, where, (error, results, fields) => {
    if (error) throw error
    res.json({
      id: results.affectedRows,
    })
  })
  connection.end()
})

module.exports = {
  path: '/api/todo',
  handler: app
}