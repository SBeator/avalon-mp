<template>
  <div class="playground-warp">
    <p>{{ roomId }}</p>
    <message></message>
    <round-seats :seats="seatDatas"></round-seats>
    <button v-show="readyStart" type="primary" @click="startGame()">开始游戏</button>
  </div>
</template>

<script>
import store from '@/store'
import roundSeats from '@/components/roundSeats'
import message from '@/components/message'

export default {
  components: {
    roundSeats,
    message,
  },

  computed: {
    seatDatas() {
      return store.state.seatDatas
    },

    roomId() {
      return store.state.roomId
    },

    readyStart() {
      return store.getters.readyStart
    }
  },

  methods: {
    startGame() {
      store.dispatch('startGame')
    }
  }
}
</script>
<style>
.playground-warp {
  text-align: center;
  padding: 20rpx
}
</style>
