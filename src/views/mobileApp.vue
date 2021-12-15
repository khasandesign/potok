<template>
mobile app
</template>

<script>
export default {
  name: "mobileApp",
  beforeMount() {
    this.$emit('navbar', false)
    this.$emit('footer', false)
  },
}
</script>

<style lang="scss" scoped>

</style>