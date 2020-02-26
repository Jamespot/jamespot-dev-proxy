

var express = require('express'),
    fs = require('fs'),
    https = require('https')

var proxy = require('http-proxy-middleware')

var app = express()

https.createServer({
    key: fs.readFileSync('js.teamkline.kline.app.key'),
    cert: fs.readFileSync('js.teamkline.kline.app.crt')
  }, app).listen(3443);
   

var domain = "teamkline.kline.app";
var protocol = 'https';

var socketProxy = proxy('ws://'+domain+'/socket.io', { changeOrigin: true })
app.use('/socket.io', socketProxy)

app.use('/reactTest', proxy({ target: protocol+'://'+domain, changeOrigin: true }))
app.use('/user-api', proxy({ target: protocol+'://'+domain, changeOrigin: true }))
app.use('/image-cache', proxy({ target: protocol+'://'+domain, changeOrigin: true }))

app.use('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }))


var server = app.listen(3333);

server.on('upgrade', socketProxy.upgrade);
