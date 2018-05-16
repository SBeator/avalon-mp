<template>
  <div class="playground-warp">
    <p>{{ roomId }}</p>
    <message></message>
    <round-seats :seats="seatDatas"></round-seats>
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
  },
}
</script>
<style>
.playground-warp {
  text-align: center;
  margin-top: 20rpx;
}
</style>
