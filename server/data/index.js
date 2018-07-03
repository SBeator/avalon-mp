const getUserHash = require('../connectedUser').getUserHash

const mockSeats = new Array(9).fill({})
mockSeats[3] = {
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeUlHUuMJguQsZF3933j16D7IToLt3dnhS8gyliaPVpfMfCmJeXbZVPr7OUofQS9uNPKrkBLW8Zrg/132',
  city: 'Chengdu',
  country: 'China',
  gender: 1,
  language: 'zh_CN',
  nickName: '啦啦啦',
}

const rooms = [{
  roomId: '1234',
  gameType: {
    playerNumber: 9,
    hasMerlin: true,
    hasAssassin: true,
    hasPercival: true,
    hasMorgana: true,
    hasMordred: false,
    hasOberon: false,
  },
  seatDatas: mockSeats,
  users: [{
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeUlHUuMJguQsZF3933j16D7IToLt3dnhS8gyliaPVpfMfCmJeXbZVPr7OUofQS9uNPKrkBLW8Zrg/132',
    city: 'Chengdu',
    country: 'China',
    gender: 1,
    language: 'zh_CN',
    nickName: '啦啦啦',
  }],
}, {
  roomId: '1111',
  gameType: {
    playerNumber: 9,
    hasMerlin: true,
    hasAssassin: true,
    hasPercival: true,
    hasMorgana: true,
    hasMordred: false,
    hasOberon: false,
  },
  seatDatas: new Array(9).fill({}),
  users: [{
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeUlHUuMJguQsZF3933j16D7IToLt3dnhS8gyliaPVpfMfCmJeXbZVPr7OUofQS9uNPKrkBLW8Zrg/132',
    city: 'Chengdu',
    country: 'China',
    gender: 1,
    language: 'zh_CN',
    nickName: '星星',
  }]
}]

const data = {
  createRoom({
    roomId,
    gameType
  }) {
    const newRoom = {
      roomId,
      gameType,
      seatDatas: new Array(gameType.playerNumber).fill({}),
      users: []
    }

    rooms.push(newRoom)

    return newRoom
  },

  findRoom({
    roomId
  }) {
    const room = rooms.filter(room => room.roomId === roomId)

    if (room.length) {
      return room[0]
    } else {
      return null
    }
  },

  joinRoom({
    roomId,
    userInfo,
    host
  }) {
    rooms.forEach(room => {
      if (room.users.filter(user => user.nickName === userInfo.nickName && user.avatarUrl === userInfo.avatarUrl).length) {
        this.leaveRoom({
          roomId: room.roomId,
          userInfo
        })
      }
    })

    const room = this.findRoom({
      roomId
    })

    if (room) {
      room.users.push(userInfo)

      if (host) {
        room.host = getUserHash(userInfo)
      }
    }
  },

  leaveRoom({
    roomId,
    userInfo
  }) {
    const room = this.findRoom({
      roomId
    })

    if (room) {
      room.users = room.users.reduce((previousUsers, user) => {
        if (user.nickName !== userInfo.nickName || user.avatarUrl !== userInfo.avatarUrl) {
          previousUsers.push(user)
        }

        return previousUsers
      }, [])
    }

    // TODO: Do more thing after user is leave(E.g: remove user from seat...)
  },

  seatDown({
    roomId,
    userInfo,
    seatNumber
  }) {
    const room = this.findRoom({
      roomId
    })

    if (!room) {
      return 'Room not exist'
    }

    const userHash = getUserHash(userInfo)
    if (room.users.filter(user => getUserHash(user) === userHash).length <= 0) {
      return 'User not in the room'
    }

    if (room.seatDatas[seatNumber] && room.seatDatas[seatNumber].avatarUrl) {
      return 'There is other user in the seat'
    }

    const userPreviouseSeat = room.seatDatas.findIndex(user => getUserHash(user) === userHash)
    if (userPreviouseSeat >= 0) {
      room.seatDatas[userPreviouseSeat] = {}
    }

    room.seatDatas[seatNumber] = userInfo

    return room.seatDatas
  },

  generateNewRoomId() {
    let roomId = Math.floor(1000 + Math.random() * 9000) + ''

    while (rooms.filter(room => room.id === roomId).length) {
      roomId = Math.floor(1000 + Math.random() * 9000) + ''
    }

    return roomId
  }
}

module.exports = data
