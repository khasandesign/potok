<template>
  <div>
    <Head>
      <title>Главная – Поток</title>
    </Head>

    <div class="container">
      <div class="medium-wrap">
        <section id="continue">
          <v-section-header headline="Продолжить">
            Нажмите <kbd>⌘</kbd>+<kbd>ЛКМ</kbd> по карточке чтобы отправить <br class="d-none d-xl-block"> его на ваш
            телефон в приложение.
          </v-section-header>
          <div class="row">
            <v-flow-card
                cripSrc="user/original/profile.jpg"
                cripName="Hasan Sh."
                title="Становление мидлом в PHP c практикой"
                annotation="Делаю эту подборку для себя чтобы стать мидлом"
                art="art-1.svg"
                not-public
            ></v-flow-card>
            <v-flow-card
                cripSrc="user/original/profile-2.jpg"
                cripName="Mark T."
                title="Полная база Git и GitHub хардкор уровня"
                annotation="Регулярно обновляемая база знаний Git и Github..."
                art="art-7.svg"
            ></v-flow-card>
            <div class="col-md-3"></div>
          </div>
        </section>
        <section id="your-flows">
          <v-section-header headline="Ваши потоки">
            Вы можете изменить ваши потоки зайдя в него <br class="d-none d-xl-block">
            и сразу внести нужные дополнения
          </v-section-header>
          <div class="row">
            <v-flow-card
                cripSrc="user/original/profile.jpg"
                cripName="Hasan Sh."
                title="Начинаем учить Python до джуна"
                annotation="Вот и я начал учить питончик, а шо поделать то?"
                art="art-3.svg"
            ></v-flow-card>
            <v-flow-card
                cripSrc="user/original/profile.jpg"
                cripName="Hasan Sh."
                title="Становление мидлом в PHP c практикой"
                annotation="Делаю эту подборку для себя чтобы стать мидлом"
                art="art-1.svg"
                not-public
            ></v-flow-card>
            <v-add-flow-card></v-add-flow-card>
          </div>
        </section>
        <section id="library">
          <v-section-header headline="Библиотека" class="mb-3">
            Потоки сохранятся только если вы пройдёте <br>
            параграф или сохраните его сами
          </v-section-header>
          <div class="filters">
            <v-button size="xs" variant="outline-dark">IT</v-button>
            <v-button size="xs" variant="dark">Дизайн</v-button>
            <v-button size="xs" variant="outline-dark">Веб разработка</v-button>
            <v-button size="xs" variant="outline-dark">Мобильная разработка</v-button>
            <v-button size="i-md" variant="highlight" to="/search">
              <v-icon name="search" size="24"></v-icon>
            </v-button>
          </div>
          <div class="row">
            <v-flow-card
                cripSrc="user/original/profile-3.jpg"
                cripName="Komol K."
                title="Полное изучение всех фич Figma"
                annotation="Figma имеет очень обширный функционал для дизайна"
                art="art-4.svg"
            ></v-flow-card>
            <v-flow-card
                cripSrc="user/original/profile-4.jpg"
                cripName="Baha T."
                title="Создания стильных интерфейсов"
                annotation="Минимализм – это не белый фон и текст на нём"
                art="art-5.svg"
            ></v-flow-card>
            <v-flow-card
                cripSrc="user/original/profile.jpg"
                cripName="Khasan Sh."
                title="Создание онлайн конструктора сайтов"
                annotation="Выучив весь этот материал я сделал свой конструктор"
                art="art-6.svg"
            ></v-flow-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: { // This object will be generated according to the api response in axios
        code: 0,
        status: 404,
        name: 'Not Found',
        message: 'Object not found: 42',
      }
    }
  },
  beforeMount() {
    this.$emit('navbar', 'default')
  }
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 36px;
}

section:first-child {
  margin-top: 48px;
}
</style>