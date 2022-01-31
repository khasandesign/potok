export default {
    methods: {
        /**
         * Return all cookies
         * @returns {{}}
         */
        getCookies() {
            return document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        },

        /**
         * Return a specific cookie
         * @param cname
         * @returns {boolean|*}
         */
        getCookie(cname) {
            let cookies = this.getCookies()
            if (cookies[cname]) {
                return cookies[cname]
            } else {
                return false
            }
        }
    }
}