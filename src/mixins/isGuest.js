export default {
    methods: {
        /**
         * Check if user is already authorized
         */
        isGuest() {
            return this.$store.state.authorized !== true;
        }
    }
}