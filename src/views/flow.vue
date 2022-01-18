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
              <div class="flow-chapter" :id="'chapter-' + chapter.id" v-for="chapter in flow.content.chapters"
                   :key="chapter.id">
                <p class="flow-title italic">{{ chapter.name }}</p>
                <div class="flow-items" ref="flowItems">
                  <v-flow-item
                      v-for="(link, li) in chapter.links"
                      :key="li"
                      :item="link"
                      :warn="warn"
                      :flowId="flow.id"
                  ></v-flow-item>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="side-context">
              <div class="info-md" ref="infoMd">
                <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
                <p class="headline">{{ flow.title }}</p>
                <p class="par-4 italic">{{ flow.description }}</p>

                <div class="action-group">
                  <div class="action high-five" @click="highFive">
                    <v-icon name="not-highFive" size="32" click="highFive" area=".high-five"></v-icon>
                    <span class="label par-4 italic">{{ readableNum(this.flow.fives) }}</span>
                  </div>
                  <div class="action add-bookmark" @click="addBookmark">
                    <v-icon name="add-bookmark" size="32" click="done-bookmark" area=".add-bookmark"></v-icon>
                    <span class="label par-4 italic">{{ readableNum(this.flow.saves) }}</span>
                  </div>
                </div>
              </div>
              <div class="chapter-nav" ref="chapterNav">
                <p class="headline">Секции</p>
                <p class="par-3 italic">Есть 2 новые секции</p>
                <v-pattern></v-pattern>
                <div class="chapter-list" :class="boxChapters ? 'collapse_list' : ''" ref="chapterList">
                  <div class="overlay" v-show="boxChapters">
                    <div class="collapse-area" @click="collapseChapters">
                      <v-button size="xl" icon="arrow-down" variant="highlight"></v-button>
                    </div>
                  </div>
                  <p class="list-item" :class="chi === 0 ? 'active' : ''"
                     v-for="(chapter, chi) in flow.content.chapters" :key="chapter.id"
                     :data-chapter="'chapter-' + chapter.id"
                     @click="goChapter(chapter.id, $event)">{{ chapter.name }}</p>
                </div>
              </div>
            </div>
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
        fives: 2568,
        saves: 320,
        content: {
          link_count: 37,
          chapter_count: 9,
          chapters: [
            {
              id: 8,
              name: 'Продвинутый GitHub',
              links: [
                {
                  name: 'Красивое описание проекта в README.md',
                  type: 1,
                  url: 'https://bit.ly/3FqjBlE '
                },
                {
                  name: 'Что такое .md файлы',
                  type: 1,
                  url: 'https://www.online-convert.com/ru/file-format/md'
                },
                {
                  name: 'Работа с релизами и организация версий',
                  type: 1,
                  url: 'https://ru.stackoverflow.com/a/573773'
                },
              ]
            },
            {
              id: 7,
              name: 'Продвинутое окружение',
              links: [
                {
                  name: 'Список продвинутых псевдонимов для cli',
                  type: 1,
                  url: 'https://techblog.sdstudio.top/perevod/git-psevdonimy'
                },
                {
                  name: 'Команды осмотра и сравнения',
                  type: 1,
                  url: 'https://bit.ly/3FnQhw0'
                },
                {
                  name: 'Использование псевдонимов для команд git',
                  type: 1,
                  url: 'https://bit.ly/3En4191'
                },
              ]
            },
            {
              id: 6,
              name: 'Семантическое версионирование',
              links: [
                {
                  name: 'Теги и версионирование в Git',
                  type: 1,
                  url: 'https://bit.ly/3yTblb2'
                },
                {
                  name: 'Семантическое версионирование',
                  type: 1,
                  url: 'https://druki.ru/wiki/semver'
                },
              ]
            },
            {
              id: 5,
              name: 'Продвинутый Git',
              links: [
                {
                  name: 'Руководство по работе в команде',
                  type: 1,
                  url: 'https://www.blend4web.com/doc/ru/git_short_manual.html '
                },
                {
                  name: 'Стратегия ветвлений Feature-branch',
                  type: 1,
                  url: 'https://youtu.be/6BCOyrUobGc?t=91'
                },
                {
                  name: 'Стратегия ветвлений Centralized',
                  type: 1,
                  url: 'https://youtu.be/6BCOyrUobGc?t=19'
                },
                {
                  name: 'Управления ветвелниями',
                  type: 1,
                  url: 'https://bit.ly/33Rks0K'
                },
                {
                  name: 'Основы работы с ветвлениями',
                  type: 1,
                  url: 'https://bit.ly/3pjP0jO'
                },
                {
                  name: 'Что такое ветвление',
                  type: 1,
                  url: 'https://bit.ly/3srgztz'
                },
              ]
            },
            {
              id: 4,
              name: 'Базовая практика',
              links: [
                {
                  name: 'Изучить крупный репозиторий',
                  type: 1,
                  url: 'https://github.com/vuejs/vue '
                },
                {
                  name: 'Изучить средний репозиторий',
                  type: 1,
                  url: 'https://github.com/fengyuanchen/compressorjs'
                },
                {
                  name: 'Изучить маленький репозиторий',
                  type: 1,
                  url: 'https://github.com/graingert/WOW '
                },
                {
                  name: 'Задания по init, config, status, add, commit',
                  type: 1,
                  url: 'https://smartiqa.ru/courses/git/answer-key#add-commit'
                },
              ]
            },
            {
              id: 3,
              name: 'Базовый GitHub',
              links: [
                {
                  name: 'Что такое GitHub',
                  type: 1,
                  url: 'https://ru.wikipedia.org/wiki/GitHub'
                },
                {
                  name: 'Работа с репозиториями в Github',
                  type: 1,
                  url: 'https://bit.ly/3ejkf8A'
                },
                {
                  name: 'Основные понятия лицензий и авторского права',
                  type: 1,
                  url: 'https://habr.com/ru/post/243091/'
                },
                {
                  name: 'Работа с GitHub Pages',
                  type: 1,
                  url: 'https://youtu.be/84cyW2R9WWo?t=346'
                },
              ]
            },
            {
              id: 2,
              name: 'Базовые основы',
              links: [
                {
                  name: 'Что такое Git',
                  type: 1,
                  url: 'https://bit.ly/3Jc3OsP'
                },
                {
                  name: 'История происхождения Git',
                  type: 1,
                  url: 'https://bit.ly/3J80C1v'
                },
                {
                  name: 'Установка Git',
                  type: 1,
                  url: 'https://git-scm.com/downloads'
                },
                {
                  name: 'Настройка профиля и окружения',
                  type: 1,
                  url: 'https://bit.ly/3plnra7'
                },
                {
                  name: 'В чем разница между Git и Github',
                  type: 1,
                  url: 'https://tproger.ru/translations/difference-between-git-and-github/#part2'
                },
                {
                  name: 'Создание репозиториев',
                  type: 1,
                  url: 'https://bit.ly/3EpiIIu'
                },
                {
                  name: 'Работа с удаленными репозиториями',
                  type: 1,
                  url: 'https://bit.ly/3yRqj1j'
                },
                {
                  name: 'Просмотр истории коммитов',
                  type: 1,
                  url: 'https://bit.ly/3H0zj76'
                },
                {
                  name: 'Операции отмены',
                  type: 1,
                  url: 'https://bit.ly/3mnNlrx '
                },
                {
                  name: 'Основные команды Git',
                  type: 1,
                  url: 'https://bit.ly/3FlCqGo'
                },
              ]
            },
            {
              id: 1,
              name: 'Вводные курсы',
              links: [
                {
                  name: 'Вводный курс по Git и GitHub',
                  type: 1,
                  url: 'https://www.youtube.com/watch?v=zZBiln_2FhM'
                },
                {
                  name: 'Доп. теория и примеры работы',
                  type: 1,
                  url: 'https://www.youtube.com/watch?v=SEvR78OhGtw'
                },
              ]
            },
          ],
        },
      },
      fiveTimer: null,
      fives: 0,
      saved: false,
      boxChapters: false,
      config: {}
    }
  },
  mixins: [getCookie],
  methods: {
    /**
     * Check if user trust the flow
     */
    checkTrust() {
      let cookies = this.getCookie()
      this.warn = !cookies['trust_' + this.flow.id];
    },

    /**
     * High five action logic
     */
    highFive() {
      clearTimeout(this.fiveTimer)

      // Vars
      let action = document.querySelector('.high-five'),
          label = action.querySelector('.label')

      // Check max
      if (this.fives < this.flow.content.link_count) {
        this.fives++
        this.flow.fives += this.fives
      }

      // Label animation
      label.innerHTML = '+' + this.fives
      label.animate([
        {
          // form
          transform: 'scale(0.5)',
        },
        {
          // to
          transform: 'scale(1)',
        }
      ], 150)

      // Hide new fives
      this.fiveTimer = setTimeout(() => {
        label.innerHTML = this.readableNum(this.flow.fives)

        // ... Save to db
      }, 1000)
    },

    /**
     * Convert number to readable form
     * @param num {number}
     * @returns {number}
     */
    readableNum(num) {
      let readableNum = num
      if (num > 1000) {
        readableNum = Math.floor(num / 1000) + ' тыс.'
      }
      if (num > 1000000) {
        readableNum = Math.floor(num / 1000000) + ' млн.'
      }

      return readableNum
    },

    /**
     * Save the flow to bookmarks
     */
    addBookmark() {
      if (!this.saved) {
        this.flow.saves++
        this.saved = true

        // Push notification
        this.pushNotification({
          title: 'Сохранено в закладки',
          description: '“' + this.flow.title.substring(0, 22) + '“ в закладках профиля',
          icon: 'done-bookmark'
        })

        // ... Do query to db to save to the user's bookmarks
      }
    },

    /**
     * Scroll to chapter and highlight it
     * @param id
     * @param e
     */
    goChapter(id, e) {
      let chapter = document.getElementById('chapter-' + id)

      chapter.scrollIntoView({behavior: 'smooth'})
      chapter.animate([
        {backgroundColor: 'transparent'},
        {backgroundColor: 'rgba(0, 0, 0, .02)'},
        {backgroundColor: 'rgba(0, 0, 0, .02)'},
        {backgroundColor: 'transparent'},
      ], {
        duration: 1500,
        easing: 'ease-out',
      })

      let prevActive = document.querySelector('.list-item.active')
      if (prevActive) {
        prevActive.classList.remove('active')
      }
      e.target.closest('.list-item').classList.add('active')
    },

    /**
     * Reindex items when adding a new one or adding a new chapter
     */
    indexItems() {
      this.$nextTick(() => {
        let listNode = document.querySelectorAll('.flow-item'),
            items = [].slice.call(listNode, 0).reverse()

        items.forEach(function (item, i) {
          item.querySelector('.item-number').innerHTML = '§ ' + (i + 1) + '.'
        })
      })
    },

    /**
     * Stick a side-context block to top on scrolling <br>
     * Note: You can only fix block in the parent container
     * @param el
     */
    stickToTop(el) { // In the future you can build mixin from it and add related el like flow here
      if (!el) {
        return false
      }

      let offset = el.getBoundingClientRect(),
          start = offset.top + document.documentElement.scrollTop,
          defaultStart = Number(el.getAttribute('data-top')),
          flowBottom = document.body.clientHeight - this.$refs.flow.clientHeight - this.$refs.flow.offsetTop,
          elBottom = document.body.clientHeight - document.documentElement.scrollTop - el.clientHeight

      if (!el.getAttribute('data-top')) {
        el.setAttribute('data-top', start)
        defaultStart = Number(el.getAttribute('data-top'))
      }

      if (elBottom <= flowBottom) {
        el.style.position = 'absolute'
        el.style.top = this.$refs.flow.clientHeight - el.clientHeight + 'px'
      } else {
        if (document.documentElement.scrollTop > defaultStart) {
          el.style.position = 'fixed'
          el.style.top = 0
        }
      }

      if (start < defaultStart) {
        el.style.position = 'relative'
      }
    },

    /**
     * Get chapter which hits top and assign active class to chapter nav
     */
    getAchievedChapter() {
      let chapters = document.querySelectorAll('.flow-chapter')
      chapters.forEach((chapter) => {
        let top = chapter.getBoundingClientRect().top,
            hash = chapter.getAttribute('id')

        if (top <= 0) {
          let prevActive = document.querySelector('.list-item.active')
          if (prevActive) {
            prevActive.classList.remove('active')
          }
          document.querySelector('[data-chapter= ' + hash + ']').classList.add('active')
        }
      })
    },

    /**
     * Show hidden chapters
     */
    collapseChapters() {
      let chapterList = this.$refs.chapterList
      chapterList.style.maxHeight = 'initial'
      chapterList.querySelector('.overlay').style.display = 'none'

      // Set config
      this.setConfig(this.flow.id, 'show_chapters', true)
    },

    /**
     * Save configuration of the flow to local storage
     * @param id
     * @param key
     * @param value
     */
    setConfig(id, key, value) {
      let config = {}

      // Check if configuration already exist
      if (localStorage.getItem(id)) {
        config = localStorage.getItem(id)
      }

      // Build configuration obj
      config[key] = value

      // Rewrite configuration
      localStorage.setItem(id, JSON.stringify(config))
    },

    /**
     * Check if obj contains a key
     * @param obj
     * @param key
     */
    hasProperty(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key)
    }
  },
  beforeMount() {
    // Get config obj
    this.config = JSON.parse(localStorage.getItem(this.flow.id))

    this.boxChapters = this.flow.content.chapter_count * 34 > window.innerHeight / 3

    // Set config obj
    if (this.config !== null) {
      if (this.hasProperty(this.config, 'show_chapters')) {
        if (this.config['show_chapters']) {
          this.boxChapters = false
        } else {
          this.boxChapters = true
        }
      }
    }

  },
  mounted() {
    this.checkTrust()
    this.trustCheck = setInterval(() => {
      if (this.warn && this.$route.name === 'flow') {
        this.checkTrust()
      } else {
        clearInterval(this.trustCheck)
      }
    }, 1000)

    // Index items
    this.indexItems()

    // Stick chapters to top
    let vm = this
    document.addEventListener('scroll', function () {
      vm.stickToTop(vm.$refs.chapterNav)
      vm.getAchievedChapter()
    })
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
  .side-context {
    margin-left: auto;
    position: relative;

    > div {
      max-width: 300px;
      background-color: $bg-primary;

      &:first-child {
        margin-top: 0;
      }

      &:not(:first-child) {
        border-top: 1px solid $gray-08;
      }
    }

    .info-md {
      text-align: center;
      padding: 24px 0 20px 0;

      .crip {
        margin-bottom: 20px;
      }
    }

    .chapter-nav {
      position: relative;
      padding: 32px 0;
      text-align: center;
      top: 0;
      width: 100%;
      height: fit-content;

      .headline {
        margin-bottom: 4px;
      }

      .par-3 {
        margin-bottom: 0;
      }

      .pattern {
        margin-bottom: 8px;
        margin-top: 14px;
      }

      .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, $bg-primary 0%, $bg-primary 10%, rgba($bg-primary, 0) 100%);
        display: flex;
        align-items: end;
        justify-content: center;
        pointer-events: none;

        .collapse-area {
          pointer-events: auto;
          position: absolute;
          width: 100%;
          height: 50%;
          cursor: s-resize;
          transition: 0.2s;
          display: flex;
          align-items: end;
          justify-content: center;
        }

        .btn {
          pointer-events: auto;

          &:hover {
            background: transparent;
          }
        }
      }

      .collapse_list {
        max-height: 33vh;
      }

      .chapter-list {
        position: relative;
        justify-content: center;
        overflow: hidden;

        > p {
          @extend .par-4;
          @extend .italic;
          display: block;
          width: 100%;
          transition: 0.1s;
          gap: 6px;
          align-items: center;
          cursor: pointer;
          margin-bottom: 0;
          padding: 6px 0;

          &:hover {
            color: $accent;
          }
        }

        .active {
          color: $accent;
        }

        .new {
          &::after {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: $accent;
            border-radius: 50%;
            margin-left: 6px;
          }
        }
      }
    }
  }


  .action-group {
    display: flex;
    gap: 0px;
    justify-content: center;
    padding-right: 8px;
    margin-top: 28px;

    .action {
      @extend .unselectable;
      @extend .anim-click-sm;
      display: flex;
      gap: 8px;
      align-items: center;
      padding: 8px;
      cursor: pointer;

      .label {
        white-space: nowrap;
        min-width: 3ch;
      }
    }
  }
}

.flow {
  .flow-chapter {
    display: flex;
    gap: 24px;
    align-items: flex-end;
    padding: 24px 0;
    border-radius: 8px;

    &:first-child {
      padding-top: 0;
    }

    .flow-title {
      font-size: 20px;
      width: 200px;
      text-align: right;
      color: $label-1;
      padding-bottom: 8px;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }
  }

  p {
    margin: 0;
  }
}

.highlight {
  animation: highlight 1s forwards;
  animation-delay: 0.2s;
  border-radius: 8px;
}

@keyframes highlight {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: $gray-08;
  }
  100% {
    background-color: transparent;
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
    .side-context {

      .info-md {
        margin: auto;
      }
    }
  }
}
</style>