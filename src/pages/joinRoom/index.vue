<template>
  <div class="joinroom-warp">
    <p class="title">请输入要加入的房间号</p>
    <input v-model="roomId" auto-focus="" class="weui-input" placeholder="房间号" maxlength="4" />
    <button type="primary" @click="joinRoom()">加入房间</button>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data: {
    roomId: '',
  },

  methods: {
    joinRoom() {
      store.commit('joinRoom', this.roomId)
      wx.navigateTo({ url: '/pages/room/main' })
    },
  },
}
</script>
<style>
.joinroom-warp {
  padding: 40rpx;
}

.title {
  margin: 200rpx 0;
  text-align: center;
  font-size: 60rpx;
  font-weight: bold;
}

input {
  margin-left: auto;
  margin-right: auto;
  padding: 28rpx;
  height: auto;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 40rpx;
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow: hidden;
  color: #000000;
}

button {
  margin-top: 20rpx;
}
</style>
