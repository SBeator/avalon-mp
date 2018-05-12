// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    seatDatas: new Array(8).fill({}),
    userSeatNumber: -1,
    roomId: '',
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
    }
  },
})

export default store
