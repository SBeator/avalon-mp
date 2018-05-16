// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const STATUS = {
  IDLE: 'IDLE',
  SEATED_DOWN: 'SEATED_DOWN',
  READY: 'READY'
}

const store = new Vuex.Store({
  state: {
    userInfo: {},
    seatDatas: new Array(8).fill({}),
    userSeatNumber: -1,
    roomId: '',
    game: {
      status: STATUS.IDLE,
      host: false,
    },
    gameType: {
      playerNumber: 7,
      hasMerlin: true,
      hasAssassin: true,
      hasPercival: true,
      hasMorgana: true,
      hasMordred: false,
      hasOberon: false,
    }
  },
  mutations: {
    test: (state, {
      count
    }) => {
      console.log('test', count)
    },

    updateUserInfo: (state, {
      userInfo
    }) => {
      state.userInfo = userInfo
    },

    changeGameType: (state, {
      gameType
    }) => {
      state.gameType = {
        ...state.gameType,
        ...gameType
      }
    },

    createRoom: (state) => {
      state.seatDatas = new Array(state.gameType.playerNumber).fill({})
      state.game = {
        status: STATUS.IDLE,
        host: true,
      }
      state.roomId = Math.floor(1000 + Math.random() * 9000) + ''

      wx.navigateTo({
        url: '/pages/room/main'
      })
    },

    joinRoom: (state, {
      roomId
    }) => {
      state.roomId = roomId
      wx.navigateTo({
        url: '/pages/room/main'
      })
    },

    seatDown: (state, {
      seatNumber
    }) => {
      const userSeatNumber = seatNumber
      const {
        userSeatNumber: previousSeat,
        seatDatas,
        userInfo
      } = state

      if (previousSeat >= 0) {
        Vue.set(seatDatas, previousSeat, {})
      }

      Vue.set(seatDatas, userSeatNumber, {
        avatarUrl: userInfo.avatarUrl
      })

      state.seatDatas = seatDatas
      state.userSeatNumber = userSeatNumber

      if (seatDatas.filter(data => data.avatarUrl).length) {
        state.game.status = STATUS.SEATED_DOWN
      } else {
        state.game.status = STATUS.READY
      }
    }
  },
})

export default store
