const path = require('path')
const fs = require('fs')

const room = require('./room')

// you'll probably load configuration from config
const cfg = {
  ssl: true,
  port: 8777,
  ssl_key: path.join(__dirname, './ssl.key'),
  ssl_cert: path.join(__dirname, './ssl.crt')
}

const httpServ = (cfg.ssl) ? require('https') : require('http')

const WebSocketServer = require('ws').Server

let app = null

// dummy request processing
const processRequest = (req, res) => {
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
const wss = new WebSocketServer({
  server: app
})

wss.on('connection', function (client) {
  console.log('connected')

  const sendData = (data) => {
    const message = JSON.stringify(data)
    console.log(`Send message: \n${message}`)
    client.send(message)
  }

  client.on('message', function (message) {
    console.log(`Recieved message: \n${message}`)
    // client.send(message)
    room({
      sendData,
      data: JSON.parse(message)
    })
  })
})
