export default {
    methods: {
        /**
         * Base logic for calculating and showing how many symbols left for specific field
         * @param element input/textarea
         */
        lengthLeft(element) {
            element.addEventListener('keyup', function (event) {
                let maxlength = element.getAttribute('maxlength'),
                    lengthLeft = event.target.parentElement.querySelector('.length-left'),
                    counter = element.value.length

                if (counter > maxlength - 15) {
                    lengthLeft.classList.remove('d-none')
                    lengthLeft.innerHTML = counter + '/' + maxlength
                } else {
                    lengthLeft.classList.add('d-none')
                }
            })
        }
    }
}