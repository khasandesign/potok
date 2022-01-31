<template>
  <div>
    <Head>
      <title>{{!search ? 'Поиск...' : search}}</title>
    </Head>
    <div class="container">
      <section id="search">
        <div class="search-wrap">
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
          <div class="suggestions">
            <v-button href="/profile" size="xs" variant="secondary" to="/profile">Мои потоки</v-button>
            <v-button size="xs" variant="secondary" icon="search" @click="setSearch" v-for="(suggestion, si) in suggestions" :key="si">
              {{ suggestion }}</v-button>
          </div>
        </div>
        <div class="skeleton" ref="skeleton">
          <div class="row" :class="this.flows.length <= 3 ? 'justify-content-center' : ''">
            <v-flow-card v-skeleton></v-flow-card>
            <v-flow-card v-skeleton></v-flow-card>
            <v-flow-card v-skeleton></v-flow-card>
            <v-flow-card v-skeleton></v-flow-card>
          </div>
        </div>
        <div class="results" ref="results" v-show="flows">
          <div class="row" :class="this.flows.length <= 3 ? 'justify-content-center' : ''">
            <v-flow-card v-for="flow in flows" :key="flow.id" :flow="flow"></v-flow-card>
          </div>
        </div>
        <div class="not-found" ref="notFound" v-show="notFound">
          <p class="par-2 italic">Ничего не найдено...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      timer: undefined,
      loading: false,
      notFound: false,
      suggestions: ['Интерфейсы', 'Front-end'],
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
      ],
    }
  },
  watch: {
    search: function (val) {
      this.notFound = false

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
     * Automatically fill the search query
     */
    setSearch(e) {
      this.search = e.target.closest('.btn').innerText
      this.$refs.search.focus()
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
      // **Do if/else on respond and display results, change msg

      this.loadingSearch()

      // Show results
      this.loading = setTimeout(() => {
        this.showResult()
      }, 1000) // **Remove this timer, it just simulate loading
    },

    /**
     * Hide skeleton loading and show search results with changing the msg
     */
    showResult() {
      if (this.flows.length) {
        this.$refs.skeleton.classList.remove('show-results')
        this.$refs.skeleton.classList.add('hide-results')
        this.$refs.results.classList.add('show-results')

        /*
        Imitate suggestions change, grab them from the db in user's interest column
        Interest will be all over collected according to user's profession and saved flows
        You can add this functionality later, now just keep going with regular suggestions
         */
        this.suggestions = ['UI/UX', 'Веб-дизайн']
      } else {
        this.setNotFound()
      }
    },

    /**
     * Clear search result and search query parametr
     */
    clearResult() {
      this.search = ''

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
      this.$refs.results.classList.remove('show-results')
      this.$refs.skeleton.classList.remove('hide-results')
      this.$refs.skeleton.classList.add('show-results')
    },

    /**
     * Apply not found msg
     */
    setNotFound() {
      this.$refs.skeleton.classList.remove('show-results')
      this.$refs.skeleton.classList.add('hide-results')

      this.notFound = true
    },

    /**
     * Get random message from funny success messages
     */
    getSuccessMsg() {
      let random = Math.floor(Math.random() * this.successMsg.length)
      return this.successMsg[random]
    }
  },
  mounted() {
    this.getQuery()
  }
}
</script>

<style lang="scss" scoped>
#search {
  text-align: center;
  margin-top: 48px;
  min-height: 80vh;

  .search-wrap {
    margin-bottom: 32px;

    .search-field {
      position: relative;

      input {
        text-align: center;
        height: 64px;
      }

      .clear-search {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }

    .suggestions {
      >* {
        margin-bottom: 8px;
        margin-right: 8px;
      }
    }
  }
}

.skeleton {
  transition: 0.5s;
  opacity: 0;
  height: 0;
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

.results {
  transition: 0.5s;
  opacity: 0;
}

.not-found {
  text-align: center;
  padding: 200px 0;
  position: relative;
  z-index: 2;

  p {
    opacity: 0.4;
  }
}
</style>