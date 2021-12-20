<template>
  <div class="avatar" :style="{borderRadius: size / 4 + 'px', width: size + 'px', height: size + 'px' }">
    <img :src="require(`@/assets/images/${src}`)" :alt="src">
  </div>
</template>

<script>
export default {
  name: 'v-avatar',
  props: {
    size: {
      type: String,
      default: '24'
    },
    src: {
      type: String,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  overflow: hidden;

  img {
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 100%;
  }
}
</style>
