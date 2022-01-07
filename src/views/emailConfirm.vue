<template>
  <div></div>
</template>

<script>
import setCookie from "../mixins/setCookie";
import changeFavicon from "../mixins/changeFavicon";

export default {
  name: "email-confirm",
  data() {
    return {
      params: this.$route.params
    }
  },
  mixins: [setCookie, changeFavicon],
  methods: {
    /**
     * Get row from db and check if acceptToken is match and user's STATUS is 9 (waiting confirmation)
     */
    checkUrl() {
      // ...Get and check user's props here
      this.saveLocalStorage()

      // Get info about user's last flow and set welcome message
      let messages = ['Рады видеть вас', 'Приветсвуем вас', 'Океей летс го...', 'Готовы продолжить?'],
          message = messages[Math.floor(Math.random() * messages.length)],
          lastFlow = {
            id: 23,
            title: 'Полная база Git и GitHub хардкор уровня',
          }

      // Success login notification
      this.pushNotification({
        title: message,
        description: 'В прошлый раз вы остановились на “' + lastFlow.title.substring(0, 22) + '...”',
        image: 'user/original/profile.jpg',
        url: '/flow'
      })

      this.setCookie('continue', JSON.stringify(lastFlow))

      this.changeFavicon("UI/favicon-light-mode.svg", "UI/favicon-dark-mode.svg")
      this.$router.push('/')
    },

    /**
     * Save api token info in localstorage
     */
    saveLocalStorage() {
      // ...Save api token here, this is just mock
      localStorage.setItem('token', JSON.stringify({
        api_refresh_token: "LRwi9DJ6xw034kxzalbzwJodaDgCVUqY4QSO7tR951RlG8LInUtExU8blBQw",
        api_token: "Yq7wUUOQL90cchuuuiUakz7ArHGvlvGHuyiYQecYCKbOGpV7TEWvyrUYBx5o",
        api_token_expire_at: "2022-01-06 02:19:49",
        expires_at: "2022-01-05T21:19:49.488Z",
        now: "2021-12-23 02:19:49"
      }))

      this.$store.commit('signIn', true)
    }
  },
  beforeMount() {
    this.checkUrl()
  }
}
</script>

<style scoped>

</style>