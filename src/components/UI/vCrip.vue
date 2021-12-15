<template>
  <div :class="`crip crip-${variant}`"><v-avatar :src="src" v-if="src" size="22"></v-avatar><slot></slot></div>
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
  methods: {
    // Here we can define colorful background by using method and share image
  }
}
</script>

<style lang="scss" scoped>

</style>