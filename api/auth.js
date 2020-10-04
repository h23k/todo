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
  const sql = 'select account, password, f_name, l_name, email from user where account = ?'
  const where = [username]
  connection.connect()
  connection.query(sql, where, (error, results, fields) => {
    if (error) throw error
    if (results.length === 1) {
      const account = results[0].account
      const hashPw = results[0].password
      const f_name = results[0].f_name
      const l_name = results[0].l_name
      const email = results[0].email

      const bcrypt = require('bcrypt')
      bcrypt.compare(password, hashPw)
      .then(result => {
        if (result) {
          const authUser = {
            username: account,
            firstname: f_name,
            lastname: l_name,
            email: email,
          }
          req.session.authUser = authUser
          res.json(authUser)
        } else {
          res.status(401).json({ error: `Bad credentials. ${username}` })
        }
      })
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