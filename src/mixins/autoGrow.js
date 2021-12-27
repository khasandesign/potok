export default {
    methods: {
        /**
         * Dynamically increase the height of the textarea while typing
         * @param element textarea
         * @param event
         */
        autoGrow(element) {
            element.style.height = "5px";
            element.style.height = (element.scrollHeight) + "px";
        },
    }
}