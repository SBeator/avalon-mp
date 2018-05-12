<template>
  <div class="welcome-warp">
    <p class="title">阿瓦隆游戏助手</p>
    <button type="primary" @click="createRoom()">创建房间</button>
    <button type="primary" @click="joinRoom()">加入房间</button>
  </div>
</template>

<script>
export default {
  methods: {
    createRoom() {
      wx.navigateTo({ url: '/pages/createRoom/main' })
    },

    joinRoom() {
      wx.navigateTo({ url: '/pages/joinRoom/main' })
    },
  },
}
</script>
<style>
.welcome-warp {
  padding: 20px;
}

.title {
  margin: 200rpx 0;
  text-align: center;
  font-size: 60rpx;
  font-weight: bold;
}

button {
  margin-bottom: 20rpx;
}
</style>
