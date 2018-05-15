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

export const CHARACTERS = {
  MERLIN: 'MERLIN',
  ASSASSIN: 'ASSASSIN',
  PERCIVAL: 'PERCIVAL',
  MORGANA: 'MORGANA',
  MORDRED: 'MORDRED',
  OBERON: 'OBERON',
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
      characters: [
        CHARACTERS.MERLIN,
        CHARACTERS.ASSASSIN,
        CHARACTERS.MORGANA,
        CHARACTERS.PERCIVAL,
      ]
    }
  },
  mutations: {
    updateUserInfo: (state, {
      userInfo
    }) => {
      state.userInfo = userInfo
    },

    joinRoom: (state, {
      roomId
    }) => {
      state.roomId = roomId
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
