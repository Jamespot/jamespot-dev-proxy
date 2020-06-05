

var express = require('express'),
    fs = require('fs'),
    https = require('https')

var proxy = require('http-proxy-middleware')

var app = express()

https.createServer({
    key: fs.readFileSync('js.teamkline.kline.app.key'),
    cert: fs.readFileSync('js.teamkline.kline.app.crt')
  }, app).listen(3443);
   

var domain = "k2018-1.jamespot.pro";
var protocol = 'https';

var socketProxy = proxy('ws://'+domain+'/socket.io', { changeOrigin: true })
app.use('/socket.io', socketProxy)


var proxyOptions = { 
  target: protocol+'://'+domain, 
  cookieDomainRewrite: ".teamkline.kline.app",
  changeOrigin: true,
  headers: {Referer: 'https://'+domain+'/'}
}


app.use('/reactTest', proxy(proxyOptions))
app.use('/user-api', proxy(proxyOptions))
app.use('/image-cache', proxy(proxyOptions))
app.use('/', proxy(proxyOptions))


/*
app.use('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }))
app.use('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }))
*/

var server = app.listen(3333);

server.on('upgrade', socketProxy.upgrade);
