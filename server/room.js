var dbData = require('./data')

function joinRoom({
  room,
  userInfo,
  host,
  sendData
}) {
  dbData.joinRoom({
    roomId: room.roomId,
    userInfo: userInfo,
    sendData
  })
  sendData({
    type: 'joinRoom',
    payload: {
      ...room,
      host,
    }
  })
}

function sendStartGameMessage({
  room
}) {
  // TODO: Generate roles and send start game event to all users
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

        // TODO: Send join room event to all users
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
    case 'startGame':
      roomId = data.state.roomId
      room = dbData.findRoom({
        roomId
      })
      if (room) {
        if (room.seatDatas.filter(seatData => !seatData.nickName).length) {
          sendData({
            type: 'error',
            payload: {
              message: '有空座位没有人坐下'
            }
          })
        } else {
          sendStartGameMessage({
            room
          })
        }
      } else {
        sendData({
          type: 'error',
          payload: {
            message: '房间号不存在……'
          }
        })
      }
      break
    default:
      break
  }
}

module.exports = room
