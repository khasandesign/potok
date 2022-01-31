export default {
    methods: {
        /**
         * Save configuration of the flow to local storage
         * @param key
         * @param prop
         * @param value
         */
        setConfig(key, prop, value) {
            let config = {}

            // Check if configuration already exist
            if (localStorage.getItem(key)) {
                config = JSON.parse(localStorage.getItem(key))
            }

            // Build configuration obj
            config[prop] = value

            // Rewrite configuration
            localStorage.setItem(key, JSON.stringify(config))
        },
    }
}