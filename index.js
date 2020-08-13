
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
let { users } = require('./state')
let counter = users.length + 1

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* BEGIN - create routes here */

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/:userId', (req, res) => {
  res.json(users.filter( user => user._id === parseInt(req.params.userId)))
})

app.post('/users', (req, res) => {
  users.push({_id: counter++, ...req.body})
  res.json(users[users.length - 1])
})

app.put('/users/:userId', (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.params.userId)))
  let user = foundUser[0]
  user.name = req.body.name ? req.body.name : user.name
  user.avatar = req.body.avatar ? req.body.avatar : user.avatar
  user.occupation = req.body.occupation ? req.body.occupation : user.occupation
  res.json(user)
})

app.delete('/users/:userId', (req, res) => {
  let foundUser = (users.filter( user => user._id === parseInt(req.params.userId)))
  let user = foundUser[0]
  if (user) {
    user.isActive = false
    res.send("The deed is done")
  } else {
      res.status(400).json({ message: `No member with the id of ${req.params.userId}`})
    }
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`My app is listening on port ${port} at ${new Date}!`))