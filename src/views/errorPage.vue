<template>
  <div>
    <Head>
      <title>#{{ error.status }}</title>
    </Head>

    <div class="container">
      <div class="error">
        <div class="col-lg-4 col-md-8 mx-auto">
          <v-crip :variant="error.__group === 500 ? 'red' : 'yellow'" @click="error_report_visible = !error_report_visible">
            #{{ error.status }}
          </v-crip>
          <h4>{{ error.__name }}</h4>
          <div class="message par-4 italic">{{ error.__message }}</div>
          <div class="suggestions">
            <v-button size="xs" variant="outline-dark" to="/">Главная страница</v-button>
            <v-button size="xs" variant="outline-dark" to="/profile">Мои потоки</v-button>
            <v-button size="xs" variant="outline-dark">Библиотека</v-button>
            <v-button size="xs" variant="outline-dark">Становление мидлом в PHP...</v-button>
          </div>
        </div>
      </div>
      <div class="col-lg-2 col-md-4 mx-auto" v-show="error_report_visible">
        <div class="error-report">
          <div class="report-items">
            <span class="report-item" v-for="(value, name) in error_report" :key="value"><span class="italic">{{ name }}</span>: {{ value }}</span>
            <span class="report-item action" @click="copyJsonReport()">Copy JSON</span>
            <span class="report-item action" @click="error_report_visible = false">Close</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-page',
  props: {
    error: Object
  },
  data() {
    return {
      error_report_visible: false,
      error_report: this.error
    }
  },
  methods: {
    /**
     * Copy meta info report in clipboard as JSON
     */
    copyJsonReport() {
      window.navigator.clipboard.writeText(JSON.stringify(this.error))
    },
  },
  watch: {
    $route() {
      this.$store.commit('refreshError', null, 404)
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  margin-top: 48px;

  .crip {
    margin-bottom: 16px;
  }

  .message {
    @extend .mx-auto;
    width: 60%;
  }

  h4 {
    margin-bottom: 4px;
  }

  .suggestions {
    margin-top: 32px;

    > * {
      margin-bottom: 8px;
      margin-right: 8px;
    }
  }
}

.error-report {
  margin-top: 64px;
}

.error-report {
  outline: 1px solid $gray-08;
  border-radius: 8px;
  overflow: hidden;

  * {
    @extend .mono;
    @extend .regular;
    font-size: 13px;
  }

  .report-item {
    background-color: $bg-primary;
    padding: 6px;
    display: block;

    &:not(:last-child) {
      border-bottom: 1px solid $gray-08;
    }
  }

  .report-item.action {
    background-color: $gray-03;
    text-decoration: underline;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      background-color: $gray-06;
    }

    &:active, &:focus {
      background-color: $gray-08;
    }
  }
}
</style>