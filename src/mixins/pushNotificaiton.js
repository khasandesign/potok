export default {
    methods: {
        /**
         * Emit push event to show a notification
         * @param obj
         */
        pushNotification(obj = Object) {
            let notification = obj

            let missing = this.checkParams(obj)
            if (!missing) {
                notification.id = this.generateId(5)
                this.$emit('notification', notification)
            } else {
                console.error('Pushed notification from ' + this.$route.name + ' does not include all required params. Missing ' + missing)
            }
        },

        /**
         * Check if notification object has all required params
         * @param obj
         */
        checkParams(obj) {
            let missing = ''
            if (!('title' in obj)) {
                missing += 'title' + ' '
            }
            if (!('description' in obj)) {
                missing += 'description' + ' '
            }
            if (!('image' in obj) && !('icon' in obj)) {
                missing += 'asset (image or icon)' + ' '
            }

            if (missing === '') {
                return false
            } else {
                return missing
            }
        },

        /**
         * Generate random id for pushed notification
         * @param length
         * @returns {string}
         */
        generateId(length) {
            let result           = '';
            let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }
    },
}