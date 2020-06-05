

var express = require('express'),
    fs = require('fs'),
    https = require('https')

var proxy = require('http-proxy-middleware')

var app = express()

https.createServer({
    key: fs.readFileSync('jamespot.proxy.key'),
    cert: fs.readFileSync('jamespot.proxy.crt')
  }, app).listen(3443);
   

var domain = "k2018-1.jamespot.pro";

var protocol = 'https';



var proxyOptions = { 
  target: protocol+'://'+domain, 
  cookieDomainRewrite: ".jamespot.proxy",
  changeOrigin: true,
  headers: {Referer: 'https://'+domain+'/'}
}

var socketProxy = proxy( 'wss://'+domain+'/socket.io', {changeOrigin: true , headers: {Referer: 'https://'+domain+'/'}})
app.use('/socket.io', socketProxy)


app.use('/reactTest', proxy({ target: 'http://localhost:3000', changeOrigin: true }))
app.use('/', proxy(proxyOptions))


var server = app.listen(3333);

server.on('upgrade', socketProxy.upgrade);
