<template>
  <div class="roundseats">
    <div v-for="(seat, index) in seats" :key="index">
      <div>
        <seat :avatarUrl="getAvatarUrl(seat)" :num="index" @seatDown="seatDown"/>
      </div>
    </div>
  </div>
</template>

<script>
import seat from './seat'
import defaultAvatar from '@/../static/default-avatar.png'

export default {
  props: {
    seats: [],
  },

  components: {
    seat,
  },

  methods: {
    seatDown(index) {
      console.log(`${index} is tapped!`)
      this.$emit('seatDown', index)
    },
    getAvatarUrl(seat) {
      return seat.avatarUrl || defaultAvatar
    },
  },
}
</script>

<style>
.roundseats {
  position: relative;
  padding: 10rpx;
  display: flex;
  max-width: 580rpx;
  flex-wrap: wrap;
}
</style>
