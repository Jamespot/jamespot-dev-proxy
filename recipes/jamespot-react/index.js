var express = require('express'),
  fs = require('fs'),
  https = require('https')

var proxy = require('http-proxy-middleware')

var app = express()

https.createServer({
  key: fs.readFileSync('jamespot.proxy.key'),
  cert: fs.readFileSync('jamespot.proxy.crt')
}, app).listen(3443);

var protocol = 'https';


//////////////////////////////
/// TYPE YOUR DOMAIN HERE
var domain = "goals-plans.jamespot.pro";
//////////////////////////////


//////////////////////////////
//// REDIRECTED TO LOCAL SERVER
app.use('/react-core', proxy({
  // logLevel: 'debug',
  target: 'http://localhost:3030', changeOrigin: true,
  pathRewrite: {
    '^/react-core': '/'
  },
}))

app.use('/react-extension', proxy({
  // logLevel: 'debug',
  target: 'http://localhost:3040', changeOrigin: true,
  pathRewrite: {
    '^/react-extension': '/'
  },
}))

app.use('/react-boilerplate', proxy({
  // logLevel: 'debug',
  target: 'http://localhost:3000', changeOrigin: true,
  pathRewrite: {
    '^/react-boilerplate': '/'
  },
}))

app.use('/react-appstudio', proxy({
  // logLevel: 'debug',
  target: 'http://localhost:3001', changeOrigin: true,
  // pathRewrite: {
  //   '^/react-appstudio': '/'
  // },
}))
//////////////////////////////


//////////////////////////////
//// REDIRECTED TO ONLINE PLATFORM
app.use('/', proxy({
  // logLevel: 'debug',
  target: protocol + '://' + domain,
  cookieDomainRewrite: ".jamespot.proxy",
  changeOrigin: true,
  headers: { Referer: 'https://' + domain + '/' }
}))

var socketProxy = proxy('wss://' + domain + '/socket.io', {
  changeOrigin: false,
  headers: { Referer: 'https://' + domain + '/' }
})
app.use('/socket.io', socketProxy)
//////////////////////////////

var server = app.listen(3333);

server.on('upgrade', socketProxy.upgrade);
