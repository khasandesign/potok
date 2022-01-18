<template>
  <div :class="`dropdown dropdown-${size}`">
    <div class="dropdown-items">
      <slot></slot>

      <v-separator v-if="note !== ''"></v-separator>
      <v-dropdown-note :note="note"></v-dropdown-note>
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
    },
    note: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>