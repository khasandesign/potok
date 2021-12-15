<template>
  <button :class="`btn ${icon !== '' && !isSlot() ? 'btn-i' : ''} btn-${isSlot() == null ? 'i-' : ''}${size} btn-${variant} anim-click`">
    <v-icon :name ="icon" :size="iconSize" v-if="icon !== ''"></v-icon>
    <slot></slot>
  </button>
</template>

<script>
import isSlot from "../../mixins/isSlot";

export default {
  name: 'v-button',
  mixins: [isSlot],
  props: {
    size: {
      type: String,
      default: 'md'
    },
    variant: {
      type: String,
      default: 'transparent'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: '24'
    }
  },
}
</script>

<style lang="scss" scoped>
  button:active, button:focus, button:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }
</style>