<template>
  <div class="seat" @tap="handleViewTap">
    <p class="seat-number">{{ num + 1 }}</p>
    <img class="seat-avatar" :src="avatarUrl"/>
  </div>
</template>
<script>
export default {
  props: {
    avatarUrl: {
      type: String
    },
    num: {
      type: Number
    }
  },

  methods: {
    handleViewTap () {
      this.$emit('seatDown', this.num)
    }
  }
}
</script>

<style>
.seat {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}

.seat-number {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #444;
  color: #eee;
  border-radius: 4rpx;
  width: 30rpx;
  height: 30rpx;
  font-size: 20rpx;
  line-height: 30rpx;
  text-align: center;
}

.seat-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 15rpx;
}
</style>
