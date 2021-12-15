import {Comment} from "vue";

export default {
    methods: {
        isSlot() {
            return this.$slots.default && this.$slots.default().findIndex(o => o.type !== Comment) !== -1;
        },
    }
}