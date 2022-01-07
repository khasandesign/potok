export default {
    data() {
      return {
          matcher: window.matchMedia('(prefers-color-scheme: dark)'),
          darkMode: false,
          fav: '',
          favDark: ''
      }
    },
    methods: {
        /**
         * Change favicon of the website
         * @param fav
         * @param favDark
         */
        changeFavicon(fav, favDark = false) {
            const favicon = document.getElementById("favicon")

            // Set fav paths to switch it later
            this.fav = fav
            this.favDark = favDark

            // Get current mode
            this.darkMode = this.matcher.matches

            // Set favicon
            if (favDark) {
                if (this.darkMode) {
                    favicon.href = require(`@/assets/images/` + favDark)
                } else {
                    favicon.href = require(`@/assets/images/` + fav)
                }
            } else {
                favicon.href = require(`@/assets/images/` + fav)
            }
        },
    },
    mounted() {
        // Listen to scheme mode switch
        let vm = this
        this.matcher.addEventListener('change', event => {
            vm.darkMode = event.matches
            vm.changeFavicon(this.fav, this.favDark)
        })
    }
}