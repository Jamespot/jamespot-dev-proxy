var express = require('express')
var proxy = require('http-proxy-middleware')

var app = express()


var socketProxy = proxy('ws://jpro1-macpagnol.jamespot.pro/socket.io', { changeOrigin: true })
app.use('/socket.io', socketProxy)

app.use('/reactTest', proxy({ target: 'http://jpro1-macpagnol.jamespot.pro', changeOrigin: true }))
app.use('/user-api', proxy({ target: 'http://jpro1-macpagnol.jamespot.pro', changeOrigin: true }))

app.use('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }))



var server = app.listen(3333);

server.on('upgrade', socketProxy.upgrade);
