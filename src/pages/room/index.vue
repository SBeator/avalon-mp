<template>
  <div class="playground-warp">
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
  },
}
</script>
<style>
.playground-warp {
  text-align: center;
  margin-top: 20rpx;
}
</style>
