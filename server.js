const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = 3000
const server = express()

const isAuth = require('./src/middlewares/isAuth')

app
  .prepare()
  .then(() => {
    // In this page we use a simple middleware that stoped the way if the condition isn't resolved and
    // use it the container instead of the NEXT "Page" standar config

    server.get('/home-dashboard', isAuth, (req, res) => {
      app.render(req, res, '/HomeDashboard')
    })

    server.get(`/CreateGroup`, (req, res) => {
      app.render(req, res, '/CreateGroup')
    })
    server.get(`/Login`, (req, res) => {
      app.render(req, res, '/Login')
    })

    server.get(`/CreateCompany`, isAuth, (req, res) => {
      app.render(req, res, '/CreateCompany')
    })

    server.get(`/OperationSearch`, (req, res) => {
      app.render(req, res, '/OperationSearch')
    })

    server.get('/DemoRoute', (req, res) => {
      app.render(req, res, '/Dashboard')
    })

    server.get('/SearchGroup', (req, res) => {
      app.render(req, res, '/SearchGroup')
    })

    server.get('/SearchCompany', (req, res) => {
      app.render(req, res, '/SearchCompany')
    })

    server.get('/SearchDashboard', (req, res) => {
      app.render(req, res, '/SearchDashboard')
    })

    server.get('/OperationUser', (req, res) => {
      app.render(req, res, '/OperationUser')
    })

    server.get('/HomeDashboard', (req, res) => {
      res.redirect('/SearchDashboard')
    })

    server.get('/ClientDashboard', (req, res) => {
      res.redirect('/SearchDashboard')
    })

    server.get('/', (req, res) => {
      app.render(req, res, '/')
    })

    server.get('/RecoverPass', (req, res) => {
      app.render(req, res, '/RecoverPass', req.query)
    })

    server.get('/RecoverMail', (req, res) => {
      app.render(req, res, '/RecoverMail', req.query)
    })

    server.get(`/Logout`, (req, res) => {
      app.render(req, res, '/LogOut')
    })

    // We declare the all the pages in the app that we can use it
    server.get('*', (req, res) => {
      app.render(req, res, '/Error404')
    })

    // Simple server listening
    server.listen(port, err => {
      if (err) throw err
      console.log(`Listening on port ${port} `)
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
