<template>
  <div></div>
</template>

<script>
export default {
  name: "email-confirm",
  data() {
    return {
      params: this.$route.params
    }
  },
  methods: {
    /**
     * Get row from db and check if acceptToken is match and user's STATUS is 9 (waiting confirmation)
     */
    checkUrl() {
      // ...Get and check user's props here
      this.saveLocalStorage()
      this.$router.push('/')
    },

    /**
     * Save api token info in localstorage
     */
    saveLocalStorage() {
      // ...Save api token here, this is just mock
      localStorage.setItem('token', {
        api_refresh_token: "LRwi9DJ6xw034kxzalbzwJodaDgCVUqY4QSO7tR951RlG8LInUtExU8blBQw",
        api_token: "Yq7wUUOQL90cchuuuiUakz7ArHGvlvGHuyiYQecYCKbOGpV7TEWvyrUYBx5o",
        api_token_expire_at: "2022-01-06 02:19:49",
        expires_at: "2022-01-05T21:19:49.488Z",
        now: "2021-12-23 02:19:49"
      })

      this.$store.commit('signIn', true)
    }
  },
  beforeMount() {
    this.$emit('navbar', false)
    this.$emit('footer', false)

    this.checkUrl()
  }
}
</script>

<style scoped>

</style>