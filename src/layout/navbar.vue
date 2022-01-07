<template>
  <navbar-default v-if="navbar === 'default'"></navbar-default>
  <navbar-guest v-if="navbar === 'guest'"></navbar-guest>
  <navbar-create v-if="navbar === 'create'"></navbar-create>
  <navbar-profile v-if="navbar === 'profile'"></navbar-profile>
</template>

<script>
import '@/assets/scss/layout/navbar.scss'

export default {
  name: "navbar",
  data() {
    return {
      navbar: 'default'
    }
  },
  props: {
    change: {
      type: String,
    }
  },
  watch: {
    change: function (newVal) {
      this.navbar = newVal
    }
  },
  methods: {
    setNavbar() {
      this.$router.beforeEach((to) => {
        if (to.meta['navbar']) {
          this.navbar = to.meta['navbar']

          if (this.$store.state.authorized === false) {
            this.navbar = 'guest'
          }
        } else {
          this.navbar = false
        }
      })
    },
  },
  beforeMount() {
    this.setNavbar()
  }
}
</script>

<style lang="scss" scoped>

</style>