const room = ({
  data,
  sendData
}) => {
  switch (data.type) {
    case 'createRoom':
      const gameType = data.state.gameType
      sendData({
        type: 'createRoom',
        payload: {
          roomId: Math.floor(1000 + Math.random() * 9000) + '',
          host: true,
          gameType
        }
      })
      break
    default:
      break
  }
}

module.exports = room
