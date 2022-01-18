<template>
  <div class="dropdown-note">
    <p class="par-5" v-html="note"></p>
  </div>
</template>

<script>
export default {
  name: "v-dropdown-note",
  props: {
    note: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-note {
  padding: 4px 16px 4px 16px;
  color: $gray-30;

  p {
    margin: 0;
  }
}
</style>