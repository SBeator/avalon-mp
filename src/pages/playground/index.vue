<template>
  <div class="playground-warp">
    <round-seats :seats="seatDatas"></round-seats>
    <a href="/pages/index/main" class="home">去往首页</a>
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
.home {
  display: inline-block;
  margin: 200rpx auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
