export default {
    data() {
        return {
            activeColor: '#0284EB',
            paletteColor: '',
            palette: false,
            timer: null,
            offset: {},
            paletteClosed: false
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

            this.clearCanvas(ctx, canvas)
        },

        /**
         * Handle color switching and call setColor (JSDocs: Set active color and change it visually in DOM)
         * @param ctx
         * @param canvas
         */
        colorListener(ctx, canvas) {
            let vm = this
            let colors = document.getElementsByClassName("color")
            for (let i = 0; i < colors.length; i++) {
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
                this.$refs.pickerIndicator.classList.add('visually-hidden')
                this.$refs.pickerIndicator.style.left = e.pageX + 'px'
                this.$refs.pickerIndicator.style.top = e.pageY + 'px'
                this.$refs.pickerIndicator.classList.remove('visually-hidden')

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
            if (!this.palette && !this.paletteClosed) {
                this.$refs.pickerIndicator.classList.remove('visually-hidden')

                el.classList.add('active')

                // Draw color palette in canvas
                let img = this.$refs.paletteSource
                colorPickerCtx.drawImage(img, 0, 0, 160, 160)

                this.palette = true
            }
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
         * Close color picker, set mouseleave true if color picker should be closed by mouseleave
         * @param mouseleave
         */
        closeColorPicker(mouseleave = false) {
            if (!mouseleave) {
                this.paletteClosed = true
            } else {
                clearTimeout(this.timer)
            }
            this.palette = false

            this.$refs.pickerIndicator.classList.add('visually-hidden')
            this.$refs.colorPicker.classList.remove('active')

            setTimeout(() => {
                this.paletteClosed = false
            }, 200)
        },
    },
    mounted() {
        const vm = this

        // Color palette canvas
        const colorPickerCanvas = this.$refs.colorPicker,
            colorPickerCtx = colorPickerCanvas.getContext('2d'),
            indicator = this.$refs.pickerIndicator

        colorPickerCtx.canvas.width = 160
        colorPickerCtx.canvas.height = 160

        let canvasElements = [indicator, colorPickerCanvas]
        canvasElements.forEach(function(el) {
            el.addEventListener('mousemove', function (e) {
                clearTimeout(vm.timer)
                if (!this.palette) {
                    vm.openColorPicker(this, colorPickerCtx)
                }
                vm.paletteViewer(e, colorPickerCanvas, colorPickerCtx)
            })
        });

        colorPickerCanvas.addEventListener('mouseleave', function () {
            vm.timer = setTimeout(function () {
                vm.closeColorPicker(true)
            }, 100);
        })
    }
}