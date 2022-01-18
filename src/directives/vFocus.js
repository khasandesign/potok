export default {
    name: 'focus',
    mounted(el) {
        // v-focus is needed because autofocus doesn't work on SPA
        el.focus()
    }
}