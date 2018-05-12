<template>
  <div class="roundseats">
    <div v-for="(seat, index) in seats" :key="index">
      <div class="seat-position"
        v-bind:style="{left: positions[index].left, top: positions[index].top}">
        <seat :avatarUrl="getAvatarUrl(seat)" :num="index"/>
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

  computed: {
    positions() {
      const length = this.seats.length

      const positions = new Array(length).fill().map((item, index) => {
        const angle = 2 * Math.PI / length * index
        return {
          left: (((1 + Math.sin(angle)) * 0.35 + 0.05) * 100).toFixed(0) + '%',
          top: (((1 - Math.cos(angle)) * 0.35 + 0.05) * 100).toFixed(0) + '%',
        }
      })
      return positions
    },
  },

  methods: {
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
  width: 100%;
  height: 700rpx;
}

.seat-position {
  position: absolute;
  left: 0;
  right: 0;
  width: 120rpx;
}
</style>
