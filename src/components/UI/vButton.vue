<template>
  <button v-if="!to" :class="`btn ${icon !== '' && !isSlot() ? 'btn-i' : ''} btn-${isSlot() == null ? 'i-' : ''}${size} btn-${variant} ${color} anim-click-sm`">
    <v-icon :name ="icon" :size="iconTextSize" v-if="icon !== ''" :class="isSlot() ? 'icon-text' : ''"></v-icon>
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="`btn ${icon !== '' && !isSlot() ? 'btn-i' : ''} btn-${isSlot() == null ? 'i-' : ''}${size} btn-${variant} ${color} anim-click-sm`">
    <v-icon :name ="icon" :size="iconTextSize" v-if="icon !== ''"></v-icon>
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
      type: [String, Number],
      default: 24
    },
    to: {
      type: [String, Object],
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconTextSize: function () {
      let iconTextSize = this.iconSize

      if (this.isSlot()) {
        if (this.size === 'xl') {
          iconTextSize = 24
        }
        if (this.size === 'lg') {
          iconTextSize = 24
        }
        if (this.size === 'sm' || this.size === 'xs') {
          iconTextSize = 16
        }
      }

      return iconTextSize
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .icon-text {
    margin-right: 8px;
    opacity: 0.3;
  }
}

.btn:active, button:focus, button:focus-visible {
  outline: none !important;
  box-shadow: none !important;
}
</style>