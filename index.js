var express = require('express')
var proxy = require('http-proxy-middleware')

var app = express()

app.use('/user-api', proxy({ target: 'http://jpro1-macpagnol.jamespot.pro/user-api', changeOrigin: true }))
app.use('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }))

app.listen(3333)
