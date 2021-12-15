export default {
    methods: {
        httpException(errorObj, status = null) {
            let error = errorObj
            if (!errorObj && status) {
                error = {}
                error.status = status
            }

            /**
             * Check if error is 40*
             */
            if (Math.floor(error.status / 100) === 4) {
                // Prepare some external data
                error.__name = 'Страница не найдена'
                error.__message = 'Этой страницы больше нет, либо она перемещена.'

                this.commitError(error)
            }

            /**
             * Check if error is 50*
             */
            if (Math.floor(error.status / 100) === 5) {
                // Prepare some external data
                error.__name = 'Страница не найдена'
                error.__message = 'Этой страницы больше нет, либо она перемещена.'

                this.commitError(error)
            }

            /**
             * httpException debug
             */
            if (errorObj && status) {
                console.error('You can not pass error and status in httpException function')
            }
        },
        commitError(error) {
            this.$store.commit('throwError', error)
        }
    }
}