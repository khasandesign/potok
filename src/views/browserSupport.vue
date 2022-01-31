<template>
  <div>
    <Head>
      <title>Обновите браузер</title>
    </Head>

    <div class="warn-wrap">
      <div class="warn">
        <v-logo></v-logo>
        <h4>Обновите браузер</h4>
        <p class="par-4 italic">Ваш браузер не поддерживается. Обновите его чтобы получить <br>
          весь функционал Potok и приятный опыт <br>
          работы с сайтом.</p>
        <v-pattern class="d-none d-lg-block"></v-pattern>
        <p class="par-4 italic d-none d-xl-block">Вот несколько отличных <br>
          вариантов:</p>
        <div class="browsers">
          <a href="https://www.microsoft.com/en-us/edge">
            <img src="@/assets/images/UI/microsoft-edge.png" alt="Microsoft Edge">
            <p class="btn-4">Microsoft Edge</p>
          </a>
          <a href="https://www.mozilla.org/en-US/firefox/new/">
            <img src="@/assets/images/UI/mozilla-firefox.png" alt="Mozilla Firefox">
            <p class="btn-4">Mozilla Firefox</p>
          </a>
          <a href="https://www.opera.com/download">
            <img src="@/assets/images/UI/opera.png" alt="Opera">
            <p class="btn-4">Opera</p>
          </a>
          <a href="https://www.google.com/intl/en_us/chrome/">
            <img src="@/assets/images/UI/google-chrome.png" alt="Google Chrome">
            <p class="btn-4">Google Chrome</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "browser-support",
}
</script>

<style lang="scss" scoped>
.warn-wrap {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 80px 0;

  .logo {
    margin-bottom: 16px;
  }

  h4 {
    margin-bottom: 8px;
  }

  .browsers {
    display: flex;
    gap: 16px;
    margin-top: 48px;

    > a {
      text-decoration: none;
      padding: 24px 16px 16px;
      border-radius: 8px;
      min-width: 140px;
      min-height: 140px;
      color: $label-1;

      &:hover {
        background-color: $gray-03;
      }

      p {
        margin: 0;
      }

      img {
        width: 56px;
        height: 56px;
        margin-bottom: 24px;
      }
    }
  }

  .actions-hidden {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 1280px) {
  .warn-wrap {
    padding: 64px 0;
  }
}

@media (max-width: 1200px) {
  .warn-wrap {

    .pattern {
      margin-top: 26px;
    }
    .browsers {
      margin-top: 16px;
    }
  }
}
</style>