<template>
  <img class="icon" :style="{ width: customSize + 'px', height: customSize + 'px' }" :src="require(`@/assets/icons/${path}`)"/>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '24'
    },
    customSize: {
      type: String,
      required: false,
    }
  },
  name: 'v-icon',
  data() {
    return {
      path: this.size + 'px' + '/i-' + this.name + '-' + this.size + 'px.svg'
    };
  },
}
</script>

<style lang="scss" scoped>

</style>
