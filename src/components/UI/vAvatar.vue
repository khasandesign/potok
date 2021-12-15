<template>
  <div class="avatar" :style="{borderRadius: size / 4 + 'px', width: size + 'px', height: size + 'px' }">
    <img :src="require(`@/assets/images/${src}`)" :alt="src">
  </div>
</template>

<script>
export default {
  name: 'v-avatar',
  props: ['size', 'src'],
}
</script>

<style lang="scss" scoped>
.avatar {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
