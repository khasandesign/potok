<template>
  <div :class="`dropdown-item ${disabled ? 'disabled' : ''} ${dAction ? 'd-action' : ''}`">
    <v-icon v-if="icon" :name="icon"></v-icon>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "v-dropdown-item",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    dAction: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss" scoped>

</style>