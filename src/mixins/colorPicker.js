export default {
    data() {
      return {
          activeColor: '#0284EB',
          paletteColor: '',
          palette: false,
          timer: null
      }
    },
    methods: {
        /**
         * Set active color and change it visually in DOM
         * @param el
         * @param canvas
         * @param ctx
         */
        setColor(el, canvas, ctx) {
            // Get color
            this.activeColor = el.getAttribute('data-color')

            // Switch active class
            if (document.querySelector('.colors').querySelector('.active')) {
                document.querySelector('.colors').querySelector('.active').classList.remove('active')
            }
            el.classList.add('active')

            this.clearCanvas(ctx, canvas, ctx)
        },

        /**
         * Handle color switching and call setColor (JSDocs: Set active color and change it visually in DOM)
         * @param ctx
         * @param canvas
         */
        colorListener(ctx, canvas) {
            let vm = this
            var colors = document.getElementsByClassName("color")
            for (var i = 0; i < colors.length; i++) {
                colors[i].addEventListener('click', function (e) {
                    vm.setColor(e.target, canvas, ctx)
                }, false)
            }
        },

        /**
         * Basic logic for color picker, get color from palette and move indicator
         * @param e
         * @param colorPickerCanvas
         * @param colorPickerCtx
         */
        paletteViewer(e, colorPickerCanvas, colorPickerCtx) {
            if (this.palette) {
                let offset = colorPickerCanvas.getBoundingClientRect(),
                    x = e.pageX - offset.left + 12,
                    y = e.pageY - offset.top - (window.scrollY - 12)

                // Move indicator
                this.$refs.pickerIndicator.classList.add('visible-hidden')
                this.$refs.pickerIndicator.style.left = e.pageX + 'px'
                this.$refs.pickerIndicator.style.top = e.pageY + 'px'
                this.$refs.pickerIndicator.classList.remove('visible-hidden')

                let p = colorPickerCtx.getImageData(x, y, 1, 1).data,
                    hex = "#" + ("000000" + this.rgbToHex(p[0], p[1], p[2])).slice(-6)

                if (hex !== '#000000') {
                    this.$refs.pickerIndicator.style.backgroundColor = hex
                    this.paletteColor = hex
                }

            }
        },

        /**
         * Convert rgb to hex color
         * @param r
         * @param g
         * @param b
         * @returns {string}
         */
        rgbToHex(r, g, b) {
            if (r > 255 || g > 255 || b > 255) {
                throw "Invalid color component"
            }
            return ((r << 16) | (g << 8) | b).toString(16)
        },

        /**
         * Collapse color picker and draw image data inside the canvas
         * @param el
         * @param colorPickerCtx
         */
        openColorPicker(el, colorPickerCtx) {
            this.$refs.pickerIndicator.classList.remove('visually-hidden')

            el.classList.add('active')

            // Draw color palette in canvas
            let img = this.$refs.paletteSource
            colorPickerCtx.drawImage(img, 0, 0, 160, 160)

            this.palette = true
        },

        /**
         * Set selected color form color picker to the first cell
         */
        setColorPicker() {
            this.closeColorPicker()

            this.activeColor = this.paletteColor
            let firstColorItem = this.$refs.firstColorItem
            firstColorItem.style.background = this.activeColor
            firstColorItem.style.outlineColor = this.activeColor
            firstColorItem.setAttribute('data-color', this.activeColor)

            firstColorItem.click()
        },

        /**
         * Close color picker
         */
        closeColorPicker() {
            if (this.palette === true) {
                this.palette = false

                this.$refs.pickerIndicator.classList.add('visually-hidden')
                this.$refs.colorPicker.classList.remove('active')
            }
        },
    },
    mounted() {
        const vm = this

        // Color palette canvas
        const colorPickerCanvas = this.$refs.colorPicker,
            colorPickerCtx = colorPickerCanvas.getContext('2d')

        colorPickerCtx.canvas.width = 160
        colorPickerCtx.canvas.height = 160

        colorPickerCanvas.addEventListener('mousemove', function (e) {
            clearTimeout(this.timer)
            vm.openColorPicker(this, colorPickerCtx)
            vm.paletteViewer(e, colorPickerCanvas, colorPickerCtx)

            this.timer = setTimeout(function () {
                vm.closeColorPicker()
            }, 800);
        })
    }
}