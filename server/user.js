const setUserClient = require('./connectedUser').setUserClient

module.exports = ({
  client,
  data
}) => {
  if (data.type === 'initUser') {
    const user = data.state.userInfo

    setUserClient({
      client,
      user
    })
  }
}
