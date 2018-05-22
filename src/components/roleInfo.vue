<template>
  <div class="roleInfo">
    <p class="roleName">
      你的角色是<b :class="role.side">{{text}}</b>
    </p>
    <p class="otherInfo">
      {{role.message}}
    </p>
    <div class="otherPlayers" v-for="(user, index) in otherUsers" :key="index">
      <img class="player" :src="avatarUrl" background-size="cover"/>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  computed: {
    role() {
      return store.state.role
    },

    otherUsers() {
      const otherUsers = store.state.role.otherUsers
      return otherUsers && otherUsers.length
        ? otherUsers.map(userIndex => store.state.seatDatas[userIndex])
        : []
    },
  },
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
