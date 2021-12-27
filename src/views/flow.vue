<template>
  <div>
    <Head>
      <title>{{ flow.title }}</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xl-4 col-lg-6 col-md-8 mx-auto">
          <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
          <h3>{{ flow.title }}</h3>
          <p class="desc par-1 italic">{{ flow.description }}</p>
          <v-art :art="flow.art"></v-art>
        </div>
      </section>
      <section id="content">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="flow" ref="flow">
              <div class="flow-chapter" v-for="(chapter, chi) in flow.content.chapters" :key="chapter.id" :data-index="chi">
                <p class="flow-title italic">{{ chapter.name }}</p>
                <div class="flow-items" ref="flowItems">
                  <v-flow-item
                      v-for="(link, li) in flow.content.chapters[chi].links"
                      :data-index="li"
                      :key="link.id"
                      :name="link.name"
                      :index="link.fIndex"
                      :item="link"
                      :warn="warn"
                      :flowId="flow.id"
                  ></v-flow-item>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 info-md">
            <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
            <p class="headline mx-4">{{ flow.title }}</p>
            <p class="par-3 italic">{{ flow.description }}</p>
            <v-button size="xl" icon="highFive" icon-size="32"></v-button>
            <v-button size="xl" icon="bookmark" icon-size="32"></v-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import getCookie from "../mixins/getCookie";

