<template>
  <div class="playground-warp">
    <p>playground</p>
    <seat :num="1" :avatarUrl="userInfo.avatarUrl"></seat>
    <a href="/pages/index/main" class="home">去往首页</a>
  </div>
</template>

<script>
import seat from '@/components/seat'

export default {
  components: {
    seat,
  },

  data: {
    userInfo: {},
  },

  created() {
    this.userInfo = wx.getStorageSync('userInfo') || {}

    console.log(this.userInfo)
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
