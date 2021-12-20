export default {
    methods: {
        /**
         * Change favicon of the website
         * @param fav
         */
        changeFavicon(fav) {
            const favicon = document.getElementById("favicon")
            favicon.href = require(`@/assets/images/` + fav)
        }
    }
}