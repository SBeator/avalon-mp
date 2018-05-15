<template>
  <div class="welcome-warp">
    <p class="title">请选择游戏人数和角色</p>
    <p>玩家个数</p>
    <slider show-value :value="gameType.playerNumber" @change="changePlayerNumber" max="12" min="5"></slider>

    <label-switch :checked="gameType.hasMerlin" name="hasMerlin" @change="changeGameType" label="梅林"></label-switch>
    <label-switch :checked="gameType.hasAssassin" name="hasAssassin" @change="changeGameType" label="刺客"></label-switch>
    <label-switch :checked="gameType.hasPercival" name="hasPercival" @change="changeGameType" label="派西维尔"></label-switch>
    <label-switch :checked="gameType.hasMorgana" name="hasMorgana" @change="changeGameType" label="莫甘娜"></label-switch>
    <label-switch :checked="gameType.hasMordred" name="hasMordred" @change="changeGameType" label="莫德雷德"></label-switch>
    <label-switch :checked="gameType.hasOberon" name="hasOberon" @change="changeGameType" label="奥伯伦"></label-switch>
  </div>
</template>

<script>
import store from '@/store'
import labelSwitch from '@/Components/labelSwitch'

export default {
  components: {
    labelSwitch,
  },

  computed: {
    gameType() {
      return store.state.gameType
    },
  },

  methods: {
    changePlayerNumber(event) {
      this.changeGameType({
        name: 'playerNumber',
        value: event.target.value,
      })
    },

    changeGameType({ name, value }) {
      store.commit('changeGameType', {
        gameType: {
          [name]: value,
        },
      })
    },
  },
}
</script>
<style>
.welcome-warp {
  padding: 20px;
}

.title {
  margin: 50rpx 0;
  text-align: center;
  font-size: 50rpx;
  font-weight: bold;
}

button {
  margin-bottom: 20rpx;
}
</style>
