import getCookie from "../mixins/getCookie";

export default {
    name: 'tip',
    mounted(el) {
        // Vars
        var cookies = getCookie.methods.getCookies(),
            id = el.getAttribute('data-tip-id'),
            tip = document.getElementById(id),
            interacted = false

        // Check if trigger element was clicked to call tip again
        el.addEventListener('click', function () {
            if (interacted) {
                closeTip()
                interacted = false
            }
            if (el.getAttribute('data-tip-interactive') && !interacted) {
                tip.style.display = 'block'
                callTip()
                interacted = true
            }
        })

        // Check if tip was closed
        if (cookies[id] == 'closed') {
            tip.style.display = 'none'
            return
        } else {
            // Dynamically move tip aligned to the page
            const resizeObserver = new ResizeObserver(() => {
                callTip()
            })
            resizeObserver.observe(document.body)
        }

        // Calculate tip's position to it's trigger element and show tip
        function callTip() {
            var coords = el.getBoundingClientRect()

            // Vars
            var direction = tip.getAttribute('data-direction'),
                posX = 0,
                posY = 0

            // Get coords of a tip
            tip.classList.remove('closed')
            let tipCoords = tip.getBoundingClientRect()
            tip.classList.add('closed')

            if (!direction) {
                direction = 'top'
            }

            // Align top offset to page itself
            coords.y = coords.y + window.scrollY


            // Calc coords to move
            if (direction == 'top') {
                posX = coords.x + coords.width / 2
                posY = coords.y + coords.height + 16

                tip.style.transform = 'translateX(-50%)'
            } else if (direction == 'left') {
                posX = coords.x + coords.width + 32
                posY = coords.y + coords.height / 2 - 8

                tip.style.transform = 'translateY(-50%)'
            } else if (direction == 'right') {
                posX = coords.x - tipCoords.width - 24
                posY = coords.y + coords.height / 2 - 8

                tip.style.transform = 'translateY(-50%)'
            } else if (direction == 'bottom') {
                posX = coords.x + coords.width / 2
                posY = coords.y - coords.height - tipCoords.height + 16

                tip.style.transform = 'translateX(-50%)'
            }

            // Move tip
            tip.style.left = posX + 'px'
            tip.style.top = posY + 'px'

            // Show tip
            tip.classList.remove('closed')
        }

        // Close tip
        function closeTip() {
            tip.classList.add('closed')
        }

    },
}