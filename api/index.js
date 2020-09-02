const express = require('express')
const app = express()
app.get('/', (req, res) => {
  const json =  {
    todo: [
      {
        name: 'やること１やることやることやることやることやること',
        isOpen: true,
      },
      {
        name: 'やること２やることやることやることやることやることやることやることやること',
        isOpen: false,
      },
    ],
  }
  res.json(json)
})

module.exports = {
  path: '/api/todo',
  handler: app
}