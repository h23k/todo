const express = require('express')
const app = express()
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
  const sql = 'select * from todo order by create_dt desc, update_dt desc;'
  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    const todo = results.map(result => {
      return {
        name: result.task_title,
        isOpen: result.delete_flg === 0 ? true : false,
      }
    })
    res.json({ todo })
  })
  connection.end()
})

module.exports = {
  path: '/api/todo',
  handler: app
}