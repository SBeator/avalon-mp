<template>
  <div class="roleInfo" v-show="show">
    <p class="roleName">
      你的角色是<b :class="role.side">{{role.name}}</b>
    </p>
    <p class="otherInfo">
      {{role.message}}
    </p>
    <div class="otherPlayers" v-for="(user, index) in otherUsers" :key="index">
      <seat :avatarUrl="user.avatarUrl" :num="user.userIndex"/>
    </div>
    <button class="hideInfoButton" type="default" @click="hideInfo()">我知道了</button>
  </div>
</template>

<script>
import store from '@/store'
import seat from './seat'

export default {
  components: {
    seat,
  },

  props: {
    show: false,
  },

  computed: {
    role() {
      return store.state.role
    },

    otherUsers() {
      const otherUsers = store.state.role.otherUsers
      return otherUsers && otherUsers.length
        ? otherUsers.map(userIndex => ({
            /* eslint-disable indent */
            ...store.state.seatDatas[userIndex],
            userIndex,
          }))
        : []
    },
  },

  methods: {
    hideInfo() {
      this.$emit('hide')
    },
  },
}
</script>

<style>
.roleInfo {
  background: #eee;
  width: 400rpx;
  margin: auto;
  position: relative;
  padding: 100rpx;
  padding-bottom: 300rpx;
  border-radius: 40rpx;
}

.GOOD {
  color: green;
}

.BAD {
  color: red;
}

.hideInfoButton {
  position: absolute;
  bottom: 100rpx;
  width: 400rpx;
}

.otherPlayers {
  display: inline-block;
  min-width: 100rpx;
  align-items: center;
  margin: 10rpx 30rpx;
}
</style>
