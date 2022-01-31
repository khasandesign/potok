<template>
  <div class="section-header">
    <h4>{{ headline }}</h4>
    <p class="col-lg-5 col-md-6 par-2"><slot></slot></p>
  </div>
</template>

<script>
export default {
  name: "v-section-header",
  props: {
    headline: {
      type: String,
      default: 'Heading'
    },
  }
}
</script>

<style lang="scss" scoped>
.section-header {
  margin-bottom: 36px;
}
</style>