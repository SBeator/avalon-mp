var path = require('path')
var fs = require('fs')

// you'll probably load configuration from config
var cfg = {
  ssl: true,
  port: 8777,
  ssl_key: path.join(__dirname, './ssl.key'),
  ssl_cert: path.join(__dirname, './ssl.crt')
}

var httpServ = (cfg.ssl) ? require('https') : require('http')

var WebSocketServer = require('ws').Server

var app = null

// dummy request processing
var processRequest = (req, res) => {
  res.writeHead(200)
  res.end('All glory to WebSockets!\n')
}

if (cfg.ssl) {
  app = httpServ.createServer({
    // providing server with  SSL key/cert
    key: fs.readFileSync(cfg.ssl_key),
    cert: fs.readFileSync(cfg.ssl_cert)
  }, processRequest).listen(cfg.port)
} else {
  app = httpServ.createServer(processRequest).listen(cfg.port)
}

// passing or reference to web server so WS would knew port and SSL capabilities
var wss = new WebSocketServer({
  server: app
})

wss.on('connection', function (wsConnect) {
  console.log('connected')

  wsConnect.on('message', function (message) {
    console.log(message)
    wsConnect.send(message)
  })
})
