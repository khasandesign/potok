export default {
    methods: {
        /**
         * Check if obj contains a key
         * @param obj
         * @param key
         */
        hasProperty(obj, key) {
            if (obj !== null) {
                return Object.prototype.hasOwnProperty.call(obj, key)
            }
        }
    }
}