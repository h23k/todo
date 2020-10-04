const express = require('express')
const app = express()

app.post('/create', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email

  if (username.length <= 0 || password.length <= 0) {
    res.status(401).json({ error: 'Required username and password.' })
    return
  }

  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database: 'my_test',
    user: 'mysql',
    password: 'mysql',
  })
  const sql = 'insert into user set ?'
  const values = {
    account: username,
    password: password,
    f_name: firstname,
    l_name: lastname,
    email: email,
  }
  connection.connect()
  connection.query(sql, values, (error, results, fields) => {
    if (error) throw error
    res.json({ results })
  })
  connection.end()
})

module.exports = {
  path: '/api/user',
  handler: app,
}