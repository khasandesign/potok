<template>
  <div>
    <Head>
      <title>Войти в Поток</title>
    </Head>

    <v-sign-in :hrMessage="getHrMessage()" :logSessionInfo="logSessionInfo"></v-sign-in>
  </div>
</template>

<script>
import isGuest from "../mixins/isGuest";

export default {
  data() {
    return {
      logSessionInfo: null,
    }
  },
  props: {
    reqSession: {
      type: [String, Boolean],
      default: true
    }
  },
  mixins: [isGuest],
  methods: {
    /**
     * Check cookies about existing log session
     */
    getSession() {
      let cookies = this.getCookies()
      if (cookies.logSessionId) {
        // Do query to API /log-session endpoint instead of mock data
        this.logSessionInfo = { // Instead of comparing dates, just query session by id with where condition on expires_at > now
          id: 232,
          name: 'Хасан Шадияров',
          email: 'hasan.shadiyarov@gmail.com',
          created_at: '1640571418',
          expires_at: '1641176218',
          accept_token: 'Yq7wUUOQL90cchuuuiUakz7ArHGvlvGHuyiYQecYCKbOGpV7TEWvyrUYBx5o'
        }
      }

      // If user click on registration instead of log in button
      let reqSession = (this.reqSession !== 'false')
      if (!reqSession) {
        this.logSessionInfo = null
      }
    },

    /**
     * Create a welcome message according to the current time
     * @returns {string}
     */
    getHrMessage() {
      let today = new Date()
      let curHr = today.getHours()

      if (curHr < 12) {
        return 'Доброе утричко!'
      } else if (curHr < 18) {
        return 'Добрый день!'
      } else {
        return 'Добрый вечер!'
      }
    },
  },
  beforeMount() {
    this.getSession()

    // Set session to sign in from different hosts during dev, delete it later
    this.setCookie('logSessionId', { // Instead of comparing dates, just query session by id with where condition on expires_at > now
      id: 232,
      name: 'Хасан Шадияров',
      email: 'hasan.shadiyarov@gmail.com',
      created_at: '1640571418',
      expires_at: '1641176218',
      accept_token: 'Yq7wUUOQL90cchuuuiUakz7ArHGvlvGHuyiYQecYCKbOGpV7TEWvyrUYBx5o'
    })
  },
}
</script>

<style lang="scss" scoped>

</style>