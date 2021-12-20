import canvas2svg from "./canvas2svg";

export default {
    data() {
      return {
          art: '',
          drawing: false,
          ratio: 2,
          activeColor: '#0284EB',
          canvasSize: {
              width: 342,
              height: 242
          },
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
                this.drawing = false
                ctx.beginPath()
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
            canvas.addEventListener('mouseup', function () {
                vm.endPosition(ctx)
            })
            canvas.addEventListener('mousemove', function (e) {
                vm.draw(e, ctx)
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
            if (typeof ctx.getSerializedSvg === 'function') {
                this.art = ctx.getSerializedSvg(true)
            }
            this.sendArt()
        },

        /**
         * Start drawing
         * @param e
         * @param ctx
         */
        startPosition(e, ctx) {
            this.drawing = true
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
        },

        /**
         * Basic logic for drawing inside the art creation canvas
         * @param e
         * @param ctx
         */
        draw(e, ctx) {
            if (!this.drawing) {
                return
            } else {
                ctx.lineWidth = 6
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

        /**
         * Send art to the flow object via emit event
         */
        sendArt() {
            this.$emit('sendArt', this.art)
        }
    },
    mounted() {
        const vm = this

        // Art drawing canvas
        const canvas = this.$refs.artCanvas,
            ctxDefault = canvas.getContext('2d'),
            ctx = new canvas2svg({
                ctx: ctxDefault,
                width: this.canvasSize.width * this.ratio,
                height: this.canvasSize.height * this.ratio,
            })

        // Resizing
        this.resizeCanvas(canvas)

        // Drawing representation context
        this.ctxCore(ctxDefault, canvas)

        // Svg export context
        this.ctxCore(ctx, canvas)

        // Clear button handling
        document.querySelector('#clear').addEventListener('click', function () {
            vm.clearCanvas(ctxDefault, canvas)
            vm.clearCanvas(ctx, canvas)
        }, false)

        // SVG to Canvas script in edit mode
        // ...
    }
}