export default {
  data() { // This is just test flow object, remove it when connect DB
    return {
      warn: true,
      trustCheck: null,
      flow: {
        id: 1,
        title: 'Полная база Git и GitHub хардкор уровня',
        description: 'Регулярно обновляемая база знаний Git и Github от начинающего до хардкор уровня.',
        public: true,
        art: 'art-7.svg',
        authorId: 1,
        content: {
          chapters: [
            {
              id: 1,
              name: 'Вводные курсы',
            },
            {
              id: 2,
              name: 'Базовые основы',
            },
            {
              id: 3,
              name: 'Базовый GitHub',
            }
          ],
          links: [
            {
              chapterId: 1,
              index: 1,
              name: 'Вводный курс по Git и GitHub',
              type: 1,
              url: 'https://www.youtube.com/watch?v=zZBiln_2FhM'
            },
            {
              chapterId: 1,
              index: 2,
              name: 'Доп. теория и примеры работы',
              type: 1,
              url: 'https://www.youtube.com/watch?v=SEvR78OhGtw'
            },
            {
              chapterId: 2,
              index: 1,
              name: 'Что такое Git',
              type: 1,
              url: 'https://bit.ly/3Jc3OsP'
            },
            {
              chapterId: 2,
              index: 2,
              name: 'История происхождения Git',
              type: 1,
              url: 'https://bit.ly/3J80C1v'
            },
            {
              chapterId: 2,
              index: 3,
              name: 'Установка Git',
              type: 1,
              url: 'https://git-scm.com/downloads'
            },
            {
              chapterId: 2,
              index: 4,
              name: 'Настройка профиля и окружения',
              type: 1,
              url: 'https://bit.ly/3plnra7'
            },
            {
              chapterId: 2,
              index: 5,
              name: 'В чем разница между Git и Github',
              type: 1,
              url: 'https://tproger.ru/translations/difference-between-git-and-github/#part2'
            },
            {
              chapterId: 2,
              index: 6,
              name: 'Создание репозиториев',
              type: 1,
              url: 'https://bit.ly/3EpiIIu'
            },
            {
              chapterId: 2,
              index: 7,
              name: 'Работа с удаленными репозиториями',
              type: 1,
              url: 'https://bit.ly/3yRqj1j'
            },
            {
              chapterId: 2,
              index: 8,
              name: 'Просмотр истории коммитов',
              type: 1,
              url: 'https://bit.ly/3H0zj76'
            },
            {
              chapterId: 2,
              index: 9,
              name: 'Операции отмены',
              type: 1,
              url: 'https://bit.ly/3mnNlrx '
            },
            {
              chapterId: 2,
              index: 10,
              name: 'Основные команды Git',
              type: 1,
              url: 'https://bit.ly/3FlCqGo'
            },
            {
              chapterId: 3,
              index: 1,
              name: 'Что такое GitHub',
              type: 1,
              url: 'https://ru.wikipedia.org/wiki/GitHub'
            },
            {
              chapterId: 3,
              index: 2,
              name: 'Работа с репозиториями в Github',
              type: 1,
              url: 'https://bit.ly/3ejkf8A'
            },
            {
              chapterId: 3,
              index: 3,
              name: 'Основные понятия лицензий и авторского права',
              type: 1,
              url: 'https://habr.com/ru/post/243091/'
            },
            {
              chapterId: 3,
              index: 4,
              name: 'Работа с GitHub Pages',
              type: 1,
              url: 'https://youtu.be/84cyW2R9WWo?t=346'
            },
          ]
        },
      },
    }
  },
  mixins: [getCookie],
  methods: {
    /**
     * Add paragraph number and attach links them with their chapters
     */
    assignLinks() {
      let content = this.flow.content

      // Assign paragraph number
      for (let i = 0; i < content.links.length; i++) {
        content.links[i].fIndex = i + 1
      }
      // Attach links
      for (let i = 0; i < content.chapters.length; i++) {
        content.chapters[i]['links'] = content.links.filter(function (link) {
          return link.chapterId === content.chapters[i].id
        })
      }
    },

    /**
     * Order items in decrement/increment
     */
    orderItems() {
      let flow = this.$refs.flow,
          chapters = [].slice.call(flow.children);

      for (let i = 0; i < chapters.length; i++) {
        let itemsChildren = [].slice.call(chapters[i].querySelector('.flow-items').querySelectorAll('.flow-item'))

        itemsChildren.sort(function (a, b) {
          return a.getAttribute("data-index").localeCompare(b.getAttribute("data-index"));
        }).reverse()

        itemsChildren.forEach(function (el) {
          chapters[i].querySelector('.flow-items').appendChild(el)
        });
      }
    },

    /**
     * Order chapters in decrement/increment
     */
    orderChapters() {
      let flow = this.$refs.flow,
          chapters = [].slice.call(flow.children);

      chapters.sort(function (a, b) {
        return a.getAttribute("data-index").localeCompare(b.getAttribute("data-index"));
      }).reverse()

      chapters.forEach(function (el) {
        flow.appendChild(el)
      });
    },

    /**
     * Check if user trust the flow
     */
    checkTrust() {
      let cookies = this.getCookie()
      this.warn = !cookies['trust_' + this.flow.id];
    }
  },
  mounted() {
    this.assignLinks()
    this.$nextTick(() => {
      this.orderChapters()
      this.orderItems()
    })

    this.checkTrust()

    this.trustCheck = setInterval(() => {
      if (this.warn && this.$route.name === 'flow') {
        this.checkTrust()
      } else {
        clearInterval(this.trustCheck)
      }
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
section {
  margin: 0;
}

#info {
  margin-top: 48px;

  > div {
    text-align: center;
  }

  .crip {
    margin-bottom: 16px;
  }

  .desc {
    margin-bottom: 8px;
  }
}

#content {
  .info-md {
    text-align: center;

    .crip {
      margin-bottom: 20px;
    }
  }
}

.flow {
  .flow-chapter {
    display: flex;
    gap: 24px;
    align-items: flex-end;
    margin-bottom: 48px;

    .flow-title {
      font-size: 20px;
      width: 200px;
      text-align: right;
      color: $label-1;
      padding-bottom: 8px;
    }
  }

  p {
    margin: 0;
  }
}

@media (max-width: 992px) {
  .flow {
    .flow-chapter {
      display: grid;
      gap: 12px;

      .flow-title {
        width: auto;
        text-align: left;
      }
    }
  }
  #content {
    .info-md {
      margin: auto;
    }
  }
}
</style>