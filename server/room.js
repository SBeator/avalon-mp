var dbData = require('./data')

function joinRoom({
  room,
  userInfo,
  host,
  sendData
}) {
  dbData.joinRoom({
    roomId: room.roomId,
    userInfo: userInfo
  })
  sendData({
    type: 'joinRoom',
    payload: {
      ...room,
      host,
    }
  })
}

const room = ({
  data,
  sendData
}) => {
  let gameType, roomId, room
  const userInfo = data.state.userInfo
  switch (data.type) {
    case 'createRoom':
      gameType = data.state.gameType
      const newRoomId = dbData.generateNewRoomId()

      room = dbData.createRoom({
        id: newRoomId,
        gameType
      })

      joinRoom({
        room,
        userInfo,
        host: true,
        sendData
      })
      break
    case 'joinRoom':
      roomId = data.state.roomId
      room = dbData.findRoom({
        roomId
      })

      if (room) {
        joinRoom({
          room,
          userInfo,
          host: false,
          sendData
        })
      } else {
        const errorMessage = `room ${roomId} doesn't exists`
        console.error(errorMessage)

        sendData({
          type: 'error',
          payload: {
            message: errorMessage
          }
        })
      }

      break
    default:
      break
  }
}

module.exports = room
