const express = require('express')
const app = express()

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

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
  const sql = 'select account, f_name, l_name, email from user where account = ? and password = ?'
  const where = [username, password]
  connection.connect()
  connection.query(sql, where, (error, results, fields) => {
    if (error) throw error
    if (results.length === 1) {
      const authUser = {
        username: results[0].account,
        firstname: results[0].f_name,
        lastname: results[0].l_name,
        email: results[0].email,
      }
      req.session.authUser = authUser
      res.json(authUser)
    } else {
      res.status(401).json({ error: `Bad credentials. ${username}` })
    }
  })
  connection.end()
})

app.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

module.exports = {
  path: '/api/auth',
  handler: app
}