<template>
  <div class="playground-warp">
    <round-seats :seats="seatDatas"></round-seats>
  </div>
</template>

<script>
import store from '@/store'
import roundSeats from '@/components/roundSeats'

export default {
  components: {
    roundSeats,
  },

  computed: {
    seatDatas() {
      return store.state.seatDatas
    },
  },

  methods: {
    testing() {},
  },
}
</script>
<style>
.playground-warp {
  text-align: center;
  margin-top: 100rpx;
}
</style>
