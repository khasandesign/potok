export default {
    methods: {
        /**
         * Return item from localstorage or a certain property of this item
         * @param key
         * @param prop
         * @returns {any}
         */
        getConfig(key, prop = null) {
            let item = JSON.parse(localStorage.getItem(key))
            if (item !== null) {
                if (prop) {
                    if (Object.prototype.hasOwnProperty.call(item, prop)) {
                        return JSON.parse(localStorage.getItem(key))[prop]
                    }
                } else {
                    return JSON.parse(localStorage.getItem(key))
                }
            } else {
                return false
            }
        }
    }
}