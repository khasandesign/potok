import {createStore} from "vuex";
import browser from "./browser";

const store = createStore({
    state: {
        error: {},
        context: {},
        authorized: !!localStorage.getItem('token'),
    },
    mutations: {
        /**
         * Clear state about error
         * @param state
         */
        refreshError(state) {
            state.error = {}
        },

        /**
         * Throw error and handle it with status and meta info
         * @param state
         * @param errorObj
         */
        throwError(state, errorObj) {
            let error = errorObj

            // Get user's meta info
            fetch('https://api.ipregistry.co/?key=r8qpd5ybu582t7bs')
                .then(function (response) {
                    return response.json();
                })
                .then(function (payload) {
                    error.__country = payload.location.country.name
                    console.log(payload.location.country)
                });

            // Check if error is 40*
            if (Math.floor(error.status / 100) === 4) {
                // Prepare some external data
                error.__name = 'Страница не найдена'
                error.__message = 'Этой страницы больше нет, либо она перемещена.'
                error.__group = 400

                state.error = error
            }

            // Check if error is 50*
            if (Math.floor(error.status / 100) === 5) {
                // Prepare some external data
                error.__name = 'Ошибка сервера'
                error.__message = 'Мы уже работаем над этим, скоро все заработает.'
                error.__group = 500

                state.error = error
            }
        },

        /**
         * Set info about context menu to use it in vContextmenu component
         * @param state
         * @param context
         */
        contextmenu(state, context) {
            state.context = context
        },

        /**
         * Clear info about context menu
         * @param state
         */
        clearContextmenu(state) {
            state.context = {}
        },

        contextAction(state, action) {
            state.contextAction = action
        },

        /**
         * Update authorized property
         * @param state
         * @param auth
         */
        signIn(state, auth) {
            state.authorized = auth
        },
    },
    actions: {},
    modules: {
        browser: browser
    },
});

export default store