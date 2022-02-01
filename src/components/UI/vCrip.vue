<template>
  <div :class="`crip crip-${variant} anim-click-sm`"><v-avatar :src="src" v-if="src" size="22"></v-avatar><slot></slot></div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false
    },
    variant: {
      type: String,
      default: ''
    }
  },
  name: 'v-crip',
}
</script>

<style lang="scss" scoped>

</style>