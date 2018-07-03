<template>
  <div>
    <p class="message">
      {{ text }}
    </p>
  </div>
</template>

<script>
import store, { STATUS } from '@/store'

const gameMessageMap = {
  [STATUS.LOADING]: '加载中……',
  [STATUS.IDLE]: '请点击座位坐下',
  [STATUS.SEATED_DOWN]: '请等待其他玩家坐下',
  [STATUS.READY]: '请等待主机玩家开始游戏',
  [STATUS.STARTED]: '点击“查看身份”查看自己身份信息',
}

const hostUserGameMessageMap = {
  [STATUS.READY]: '请点击开始游戏',
}

export default {
  created() {
    if (store.state.game.host) {
      for (let key in hostUserGameMessageMap) {
        gameMessageMap[key] = hostUserGameMessageMap[key]
      }
    }
  },

  computed: {
    text() {
      return gameMessageMap[store.state.game.status]
    },
  },
}
</script>

<style>
.message {
  font-size: 40rpx;
  margin-top: 30rpx;
}
</style>
