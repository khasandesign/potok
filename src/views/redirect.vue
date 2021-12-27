<template>
  <div>
    <Head>
      <title>Редирект предупреждение</title>
    </Head>

    <div class="redirect-warn">
      <div class="warn" v-if="!validData">
        <img class="logo" src="@/assets/images/UI/logo.svg" alt="Potok">
        <p class="par-4 italic">Вы переходите на чужой сайт. Кликните ниже для продолжения.</p>
        <a class="par-4 italic" :href="url">{{ name }}</a>
        <div class="form-check">
          <input v-model="trustFlow" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Я доверяю ссылкам этого потока
          </label>
        </div>
      </div>
      <div class="not-valid" v-else>
        <img class="logo" src="@/assets/images/UI/logo.svg" alt="Potok">
        <p class="par-4 italic">Упс... Эта ссылка не работает, спасибо, мы скоро её удалим!</p>
        <a class="par-4 italic close-tab" @click="closeTab()">Закрыть вкладку</a>
      </div>
    </div>
  </div>
</template>

<script>
import setCookie from "../mixins/setCookie";
import deleteCookie from "../mixins/deleteCookie";

export default {
  name: 'redirect',
  mixins: [setCookie, deleteCookie],
  data() {
    return {
      name: this.$route.query.name,
      url: this.$route.query.url,
      flowId: this.$route.query.flowId,
      validData: true,
      trustFlow: false
    }
  },
  watch: {
    validData: function (newVal) {
      if (!newVal) {
        // Notify the flow's owner that this link is not valid anymore
      }
    },
    trustFlow: function (newVal) {
      if (newVal) {
        this.setCookie('trust_' + this.flowId, 1, 365)
      } else {
        this.deleteCookie('trust_' + this.flowId)
      }

      window.location.href = this.url
    }
  },
  beforeMount() {
    // Check if props are passed
    if (!this.test) {
      this.validData = false
    }

    // Check if item obj is valid
    if (!this.name || !this.url) {
      this.validData = false
    }
    // Validate the url - check if the potential website is not throwing errors
    //... 404, 500 and so on
  },
  methods: {
    closeTab() {
      window.close()
    },
  },
  mounted() {
    this.$emit('navbar', false)
    this.$emit('footer', false)

    // In very low possible scenario user can go to a link, when interval checking is not done, this is just an insurance
    let cookies = this.getCookie()
    if (cookies['trust_' + this.flowId]) {
      window.location.href = this.url
    }
  }
}
</script>

<style lang="scss" scoped>
.redirect-warn {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .logo {
    margin-bottom: 24px;
  }

  p {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }

  .form-check {
    justify-content: center;
  }
  
  .close-tab {
    cursor: pointer;
  }
}
</style>