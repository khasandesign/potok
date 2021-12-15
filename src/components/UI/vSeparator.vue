<template>
  <div :class="`separator separator-${axis}`"></div>
</template>

<script>
export default {
  name: "v-separator",
  props: {
    axis: {
      type: String,
      default: 'h'
    }
  }
}
</script>

<style lang="scss" scoped>
.separator {
  background-color: $gray-08;
  margin: 8px 0;
}
.separator-h {
  width: 100%;
  height: 1px;
}
.separator-v {
  height: 100%;
  width: 1px;
}
</style>