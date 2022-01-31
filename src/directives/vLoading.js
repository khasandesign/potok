export default {
    name: 'loading',
    mounted(el, e) {
        if (e.value) {
            el.addEventListener('click', function () {
                el.closest('.btn').classList.add('allow-loading')
            })
        }
        // Start loading animation
        el.style.width = Math.ceil(el.clientWidth) + 'px'

        let label = el.innerHTML
        el.innerHTML = '<span class="label">' + label + '</span><div class="btn-loading"><span class="c1"></span><span class="c2"></span><span class="c3"></span></div>'
    }
}