<template>
  <footer-default v-if="footer === 'default'"></footer-default>
</template>

<script>
import '@/assets/scss/layout/footer.scss'

export default {
  name: "footbar", // The name is footbar, bc we can't use footer
  data() {
    return {
      footer: 'default'
    }
  },
  props: {
    change: {
      type: String,
    }
  },
  watch: {
    change: function (newVal) {
      this.footer = newVal
    }
  },
  methods: {
    setFooter() {
      this.$router.beforeEach((to) => {
        if (to.meta['footer']) {
          this.footer = to.meta['footer']

          if (this.$store.state.authorized === false) {
            // ...You can set guest footer here
          }
        } else {
          this.footer = false
        }
      })
    },
  },
  beforeMount() {
    this.setFooter()
  }
}
</script>

<style lang="scss" scoped>

</style>