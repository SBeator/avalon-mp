<template>
  <div class="playground-warp">
    <round-seats :seats="seatDatas" @seatDown="seatDown"></round-seats>
    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
import Vue from 'vue'
import roundSeats from '@/components/roundSeats'

export default {
  components: {
    roundSeats,
  },

  data: {
    userInfo: {},
    seatDatas: [{}, {}, {}, {}, {}, {}],
  },

  created() {
    this.userInfo = wx.getStorageSync('userInfo') || {}
  },

  methods: {
    seatDown(index) {
      Vue.set(this.seatDatas, index, {
        avatarUrl: this.userInfo.avatarUrl,
      })
    },
  },
}
</script>
<style>
.playground-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
