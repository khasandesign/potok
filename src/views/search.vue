<template>
  <div>
    <Head>
      <title>{{!search ? 'Поиск...' : search}}</title>
    </Head>
    <section id="search">
      <div class="container">
        <div class="col-md-9 offset-md-1 search-wrap">
          <div class="search-field">
            <input
                type="search"
                v-model="search"
                maxlength="1000"
                class="h3 text-block-input"
                placeholder="Поиск..."
                ref="search"
                v-focus
            >
            <v-button class="clear-search" size="lg" icon="close" iconSize="36" v-show="search" @click="clearResult"></v-button>
          </div>
          <div class="col-lg-4 col-md-6">
            <p class="result-info par-2 italic" :class="message_class" v-html="message"></p>
          </div>
        </div>
      </div>
    </section>
    <section id="result">
      <div class="container">
        <div class="medium-wrap">
          <div class="skeleton" ref="skeleton">
            <div class="row">
              <v-flow-card v-skeleton></v-flow-card>
              <v-flow-card v-skeleton></v-flow-card>
              <v-flow-card v-skeleton></v-flow-card>
            </div>
            <div class="row">
              <v-flow-card v-skeleton></v-flow-card>
              <v-flow-card v-skeleton></v-flow-card>
              <v-flow-card v-skeleton></v-flow-card>
            </div>
          </div>
          <div class="results" ref="results">
            <div class="row">
              <v-flow-card v-for="flow in flows" :key="flow.id" :flow="flow"></v-flow-card>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      message: 'Поиск среди потоков, имён авторов, сфер, профессий и тд.',
      message_class: 'label-6',
      timer: undefined,
      loading: false,
      flows: [ // This is just mock data, btw api crops data, not vue
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
  watch: {
    search: function (val) {
      if (val) {
        this.searchTyping()
      } else {
        clearTimeout(this.loading)
        this.clearResult()
      }
    }
  },
  methods: {
    /**
     * Get search query from GET and call searchTyping (JSDoc: Countdown logic for requesting the database)
     */
    getQuery() {
      if (this.$route.query.q) {
        this.search = this.$route.query.q
        this.searchTyping()
      }
    },

    /**
     * Countdown logic for requesting the database
     */
    searchTyping() {
      clearTimeout(this.timer)

      // Editing url
      this.$router.push({path: 'search', query: {q: this.search}})

      this.timer = setTimeout(() => {
        if (this.search) {
          this.sendSearch()
        } else {
          this.clearResult()
        }
      }, 400)
    },

    /**
     * Send request to search endpoint API
     */
    sendSearch() {
      // ** -- temporary comment
      // **Do request to db here
      // **Do if/else on respond and display results, change message

      this.loadingSearch()

      // Show results
      this.loading = setTimeout(() => {
        this.showResult()
      }, 1000) // **Remove this timer, it just simulate loading
    },

    /**
     * Hide skeleton loading and show search results with changing the message
     */
    showResult() {
      this.$refs.skeleton.classList.remove('show-results')
      this.$refs.skeleton.classList.add('hide-results')

      this.message_class = 'label-1'
      this.message = 'Мы нашли 5 потоков по вашему запросу, Приятных потоков!'
      this.$refs.results.classList.add('show-results')
    },

    /**
     * Clear search result and search query parametr
     */
    clearResult() {
      this.search = ''
      this.message_class = 'label-6'
      this.message = 'Поиск среди потоков, имён авторов, сфер, профессий и тд.'

      let query = Object.assign({}, this.$route.query);
      delete query.q
      this.$router.replace({query});
      this.$refs.results.classList.remove('show-results')

      this.$refs.skeleton.classList.remove('show-results')
      this.$refs.skeleton.classList.add('hide-results')

      this.$refs.search.focus()
    },

    /**
     * Start loading animation with skeleton
     */
    loadingSearch() {
      // Show sekeleton
      this.message_class = 'label-6'
      this.message = 'Так, так, так.. <br> Ищем...'
      this.$refs.skeleton.classList.remove('hide-results')
      this.$refs.skeleton.classList.add('show-results')
    },

    /**
     * Apply not found message
     */
    notFound() {
      this.message_class = 'label-1'
      this.message = 'Ничего не найдено...'
      this.$refs.skeleton.classList.remove('show-results')
      this.$refs.skeleton.classList.add('hide-results')
    }
  },
  mounted() {
    this.getQuery()
  }
}
</script>

<style lang="scss" scoped>
#search {

  .search-wrap {
    margin-top: 48px;
    margin-bottom: 32px;

    .search-field {
      position: relative;

      input {
        height: 64px;
      }

      .clear-search {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }

  .result-info {
    margin-bottom: 36px;
    transition: 0.5s;
    -webkit-font-smoothing: antialiased;
  }
}

#result {
  .skeleton {
    transition: 0.5s;
    opacity: 0;
    height: 0;
  }

  .results {
    transition: 0.5s;
    opacity: 0;
  }

  .show-results {
    height: 0;
    animation-name: show-results;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes show-results {
    0% {
      opacity: 0;
      height: 0;
    }
    100% {
      opacity: 1;
      height: auto;
    }
  }

  .hide-results {
    height: 0;
    animation-name: hide-results;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes hide-results {
    0% {
      opacity: 1;
      height: auto;
    }
    100% {
      opacity: 0;
      height: 0;
    }
  }
}
</style>