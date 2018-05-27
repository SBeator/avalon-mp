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
    seatDatas: new Array(9).fill({}),

  }],

  createRoom({
    roomId,
    gameType
  }) {
    const newRoom = {
      roomId,
      gameType,
      seatDatas: new Array(gameType.playerNumber).fill({}),
    }

    this.rooms.push(newRoom)
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
    roomId
  }) {
    // TODO: Add User in the room
  },

  generateNewRoomId: function () {
    let roomId = Math.floor(1000 + Math.random() * 9000) + ''

    while (this.rooms.filter(room => room.id === roomId).length) {
      roomId = Math.floor(1000 + Math.random() * 9000) + ''
    }

    return roomId
  }
}

module.exports = data
