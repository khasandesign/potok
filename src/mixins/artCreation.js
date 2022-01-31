import canvas2svg from "./canvas2svg";
import {optimize} from "svgo";

export default {
    data() {
        return {
            art: '',
            drawing: false,
            ratio: 2,
            activeColor: '#0284EB',
            artChanged: false,
            canvasSize: {
                width: 342,
                height: 242
            },
            restore: {},
        }
    },
    mixins: [canvas2svg],
    emits: ['sendArt'],
    methods: {
        /**
         * Clear all canvas draws
         * @param ctx
         * @param canvas
         */
        clearCanvas(ctx, canvas) {
            this.art = ''
            this.optimizedArt = ''
            this.restore = {}
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            localStorage.removeItem('artRestore')

            this.sendArt()
        },

        /**
         * @param canvas
         */
        resizeCanvas(canvas) {
            canvas.width = this.canvasSize.width * this.ratio
            canvas.height = this.canvasSize.height * this.ratio
        },

        /**
         * Check if cursor is on canvas area
         * @param e
         * @param ctx
         */
        inCanvasViewer(e, ctx) {
            if (e.target.tagName !== 'CANVAS') {
                if (this.drawing) {
                    ctx.beginPath()
                }
            }
        },

        /**
         * Check what user actually do and call necessary methods
         * @param ctx
         * @param canvas
         */
        handleEvents(ctx, canvas) {
            let vm = this

            // Drawing events
            canvas.addEventListener('mousedown', function (e) {
                vm.startPosition(e, ctx)
            })
            canvas.addEventListener('mousemove', function (e) {
                vm.draw(e, ctx)
            })
            document.addEventListener('mouseup', function () {
                vm.endPosition(ctx)
            })
        },

        /**
         * Event listener for isCanvasViewer (JSDocs: Check if cursor is on canvas area)
         * @param ctx
         */
        drawCanvas(ctx) {
            let vm = this
            window.addEventListener('mousemove', function (e) {
                vm.inCanvasViewer(e, ctx)
            })
        },

        /**
         * Export canvas as svg and call sendArt (JSDoc: Send art to the flow object via emit event)
         * @param ctx
         */
        exportSvg(ctx) {
            if (this.artChanged) {
                this.art = ctx.getSerializedSvg(true)

                // Combine restored and new svg
                let art = this.art,
                    restorePath
                if (this.restore.art) {
                    restorePath = this.restore.art.replace('<svg xmlns="http://www.w3.org/2000/svg" width="684" height="484">', '').replace('</svg>', '')
                    art = this.art.replace('</svg>', '') + restorePath + '</svg>'
                }

                /*
                Note: You can optimize your svg even better
                      if you will find out the way to minimize number
                      of lines from lineTo and then optimize it
                      you can also achieve better path if you do this
                 */
                let result = optimize(art, {
                    multipass: true,
                })

                this.optimizedArt = result.data
                this.artChanged = false
                this.sendArt()
            }
        },

        /**
         * Start drawing
         * @param e
         * @param ctx
         */
        startPosition(e, ctx) {
            this.drawing = true
            this.artChanged = true
            ctx.beginPath()
            this.draw(e, ctx)
        },

        /**
         * Stop drawing
         * @param ctx
         */
        endPosition(ctx) {
            this.drawing = false
            ctx.beginPath()
            this.exportSvg(ctx)

            // Save art in localStorage to restore later
            let flowRestore = JSON.parse(localStorage.getItem('flowRestore'))
            flowRestore.art = this.optimizedArt
            localStorage.setItem('flowRestore', JSON.stringify(flowRestore))
        },

        /**
         * Basic logic for drawing inside the art creation canvas
         * @param e
         * @param ctx
         */
        draw(e, ctx) {
            if (!this.drawing) {
                return false
            } else {
                ctx.lineWidth = 3 * this.ratio
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'
                ctx.strokeStyle = this.activeColor

                let rect = e.target.getBoundingClientRect();
                let x = (e.clientX - rect.left) * this.ratio; //x position within the element.
                let y = (e.clientY - rect.top) * this.ratio;  //y position within the element.

                ctx.lineTo(x, y)
                ctx.stroke()
                ctx.beginPath()
                ctx.moveTo(x, y)
            }
        },

        /**
         * Actually all methods which work with canvas.
         * This wrap is done because we have two context
         * for art creation canvas:
         * 1. Drawing representation
         * 2. Svg export
         * @param ctx
         * @param canvas
         */
        ctxCore(ctx, canvas) {
            // Event listeners
            this.handleEvents(ctx, canvas)

            // Handle color changing
            this.colorListener(ctx, canvas)

            // Check if user is drawing inside of the canvas
            this.drawCanvas(ctx)
        },

        ctxCoreSvg(ctx, canvas) {
            // Event listeners
            this.handleEvents(ctx, canvas)

            // Handle color changing
            this.colorListener(ctx, canvas)

            // Check if user is drawing inside of the canvas
            this.drawCanvas(ctx)
        },

        /**
         * Send art to the flow object via emit event
         */
        sendArt() {
            if (!this.optimizedArt.includes('</svg>')) {
                this.optimizedArt = ''
            }
            this.$emit('sendArt', this.optimizedArt)
        },

        /**
         * Restore art from localStorage
         */
        restoreArt(ctx) {
            let flowRestore = JSON.parse(localStorage.getItem('flowRestore'))
            if (flowRestore && flowRestore !== 'undefined' && flowRestore.art) {
                // Get art
                let artRestore = flowRestore.art

                // Rewrite art
                this.optimizedArt = artRestore
                this.restore.art = artRestore
                this.restore.color = artRestore.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g)[0]
                this.sendArt()

                // Restore selected color
                this.activeColor = this.restore.color
                if (this.baseColors.includes(this.restore.color)) {
                    document.querySelector('.color.active').classList.remove('active')
                    document.querySelector('.color[data-color="' + this.restore.color + '"]').classList.add('active')
                    this.activeColor = this.restore.color
                } else {
                    this.baseColors[0] = this.restore.color
                }

                // Paste into the canvas
                let base64 = btoa(artRestore),
                    imgSrc = `data:image/svg+xml;base64,${base64}`,
                    img = new Image()

                img.onload = function () {
                    ctx.drawImage(img, 0, 0)
                }
                img.src = imgSrc
            }
        }
    },
    mounted() {
        const vm = this

        // Define canvas
        const canvas = this.$refs.artCanvas,
            ctxDefault = canvas.getContext('2d')

        // Restore art from localStorage
        this.restoreArt(ctxDefault)

        // Define SVG context
        const ctx = new canvas2svg({
            ctx: ctxDefault,
            width: this.canvasSize.width * this.ratio,
            height: this.canvasSize.height * this.ratio,
        })

        // Resizing
        this.resizeCanvas(canvas)

        // Drawing representation context
        this.ctxCore(ctxDefault, canvas)

        // Svg export context
        this.ctxCoreSvg(ctx, canvas)

        // Clear button handling
        document.querySelector('#clear').addEventListener('click', function () {
            vm.clearCanvas(ctxDefault, canvas)
            vm.clearCanvas(ctx, canvas)
            vm.sendArt()
        }, false)
    }
}