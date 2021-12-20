export default {
    methods: {
        /**
         * Return all cookies
         * @returns {{}}
         */
        getCookie() {
            return document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        }
    }
}