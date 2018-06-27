const md5 = require('md5')

const connectedUsers = {
  sendDataMap: {
    'xxxx': 'client'
  },

  getUserHash(user) {
    return md5(JSON.stringify(user))
  },

  getSendDataFunc({
    user
  }) {
    const userHash = this.getUserHash(user)
    const client = this.sendDataMap[userHash]

    let sendData = null

    if (client) {
      if (client.readyState === client.OPEN) {
        sendData = (data) => {
          const message = JSON.stringify(data)
          console.log(`Send message: \n${message}`)
          client.send(message)
        }
      } else {
        delete this.sendDataMap[userHash]
      }
    }

    return sendData
  },

  setUserClient({
    user,
    client
  }) {
    const userHash = this.getUserHash(user)
    this.sendDataMap[userHash] = client

    console.log(this.sendDataMap)
  },

  deleteSendDataFunc({
    user
  }) {
    const userHash = this.getUserHash(user)
    delete this.sendDataMap[userHash]
  }
}

module.exports = {
  getSendDataFunc: connectedUsers.getSendDataFunc.bind(connectedUsers),
  setUserClient: connectedUsers.setUserClient.bind(connectedUsers),
  getUserHash: connectedUsers.getUserHash.bind(connectedUsers),
}
