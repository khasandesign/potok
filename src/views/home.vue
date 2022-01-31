<template>
  <div>
    <Head>
      <title>Главная – Поток</title>
    </Head>
    <div class="container">
      <section id="continue">
        <v-section-header headline="Продолжить">
          Нажмите <kbd>⌘</kbd>+<kbd>ЛКМ</kbd> по карточке чтобы отправить <br class="d-none d-xl-block"> его на ваш
          телефон<span class="d-none d-xl-inline"> в приложение</span>.
        </v-section-header>
        <div class="row">
          <v-flow-card v-for="flow in continueFlows" :key="flow.id" :flow="flow"></v-flow-card>
        </div>
      </section>
      <section id="your-flows">
        <v-section-header headline="Ваши потоки">
          Вы можете изменить ваши потоки зайдя в них <br class="d-none d-xl-block">
          и внеся нужные дополнения
        </v-section-header>
        <div class="row">
          <v-flow-card v-for="flow in userFlows" :key="flow.id" :flow="flow"></v-flow-card>
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
          <v-button size="md" variant="highlight" to="/search" icon="search"></v-button>
        </div>
        <div class="row">
          <v-flow-card v-for="flow in libraryFlows" :key="flow.id" :flow="flow"></v-flow-card>
        </div>
      </section>
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
      },
      continueFlows: [ // This is just mock data, btw api crops data, not vue
        {
          id: 1,
          title: 'Становление мидлом в PHP back end',
          description: 'Делаю эту подборку для себя чтобы стать мидлом',
          art: 'art-1.svg',
          public: false,
          user: {
            id: 13,
            name: 'Khasan Sh.',
            avatar: 'user/original/profile.jpg'
          }
        },
        {
          id: 2,
          title: 'Полная база Git и GitHub хардкор уровня',
          description: 'Регулярно обновляемая база знаний Git и Github...',
          art: 'art-7.svg',
          public: true,
          user: {
            id: 13,
            name: 'Mark T.',
            avatar: 'user/original/profile-2.jpg'
          }
        },
      ],
      userFlows: [ // This is just mock data, btw api crops data, not vue
        {
          id: 3,
          title: 'Начинаем учить Python до джуна',
          description: 'Вот и я начал учить питончик, а шо поделать то?',
          art: 'art-3.svg',
          public: true,
          user: {
            id: 13,
            name: 'Khasan Sh.',
            avatar: 'user/original/profile.jpg'
          }
        },
        {
          id: 4,
          title: 'Становление мидлом в PHP back end',
          description: 'Делаю эту подборку для себя чтобы стать мидлом',
          art: 'art-1.svg',
          public: false,
          user: {
            id: 13,
            name: 'Khasan Sh.',
            avatar: 'user/original/profile.jpg'
          }
        },
      ],
      libraryFlows: [ // This is just mock data, btw api crops data, not vue
        {
          id: 5,
          title: 'Полное изучение всех фич Figma',
          description: 'Figma имеет очень обширный функционал для дизайна',
          art: 'art-4.svg',
          public: false,
          user: {
            id: 13,
            name: 'Komol K.',
            avatar: 'user/original/profile-3.jpg'
          }
        },
        {
          id: 6,
          title: 'Создания стильных интерфейсов',
          description: 'Минимализм – это не белый фон и текст на нём',
          art: 'art-5.svg',
          public: true,
          user: {
            id: 13,
            name: 'Baha T.',
            avatar: 'user/original/profile-4.jpg'
          },
        },
        {
          id: 7,
          title: 'Создание онлайн конструктора сайтов',
          description: 'Выучив весь этот материал я сделал свой конструктор',
          art: 'art-6.svg',
          public: true,
          user: {
            id: 13,
            name: 'Khasan Sh.',
            avatar: 'user/original/profile.jpg'
          },
        },
      ],
    }
  },
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