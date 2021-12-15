export default {
    methods: {
        getCookie() {
            var cookie = document.cookie
                .split(';')
                .map(cookie => cookie.split('='))
                .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

            return cookie
        }
    }
}