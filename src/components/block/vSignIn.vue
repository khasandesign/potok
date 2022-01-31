<template>
  <div class="container">
    <div class="col-xxl-4 col-xl-5 col-lg-6 col-md-9 mx-auto">
      <transition name="fade-left" mode="out-in">
        <div id="sign-in" class="sign-in" v-if="!logSession">
          <div class="sign-in-header">
            <img class="logo" src="@/assets/images/UI/logo.svg" alt="Potok">
            <v-avatar size="32" src="user/original/profile.jpg" class="continue-in" @click="logSession = true"
                      v-if="switchedLogSession"></v-avatar>
            <h4>Войти в поток</h4>
            <p class="par-2">{{ hrMessage }} Просто войдите <br>
              через любую соц. сеть ниже</p>
          </div>
          <div class="sign-in-actions">
            <div class="social-sign-in">
              <v-button size="xl" variant="google"><img src="@/assets/images/UI/google.svg"> Google</v-button>
              <v-button size="xl" variant="apple"><img src="@/assets/images/UI/apple.svg"> Apple ID</v-button>
              <v-button size="xl" variant="vk"><img src="@/assets/images/UI/vk.svg"> ВКонтакте</v-button>
            </div>
          </div>
          <div class="sign-in-footnote">
            <p class="par-5 label-5">Регистрируясь на сайте вы соглашайтесь с
              <router-link to="/">Политикой Конфиденциальности</router-link>
              и
              <router-link to="/">Правиклами Пользования</router-link>
              .
            </p>
          </div>
        </div>
        <div id="continue-in" class="sign-in" v-else-if="!emailSent && logSession">
          <div class="sign-in-header">
            <v-avatar size="48" src="user/original/profile.jpg"></v-avatar>
            <h4>{{ logSessionInfo.name }}</h4>
            <p class="par-2">{{ hrMessage }} Просто войдите <br> через кнопку ниже</p>
          </div>
          <div class="sign-in-actions">
            <v-button size="xl" variant="primary" class="btn-2" @click="logInSession">Войти</v-button>
          </div>
          <div class="sign-in-footnote">
            <p class="par-5 label-5 mb-0">Войти в другой аккаунт? <span class="medium new-account"
                                                                        @click="logSession = false, switchedLogSession = true">Другой аккаунт</span>
            </p>
          </div>
        </div>
        <div id="email-sent" class="sign-in" v-else-if="emailSent && logSession">
          <div class="sign-in-header">
            <v-avatar size="48" src="user/original/profile.jpg"></v-avatar>
            <h4>Проверьте почту</h4>
            <p class="par-2">Мы отправили вам ссылочку для подтверждения входа.</p>
          </div>
          <div class="sign-in-actions">
            <a href="https://mail.google.com" class="btn btn-2 btn-xl btn-google anim-click"><img
                src="@/assets/images/UI/i-envelop-sign-in-24px.svg"> Открыть почту</a>
          </div>
          <div class="sign-in-footnote">
            <p class="par-5 label-5 mb-0">Войти в другой аккаунт? <span class="medium new-account" @click="logSession = false, switchedLogSession = true">Другой аккаунт</span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-sign-in",
  data() {
    return {
      logSession: !!this.logSessionInfo,
      switchedLogSession: false,
      emailSent: false,
    }
  },
  props: {
    logSessionInfo: {
      type: Object,
      default: null
    },
    hrMessage: {
      type: String,
    }
  },
  methods: {
    /**
     * Log in to the account and send mail with confirmation link
     */
    logInSession() {
      this.generateTempUrl()

      // ...Send mail here
      this.emailSent = true
    },

    /**
     * Generate temporal url to accept the log in process
     */
    generateTempUrl() {
      let location = window.location,
          link = location.protocol + '//' + location.host + '/sign-in/confirm-email/' + this.logSessionInfo.email + '/' + this.logSessionInfo.accept_token

      console.log(link)
    },
  }
}
</script>

<style lang="scss" scoped>
// Fade left
.fade-left-enter-active,
.fade-left-leave-active {
  opacity: 1;
  transform: translateX(0);
  transition: 0.2s;
}

.fade-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.fade-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.sign-in {
  @extend .platter;
  margin-top: 48px;
  text-align: center;
  padding: 40px 64px 64px 64px;
  width: 100%;
  position: relative;


  .sign-in-header {
    margin-bottom: 24px;

    .logo {
      margin-bottom: 32px;
    }

    .avatar {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 32px;
    }

    h4 {
      margin-bottom: 5px;
    }
  }

  .sign-in-actions {
    margin-bottom: 24px;

    button {
      width: 100%;
    }

    .social-sign-in {
      > button:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }

  .sign-in-footnote {
    a {
      color: $label-5;
      text-decoration: none;
      border-bottom: 1px solid $gray-08;
    }
  }

  .new-account {
    color: $accent;
    cursor: pointer;
  }

  .continue-in {
    position: absolute;
    right: 8px;
    top: 8px;
    cursor: pointer;
  }
}

@media (max-width: 1366px) {
  .sign-in {
    padding: 32px 56px 56px 56px;

    .sign-in-header {

      .logo {
        margin-bottom: 24px;
      }
    }

    .sign-in-footnote {
      padding: 0 16px;
    }
  }
}
</style>