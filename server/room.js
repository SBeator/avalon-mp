var dbData = require('./data')

const room = ({
  data,
  sendData
}) => {
  let gameType, roomId, room
  switch (data.type) {
    case 'createRoom':
      gameType = data.state.gameType
      const newRoomId = dbData.generateNewRoomId()

      room = dbData.createRoom({
        id: newRoomId,
        gameType
      })
      dbData.joinRoom({
        roomId,
        userInfo: data.state.userInfo
      })
      sendData({
        type: 'createRoom',
        payload: {
          ...room,
          host: true,
        }
      })
      break
    case 'joinRoom':
      roomId = data.state.roomId
      room = dbData.findRoom({
        roomId
      })

      if (room) {
        dbData.joinRoom({
          roomId,
          userInfo: data.state.userInfo
        })
        sendData({
          type: 'joinRoom',
          payload: {
            ...room,
            host: false,
          }
        })
      } else {
        // Handle error
        console.error(`room ${roomId} doesn't exists`)
      }

      break
    default:
      break
  }
}

module.exports = room
