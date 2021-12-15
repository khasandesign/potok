import { createStore } from "vuex";

const store = createStore({
  state: {
    error: {},
    context: {},
  },
  mutations: {
    refreshError(state) {
      state.error = {}
    },
    throwError(state, errorObj) {
      let error = errorObj

      /**
       * Get report info
       */
      fetch('https://api.ipregistry.co/?key=r8qpd5ybu582t7bs')
          .then(function (response) {
            return response.json();
          })
          .then(function (payload) {
            error.__country = payload.location.country.name
          });

      /**
       * Check if error is 40*
       */
      if (Math.floor(error.status / 100) === 4) {
        // Prepare some external data
        error.__name = 'Страница не найдена'
        error.__message = 'Этой страницы больше нет, либо она перемещена.'
        error.__group = 400

        state.error = error
      }

      /**
       * Check if error is 50*
       */
      if (Math.floor(error.status / 100) === 5) {
        // Prepare some external data
        error.__name = 'Ошибка сервера'
        error.__message = 'Мы уже работаем над этим, скоро все заработает.'
        error.__group = 500

        state.error = error
      }
    },
    contextmenu(state, context) {
      state.context.name = context.name
      state.context.routes = context.routes
    },
    clearContextmenu(state) {
      state.context = {}
    }
  },
  actions: {},
  modules: {},
});

export default store