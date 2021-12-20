<template>
  <div class="container">
    <div class="col-xxl-4 col-xl-6 col-lg-6 col-md-9 mx-auto">
      <div id="sign-in" class="sing-in" v-if="newAccount">
        <div class="sign-in-header">
          <img class="logo" src="@/assets/images/UI/logo.svg" alt="Potok">
          <v-avatar size="32" src="user/original/profile.jpg" class="continue-in" @click="newAccount = false" v-if="switchedNewAccount"></v-avatar>
          <h4>Войти в поток</h4>
          <p class="par-2">Доброе утричко! Просто войдите <br>
            через любую соц. сеть ниже</p>
        </div>
        <div class="sign-in-actions">
          <div class="social-sign-in">
            <v-button size="xl" variant="google"><img src="@/assets/images/UI/google.svg"> Google</v-button>
            <v-button size="xl" variant="facebook"><img src="@/assets/images/UI/facebook.svg"> Facebook</v-button>
            <v-button size="xl" variant="twitter"><img src="@/assets/images/UI/twitter.svg"> Twitter</v-button>
            <v-button size="xl" variant="github"><img src="@/assets/images/UI/github.svg"> GitHub</v-button>
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
      <div id="continue-in" class="sing-in" v-if="!newAccount">
        <div class="sign-in-header">
          <v-avatar size="48" src="user/original/profile.jpg"></v-avatar>
          <h4>Хасан Шадияров</h4>
          <p class="par-2">Доброе утричко! Просто войдите <br> через кнопку ниже</p>
        </div>
        <div class="sign-in-actions">
          <v-button size="xl" variant="primary" class="btn-2">Войти</v-button>
        </div>
        <div class="sign-in-footnote">
          <p class="par-5 label-5 mb-0">Создать новый аккаунт. <span class="semibold new-account" @click="newAccount = true, switchedNewAccount = true">Регистрация</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-sign-in",
  data() {
    return {
      newAccount: false,
      switchedNewAccount: false
    }
  },
  beforeMount() {
    this.$emit('navbar', false)
    this.$emit('footer', false)
  },
}
</script>

<style lang="scss" scoped>
.sing-in {
  @extend .platter;
  margin-top: 64px;
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
      > button {
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
</style>