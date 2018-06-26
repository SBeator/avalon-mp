const setSendDataFunc = require('./connectedUser').setSendDataFunc

module.exports = ({
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
