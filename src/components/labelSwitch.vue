
<template>
  <div class="label-switch">
    <label>
      <switch :checked="checked" @change="onchange" ></switch>
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: ['checked', 'name', 'label'],

  methods: {
    onchange(event) {
      const value = event.target.value
      const name = this.name

      this.$emit('change', {
        name,
        value,
      })
    },
  },
}
</script>

<style>
.label-switch {
  display: inline-block;
  min-width: 300rpx;
  margin-right: 20rpx;
  margin-top: 30rpx;
}
</style>
