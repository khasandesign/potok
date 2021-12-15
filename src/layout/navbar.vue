<template>
  <navbar-default v-if="view === 'default'"></navbar-default>
  <navbar-create v-if="view === 'create'"></navbar-create>
  <navbar-profile v-if="view === 'profile'"></navbar-profile>
</template>

<script>
import '@/assets/scss/layout/navbar.scss'

export default {
  name: "navbar",
  props: {
    view: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>