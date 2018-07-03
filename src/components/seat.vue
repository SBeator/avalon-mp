<template>
  <div class="seat" @tap="handleViewTap">
    <p class="seat-number">{{ num + 1 }}</p>
    <img class="seat-avatar" :src="avatarUrl" background-size="cover" />
  </div>
</template>
<script>
import store from '@/store'

export default {
  props: {
    avatarUrl: {
      type: String,
    },
    num: {
      type: Number,
    },
  },

  methods: {
    handleViewTap() {
      this.$emit('seatDown', this.num)
      store.dispatch('seatDown', { seatNumber: this.num })
    },
  },
}
</script>

<style>
.seat {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: 120rpx;
  height: 120rpx;
}

.seat-number {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #444;
  color: #eee;
  border-radius: 50%;
  width: 50rpx;
  height: 50rpx;
  font-size: 35rpx;
  line-height: 50rpx;
  text-align: center;
}

.seat-avatar {
  width: 100%;
  height: 100%;
  border-radius: 15rpx;
}
</style>
