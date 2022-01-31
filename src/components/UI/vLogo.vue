<template>
  <img class="logo" :width="size" src="@/assets/images/UI/logo.svg" alt="Potok">
</template>

<script>
export default {
  name: "v-logo",
  props: {
    size: {
      type: String,
      default: '44'
    }
  }
}
</script>

<style scoped>

</style>