export default {
    name: 'skeleton',
    mounted(el) {
        /**
         * Remove all child UI
         */
        let elHeight = el.clientHeight

        el.innerHTML = '<div class="skeleton-body"></div>'
        el.style.height = elHeight + 'px'

        /**
         * Apply animation
         */
        el.classList.add('skeleton-animation')
    }
}