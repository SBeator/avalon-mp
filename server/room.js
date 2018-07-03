const dbData = require('./data')
const getSendDataFunc = require('./connectedUser').getSendDataFunc
const generateRoles = require('./roles').generateRoles

for (let i = 0; i < 10; i++) {
  console.log('-------------------')
  console.log(generateRoles({
    gameType: {
      playerNumber: 12,
      hasMerlin: true,
      hasAssassin: true,
      hasPercival: true,
      hasMorgana: true,
      hasMordred: true,
      hasOberon: true,
    }
  }))
}

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
  room,
  gameType
}) {}

const room = ({
  data
}) => {
  let gameType, roomId, room
  const userInfo = data.state.userInfo
  let sendData = getSendDataFunc({
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
          gameType = data.state.gameType
          sendStartGameMessage({
            room,
            gameType
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
      const seatNumber = data.state.seatNumber
      roomId = data.state.roomId
      const result = dbData.seatDown({
        roomId,
        userInfo,
        seatNumber
      })

      if (typeof result !== 'string') {
        const users = dbData.getUsers({
          roomId
        })

        if (typeof result !== 'string') {
          users.forEach(user => {
            sendData = getSendDataFunc({
              user: userInfo
            })
            sendData({
              type: 'seatDown',
              payload: {
                seatDatas: result
              }
            })
          })
        } else {
          console.error(result)
          sendData({
            type: 'error',
            payload: {
              message: result
            }
          })
        }

        // 给所有user发送信息
      } else {
        console.error(result)

        // Maybe don't need to send the error to MP
        // sendData({
        //   type: 'error',
        //   payload: {
        //     message: result
        //   }
        // })
      }

      break
    default:
      break
  }
}

module.exports = room
