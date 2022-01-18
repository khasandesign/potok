export default {
    methods: {
        /**
         * Add class to specific element
         * @param el - element to add class
         * @param add - class to be added
         * @param closest - search closest element of this class
         */
        addClass(el, add, closest = null) {
            if (closest) {
                el.closest('.' + closest).classList.add(add)
            } else {
                el.classList.add(add)
            }
        },
        removeClass() {
            // ...
        },
        hasClass() {
            // ...
        }
    }
}