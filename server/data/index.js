const mockSeats = new Array(9).fill({})
mockSeats[3] = {
  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIeUlHUuMJguQsZF3933j16D7IToLt3dnhS8gyliaPVpfMfCmJeXbZVPr7OUofQS9uNPKrkBLW8Zrg/132',
  city: 'Chengdu',
  country: 'China',
  gender: 1,
  language: 'zh_CN',
  nickName: '啦啦啦',
}

const data = {
  rooms: [{
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
  }],

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

    this.rooms.push(newRoom)

    return newRoom
  },

  findRoom({
    roomId
  }) {
    const room = this.rooms.filter(room => room.roomId === roomId)

    if (room.length) {
      return room[0]
    } else {
      return null
    }
  },

  joinRoom({
    roomId,
    userInfo
  }) {
    this.rooms.forEach(room => {
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

  generateNewRoomId() {
    let roomId = Math.floor(1000 + Math.random() * 9000) + ''

    while (this.rooms.filter(room => room.id === roomId).length) {
      roomId = Math.floor(1000 + Math.random() * 9000) + ''
    }

    return roomId
  }
}

module.exports = data
