<template>
  <navbar-guest v-if="navbar === 'guest'"></navbar-guest>
  <navbar-default v-if="navbar === 'default'"></navbar-default>
  <navbar-create v-if="navbar === 'create'"></navbar-create>
  <navbar-profile v-if="navbar === 'profile'"></navbar-profile>
</template>

<script>
import '@/assets/scss/layout/navbar.scss'

export default {
  name: "navbar",
  data() {
    return {
      navbar: this.view
    }
  },
  props: {
    view: {
      type: String,
      default: ''
    }
  },
  beforeMount() {
    if (this.$store.state.authorized === false) {
      this.navbar = 'guest'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>