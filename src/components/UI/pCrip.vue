<template>
  <div class="crip"><p-avatar :src="src" size="22"></p-avatar><slot></slot></div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  name: 'p-crip',
  methods: {
    // Here we can define colorful background by using method and share image
  }
}
</script>

<style lang="scss" scoped>

</style>