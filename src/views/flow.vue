<template>
  <div>
    <Head>
      <title>{{ flow.title }}</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xxl-6 col-xl-8 col-lg-9 mx-auto">
          <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
          <h3 class="name">{{ flow.title }}</h3>
          <p class="desc par-1 italic">{{ flow.description }}</p>
          <v-art :art="flow.art"></v-art>
        </div>
      </section>
      <section id="content">
        <div class="row">
          <div class="col-xxl-8 col-xl-9 col-lg-12">
            <div class="flow" ref="flow">
              <div class="flow-chapter" :id="'chapter-' + chapter.id"
                   v-for="chapter in flow.content.chapters.slice().reverse()"
                   :key="chapter.id">
                <p class="chapter-title italic">{{ chapter.name }}</p>
                <div class="flow-items" ref="flowItems">
                  <v-flow-item
                      v-for="(link, li) in chapter.links.slice().reverse()"
                      :key="li"
                      :item="link"
                      :warn="warn"
                      :flowId="flow.id"
                      @mouseenter="checkWarn"
                      @click="lastChapter(chapter.id)"
                  ></v-flow-item>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 d-none d-xl-block">
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
                <div class="chapter-list" :class="!showChapters ? 'collapse_list' : ''" ref="chapterList">
                  <div class="overlay" v-show="!showChapters">
                    <div class="collapse-area" @click="collapseChapters">
                      <v-button size="xl" icon="arrow-down" variant="highlight"></v-button>
                    </div>
                  </div>
                  <a :class="'list-item item-chapter-' + chapter.id + (chi === 0 ? ' active' : '')"
                     v-for="(chapter, chi) in flow.content.chapters.slice().reverse()"
                     :key="chapter.id"
                     :data-chapter="'chapter-' + chapter.id"
                     @click="goChapter(chapter.id)">{{ chapter.name }}</a>
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
export default {
  data() { // This is just test flow object, remove it when connect DB
    return {
      flow: {
        id: 1,
        title: 'Оптимизация веб-сайтов под все браузеры',
        description: 'Не нужно собирать инфу по крупицам, теперь всё об оптимизации под браузеры здесь',
        public: true,
        art: 'art-8.svg',
        authorId: 1,
        fives: 1997,
        saves: 163,
        content: {
          link_count: 30,
          chapter_count: 5,
          chapters: [
            {
              id: 1,
              name: 'Вводные курсы',
              links: [
                {
                  name: 'История браузеров и почему никто не любит IE',
                  type: 1,
                  url: 'https://www.youtube.com/watch?v=uuzu2QxjMZ4'
                },
                {
                  name: 'Что такое кросс-браузерное тестирование',
                  type: 1,
                  url: 'https://developer.mozilla.org/ru/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction#%D1%87%D1%82%D0%BE_%D1%82%D0%B0%D0%BA%D0%BE%D0%B5_%D0%BA%D1%80%D0%BE%D1%81%D1%81-%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%BD%D0%BE%D0%B5_%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5'
                },
                {
                  name: 'Зачем нужно кросс-браузерное тестирование',
                  type: 1,
                  url: 'https://developer.mozilla.org/ru/docs/Learn/Tools_and_testing/Cross_browser_testing/Introduction#%D0%BF%D0%BE%D1%87%D0%B5%D0%BC%D1%83_%D0%B2%D0%BE%D0%B7%D0%BD%D0%B8%D0%BA%D0%B0%D1%8E%D1%82_%D0%BA%D1%80%D0%BE%D1%81%D1%81-%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B'
                },
              ]
            },
            {
              id: 2,
              name: 'Базовая теория',
              links: [
                {
                  name: 'Что такое движок браузера',
                  type: 1,
                  url: 'https://ru.wikipedia.org/wiki/%D0%91%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%BD%D1%8B%D0%B9_%D0%B4%D0%B2%D0%B8%D0%B6%D0%BE%D0%BA'
                },
                {
                  name: 'Почему не нужно изучать все браузеры',
                  type: 1,
                  url: 'https://youtu.be/xFZWHLjNXdI?t=24'
                },
                {
                  name: 'Движок Blink',
                  type: 1,
                  url: 'https://ru.wikipedia.org/wiki/Blink_(%D0%B4%D0%B2%D0%B8%D0%B6%D0%BE%D0%BA)'
                },
                {
                  name: 'Движок Gecko',
                  type: 1,
                  url: 'https://ru.wikipedia.org/wiki/Gecko'
                },
                {
                  name: 'Движок WebKit',
                  type: 1,
                  url: 'https://ru.wikipedia.org/wiki/WebKit'
                },
                {
                  name: 'Движок KHTML',
                  type: 1,
                  url: 'https://ru.wikipedia.org/wiki/KHTML'
                },
                {
                  name: 'Что такое User Agent',
                  type: 1,
                  url: 'https://developer.mozilla.org/ru/docs/Web/HTTP/Headers/User-Agent'
                },
                {
                  name: 'Разработка под мобильные браузеры',
                  type: 1,
                  url: 'https://developer.mozilla.org/ru/docs/Web/Guide/mobile'
                },
                {
                  name: 'Кросс-браузерная верстка',
                  type: 1,
                  url: 'https://developer.mozilla.org/ru/docs/Web/Guide/mobile#%D0%BA%D1%80%D0%BE%D1%81%D1%81-%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%BD%D0%B0%D1%8F_%D0%B2%D1%91%D1%80%D1%81%D1%82%D0%BA%D0%B0'
                },
              ]
            },
            {
              id: 3,
              name: 'Базовые инструменты',
              links: [
                {
                  name: 'Chrome инструмент User Agent',
                  type: 1,
                  url: 'https://chromeum.ru/faq/how-to-change-user-agent-in-google-chrome'
                },
                {
                  name: 'Использовать только смену User Agent?',
                  type: 1,
                  url: 'https://www.youtube.com/watch?v=xFZWHLjNXdI&t=349s'
                },
                {
                  name: 'Сервис Browserling',
                  type: 1,
                  url: 'https://www.browserling.com/'
                },
                {
                  name: 'Расширение Browserling',
                  type: 1,
                  url: 'https://chrome.google.com/webstore/detail/browserling-cross-browser/chfdigebbepdmeelcfiefkklfldmmgld?hl=en-US'
                },
                {
                  name: 'Сервис CanIUse',
                  type: 1,
                  url: 'https://caniuse.com/'
                },
                {
                  name: 'Сервис StatCounter',
                  type: 1,
                  url: 'https://gs.statcounter.com/'
                },
                {
                  name: 'Карта использования браузеров',
                  type: 1,
                  url: 'https://gs.statcounter.com/#all-browser-ww-monthly-201402-201402-map'
                },
              ]
            },
            {
              id: 4,
              name: 'Базовое тестирование',
              links: [
                {
                  name: 'Этапы кросс-браузерного тестирования',
                  type: 1,
                  url: 'https://software-testing.ru/library/testing/other-testing/2572-getting-started-with-cross-browser-testing'
                },
                {
                  name: 'Какие браузеры поддерживать и какой версии',
                  type: 1,
                  url: 'https://qna.habr.com/q/551750#answer_item_1254742'
                },
                {
                  name: 'Таблица использования версий браузеров',
                  type: 1,
                  url: 'https://caniuse.com/usage-table'
                },
                {
                  name: 'Как построить матрицу поддержки браузеров',
                  type: 1,
                  url: 'https://rightsaidjames.com/2017/08/building-browser-matrix/'
                },
                {
                  name: 'Пример реального базового тестирования',
                  type: 1,
                  url: 'https://www.youtube.com/watch?v=ANyRXCEcBUM'
                },
              ]
            },
            {
              id: 5,
              name: 'Базовый кодинг',
              links: [
                {
                  name: 'Обнаружение информации о браузере',
                  type: 1,
                  url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent'
                },
                {
                  name: 'Префиксы css',
                  type: 1,
                  url: 'https://itchief.ru/html-and-css/vendor-prefixes'
                },
                {
                  name: 'Полифилы js',
                  type: 1,
                  url: 'https://developer.mozilla.org/ru/docs/Glossary/Polyfill'
                },
                {
                  name: 'Примеры полифилов',
                  type: 1,
                  url: 'https://webknowledge.ru/chto-takoe-polyfill/#%D0%9D%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE_%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D0%BE%D0%B2'
                },
                {
                  name: 'Автопрефиксер',
                  type: 1,
                  url: 'https://habr.com/ru/company/evilmartians/blog/176909/'
                },
                {
                  name: 'Пример неподдержки браузера',
                  type: 1,
                  url: 'https://i.imgur.com/InPbvBG.jpeg'
                },
                {
                  name: 'Практики хорошего кода',
                  type: 1,
                  url: 'https://www.internet-technologies.ru/articles/aktualnye-sovety-po-kross-brauzernoy-verstke.html'
                },
              ]
            },
          ]
        },
      },
      fiveTimer: null,
      fives: 0,
      saved: false,
      showChapters: false,
      config: {},
      warn: true,
      chapterObserver: null,
      observeTop: false,
      navScroll: false
    }
  },
  methods: {
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
        this.flow.fives++
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

      // Vars
      let offset = el.getBoundingClientRect(),
          start = offset.top + document.documentElement.scrollTop,
          defaultStart = Number(el.getAttribute('data-top')),
          flowBottom = document.body.clientHeight - this.$refs.flow.clientHeight - this.$refs.flow.offsetTop,
          elBottom = document.body.clientHeight - document.documentElement.scrollTop - el.clientHeight,
          inheritWidth = el.clientWidth

      // Save origin top cords
      if (!el.getAttribute('data-top')) {
        el.setAttribute('data-top', start)
        defaultStart = Number(el.getAttribute('data-top'))
      }

      // Save origin top cords
      if (!el.getAttribute('data-width')) {
        el.setAttribute('data-width', el.clientWidth)
        inheritWidth = Number(el.getAttribute('data-width'))
      }

      // Check if it scrolled max bottom
      if (elBottom <= flowBottom) {
        el.style.position = 'absolute'
        el.style.top = this.$refs.flow.clientHeight - el.clientHeight + 'px'
        return
      } else {
        // Nope, keep it fixed
        if (document.documentElement.scrollTop > defaultStart) {
          el.style.position = 'fixed'
          el.style.width = inheritWidth + 'px'
          el.style.top = 0
          return
        }
      }

      // Check if it hits origin top cords
      if (start < defaultStart) {
        el.style.position = 'relative'
      }
    },

    /**
     * Scroll to chapter and highlight it
     * @param id
     */
    goChapter(id) {
      let chapter = document.getElementById('chapter-' + id)
      this.navScroll = true

      chapter.scrollIntoView({behavior: 'smooth', block: 'center'})

      chapter.animate([
        {backgroundColor: 'transparent'},
        {backgroundColor: 'rgba(0, 0, 0, .03)', offset: 0.2},
        {backgroundColor: 'rgba(0, 0, 0, .03)', offset: 0.8},
        {backgroundColor: 'transparent'},
      ], {
        duration: 800,
      }).onfinish = () => {
        this.navScroll = false
      }

      let prevActive = document.querySelector('.list-item.active')
      if (prevActive) {
        prevActive.classList.remove('active')
      }
      document.querySelector('.item-chapter-' + id).classList.add('active')
    },

    /**
     * Chapters entrance observer
     */
    observeChapters() {
      const options = {
        rootMargin: '0px 0px',
        threshold: 1,
      }
      this.chapterObserver = new IntersectionObserver(this.chapterObserverHandler, options)

      // Observe each section
      const sections = document.querySelectorAll('.flow-chapter')
      sections.forEach(section => {
        this.chapterObserver.observe(section)
      })
    },

    /**
     * Execution method when observer a chapter
     * @param entries
     */
    chapterObserverHandler(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          let id = entry.target.id

          // Switch active class on chapter-nav
          if (!this.navScroll) {
            let prevActive = document.querySelector('.list-item.active')
            if (prevActive) {
              prevActive.classList.remove('active')
            }
            document.querySelector('[data-chapter= ' + id + ']').classList.add('active')
          }
        }
      }
    },

    /**
     * Get chapter which hits top and assign active class to chapter nav
     */
    // getAchievedChapter() {
    //   let chapters = document.querySelectorAll('.flow-chapter')
    //   chapters.forEach((chapter) => {
    //     let top = chapter.getBoundingClientRect().top,
    //         hash = chapter.getAttribute('id')
    //
    //     if (top <= 0) {
    //       let prevActive = document.querySelector('.list-item.active')
    //       if (prevActive) {
    //         prevActive.classList.remove('active')
    //       }
    //       document.querySelector('[data-chapter= ' + hash + ']').classList.add('active')
    //     }
    //   })
    // },

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
     * Refresh config according to the localStorage
     */
    refreshConfig() {
      this.config = JSON.parse(localStorage.getItem(this.flow.id))
    },

    /**
     * Check does a user trust to this flow's links
     */
    checkWarn() {
      // trust_links
      if (this.warn) {
        this.warn = !this.getConfig(this.flow.id, 'trust_links')
      }
    },

    /**
     * Execute properties from flow's config and apply them
     */
    rewriteProps() {
      this.refreshConfig()

      // show_chapters
      this.showChapters = this.getConfig(this.flow.id, 'show_chapters') || false

      // lastChapter
      if (this.getConfig(this.flow.id, 'last_chapter')) {
        this.$nextTick(() => {
          this.goChapter(this.config['last_chapter'])
          this.setConfig(this.flow.id, 'last_chapter', false)
        })
      }
    },

    /**
     * Save last chapter by last visited link
     * @param id
     */
    lastChapter(id) {
      this.setConfig(this.flow.id, 'last_chapter', id)
    },
  },
  mounted() {
    // Execute properties from flow's config and apply them
    this.rewriteProps()

    // Index items
    this.indexItems()

    // Stick chapters to top
    if (window.innerWidth > 1200) {
      this.observeChapters()

      let vm = this
      document.addEventListener('scroll', function () {
        vm.stickToTop(vm.$refs.chapterNav)
      })
    }
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

  .name, .desc {
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
}

.action-group {
  display: flex;
  gap: 0;
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
    text-decoration: none;
    color: $label-1;

    .label {
      white-space: nowrap;
      min-width: 3ch;
    }
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
        padding: 2px 0;
        overflow-y: scroll;
        max-height: 80vh;

        > .list-item {
          @extend .par-4;
          @extend .italic;
          display: block;
          transition: 0.1s;
          gap: 6px;
          align-items: center;
          cursor: pointer;
          padding: 6px 0;
          margin: 0 2px;
          color: $label-1;
          text-decoration: none;
          -webkit-font-smoothing: antialiased;

          &:focus {
            color: $accent;
          }

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
}

.flow {
  .flow-chapter {
    display: flex;
    gap: 24px;
    align-items: flex-end;
    padding: 24px 0;
    border-radius: 8px;
    word-break: break-word;

    &:first-child {
      padding-top: 0;
    }

    .chapter-title {
      font-size: 20px;
      width: 200px;
      min-width: 200px;
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

@media (max-width: 1366px) {
  .flow {
    margin-left: -50px;

    .flow-chapter {

      .chapter-title {
        width: 150px;
        min-width: 150px;
        font-size: 19px;
      }
    }
  }
}

@media (max-width: 1280px) {
  #info {
    margin-top: 36px;

    .name {
      padding: 0 16px;
      margin-bottom: 16px;
    }
  }
  .flow {
    .flow-chapter {
      .chapter-title {
        width: 180px;
        min-width: 180px;
      }
    }
  }
}

@media (max-width: 1200px) {
  .flow {
    margin-left: 0;

    #info {
      .name {
        margin-bottom: 12px;
      }
    }
  }
}

@media (max-width: 992px) {
  .flow {
    .flow-chapter {
      display: grid;
      gap: 12px;

      .chapter-title {
        width: 30%;
        text-align: left;
      }

      .flow-items {
        margin-left: 50px;
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