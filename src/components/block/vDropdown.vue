<template>
  <div :class="`dropdown dropdown-${size}`">
    <div class="dropdown-items">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-dropdown",
  props: {
    size: {
      type: String,
      default: 'md'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>