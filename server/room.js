const dbData = require('./data')
const getSendDataFunc = require('./connectedUser').getSendDataFunc

function joinRoom({
  room,
  userInfo,
  host,
  sendData
}) {
  dbData.joinRoom({
    roomId: room.roomId,
    userInfo: userInfo,
    host
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
  data
}) => {
  let gameType, roomId, room
  const userInfo = data.state.userInfo
  const sendData = getSendDataFunc({
    user: userInfo
  })

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
    case 'seatDown':

      break
    default:
      break
  }
}

module.exports = room
