<template>
  <button v-if="!to" :class="`btn ${icon !== '' && !isSlot() ? 'btn-i' : ''} btn-${isSlot() == null ? 'i-' : ''}${size} btn-${variant} anim-click`">
    <v-icon :name ="icon" :size="iconSize" v-if="icon !== ''"></v-icon>
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="`btn ${icon !== '' && !isSlot() ? 'btn-i' : ''} btn-${isSlot() == null ? 'i-' : ''}${size} btn-${variant} anim-click`">
    <v-icon :name ="icon" :size="iconSize" v-if="icon !== ''"></v-icon>
    <slot></slot>
  </router-link>
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
    },
    to: {
      type: [String, Object],
      default: ''
    }
  },
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:active, button:focus, button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
</style>