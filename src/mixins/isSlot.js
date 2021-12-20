import {Comment} from "vue";

export default {
    methods: {
        /**
         * Check if slot property contains any value
         * @returns {boolean}
         */
        isSlot() {
            return this.$slots.default && this.$slots.default().findIndex(o => o.type !== Comment) !== -1;
        },
    }
}