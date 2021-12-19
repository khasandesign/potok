export default {
    // data() {
    //    return {
    //        mainFavicon: ''
    //    }
    // },
    methods: {
        changeFavicon(fav) {
            const favicon = document.getElementById("favicon")
            // this.mainFavicon = favicon.href
            favicon.href = require(`@/assets/images/` + fav)
        }
    }
}