const md5 = require('md5')

const connectedUsers = {
  sendDataMap: {
    'xxxx': () => {}
  },

  getUserHash(user) {
    return md5(JSON.stringify(user))
  },

  getSendDataFunc({
    user
  }) {
    const userHash = this.getUserHash(user)
    return this.sendDataMap[userHash]
  },

  setSendDataFunc({
    user,
    sendData
  }) {
    const userHash = this.getUserHash(user)
    this.sendDataMap[userHash] = sendData

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
  setSendDataFunc: connectedUsers.setSendDataFunc.bind(connectedUsers)
}
