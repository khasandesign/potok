<template>
  <div>
    <Head>
      <title>{{!search ? 'Поиск...' : search}}</title>
    </Head>
    <div class="container">
      <div class="medium-wrap">
        <section id="search">
          <div class="search form-group">
            <input
                type="search"
                ref="search"
                v-model="search"
                maxlength="1000"
                class="h3 text-block-input"
                placeholder="Поиск..."
                v-focus
            >
          </div>
          <div class="col-lg-3 col-md-6">
            <p class="result-info par-2 italic" :class="message_class" v-html="message"></p>
          </div>
          <div class="skeleton" ref="skeleton">
            <div class="row">
              <v-flow-card
                  v-skeleton

                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
              <v-flow-card
                  v-skeleton

                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
              <v-flow-card
                  v-skeleton

                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
            </div>
            <div class="row">
              <v-flow-card
                  v-skeleton

                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
              <v-flow-card
                  v-skeleton

                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
              <v-flow-card
                  v-skeleton

                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
            </div>
          </div>
          <div class="results" ref="results">
            <div class="row">
              <v-flow-card
                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
              <v-flow-card
                  cripSrc="profile-4.jpg"
                  cripName="Baha T."
                  title="Создания стильных интерфейсов"
                  annotation="Минимализм – это не белый фон и текст на нём"
                  art="art-5.svg"
              ></v-flow-card>
              <v-flow-card
                  cripSrc="profile.jpg"
                  cripName="Khasan Sh."
                  title="Создание онлайн конструктора сайтов"
                  annotation="Выучив весь этот материал я сделал свой конструктор"
                  art="art-6.svg"
              ></v-flow-card>
            </div>
            <div class="row">
              <v-flow-card
                  cripSrc="profile-3.jpg"
                  cripName="Komol K."
                  title="Полное изучение всех фич Figma"
                  annotation="Figma имеет очень обширный функционал для дизайна"
                  art="art-4.svg"
              ></v-flow-card>
              <v-flow-card
                  cripSrc="profile-4.jpg"
                  cripName="Baha T."
                  title="Создания стильных интерфейсов"
                  annotation="Минимализм – это не белый фон и текст на нём"
                  art="art-5.svg"
              ></v-flow-card>
            </div>
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
      search: '',
      message: 'Поиск среди потоков, имён авторов, сфер, профессий и тд.',
      message_class: 'label-5',
      timer: undefined,
    }
  },
  watch: {
    search: function () {
      this.searchTyping()
    }
  },
  methods: {
    getParam() {
      if (this.$route.query.q) {
        this.search = this.$route.query.q
        this.searchTyping()
      }
    },
    searchTyping() {
      clearTimeout(this.timer)

      // Editing url
      this.$router.push({ path: 'search', query: { q: this.search }})

      this.timer = setTimeout(() => {
        if (this.search) {
          this.sendSearch()
        } else {
          this.clearResults()
        }
      }, 400)
    },
    sendSearch() {
      // ** -- temporary comment
      // **Do request to db here
      // **Do if/else on respond and display results, change message

      this.loadingSearch()

      // Show results
      setTimeout(() => {
        this.showResults()
      }, 1000) // **Remove this timer, it just simulate loading
    },
    showResults() {
      this.$refs.skeleton.classList.remove('show-results')

      this.message_class = 'label-1'
      this.message = 'Мы нашли 5 потоков по вашему запросу, Приятных потоков!'
      this.$refs.results.classList.add('show-results')
    },
    clearResults() {
      this.message_class = 'label-5'
      this.message = 'Поиск среди потоков, имён авторов, сфер, профессий и тд.'

      let query = Object.assign({}, this.$route.query);
      delete query.q
      this.$router.replace({ query });
      this.$refs.results.classList.remove('show-results')
    },
    loadingSearch() {
      // Show sekeleton
      this.message_class = 'label-5'
      this.message = 'Так, так, так.. <br> Ищем...'
      this.$refs.skeleton.classList.add('show-results')
    },
    notFound() {
      this.message_class = 'label-1'
      this.message = 'Ничего не найдено...'
      this.$refs.skeleton.classList.remove('show-results')
    }
  },
  mounted() {
    this.getParam()
  }
}
</script>

<style lang="scss" scoped>
#search {
  min-height: 100vh;

  .search {
    margin-top: 48px;
    margin-bottom: 32px;

    input {
      height: 64px;
    }
  }

  .result-info {
    margin-bottom: 36px;
    transition: 0.5s;
  }

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
}
</style>