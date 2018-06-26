import md5 from 'md5'

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
    return this.connectedUsers[userHash]
  },

  setSendDataFunc({
    user,
    sendData
  }) {
    const userHash = this.getUserHash(user)
    this.connectedUsers[userHash] = sendData
  },

  deleteSendDataFunc({
    user
  }) {
    const userHash = this.getUserHash(user)
    delete this.connectedUsers[userHash]
  }
}

export const getSendDataFunc = connectedUsers.getSendDataFunc.bind(connectedUsers)
export const setSendDataFunc = connectedUsers.setSendDataFunc.bind(connectedUsers)

export default ({
  sendData,
  data
}) => {
  if (data.type === 'initUser') {
    const user = data.state.userInfo

    setSendDataFunc({
      sendData,
      user
    })
  }
}
