<template>
  <button class="btn anim-click" :class="['btn-' + size, 'btn-' + variant]"><slot></slot></button>
</template>

<script>
export default {
  name: 'p-button',
  props: ['size', 'variant'],
}
</script>

<style lang="scss" scoped>
  button:active, button:focus, button:focus-visible {
    outline: none !important;
    box-shadow: none !important;
  }
</style>