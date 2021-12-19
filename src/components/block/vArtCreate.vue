<template>
  <div class="art-create">
    <div class="colors">
      <span class="color active" data-color="#0284EB" ref="firstColorItem" style="background: #0284EB; outline-color: #0284EB"></span>
      <span class="color" data-color="#E84D1C" style="background: #E84D1C; outline-color: #E84D1C"></span>
      <span class="color" data-color="#0E0F0F" style="background: #0E0F0F; outline-color: #0E0F0F"></span>
      <span class="color" data-color="#2BB4AB" style="background: #2BB4AB; outline-color: #2BB4AB"></span>
      <span class="color" data-color="#DFCA0C" style="background: #DFCA0C; outline-color: #DFCA0C"></span>
      <canvas class="color-picker" ref="colorPicker" @click="setColorPicker()"></canvas>
      <img src="@/assets/images/color-pallete-canvas.png" ref="palleteSource" alt="" class="visually-hidden">
    </div>
    <canvas class="art" ref="artCanvas"></canvas>
    <div class="actions">
      <v-button icon="eraser" iconSize="24" id="clear"></v-button>
      <div class="info" id="info" v-tip data-tip-id="artTip" data-tip-interactive="true">
        <v-icon name="info" size="16"></v-icon>
        <span class="par-5 label-7 medium">Рисунок</span>
      </div>
    </div>
  </div>
  <div class="color-picker-indicator visually-hidden" ref="pickerIndicator"></div>

  <!--  Tips  -->
  <v-tip id="artTip" class="tip-left" data-direction="left" tip-id="artTip" action="Понятно">
    Рисунок – обложка <br> и опозновательная фигура
  </v-tip>
</template>

<script>
import canvas2svg from "../../mixins/canvas2svg";

export default {
  name: "v-art-create",
  mixins: [canvas2svg],
  emits: ['sendArt'],
  data() {
    return {
      art: '',
      drawing: false,
      ratio: 2,
      activeColor: '#0284EB',
      palleteColor: '',
      canvasSize: {
        width: 342,
        height: 242
      },
      pallete: false,
      timer: null
    }
  },
  methods: {
    /**
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
      if (e.target.tagName != 'CANVAS') {
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
     * Even listener for isCanvasViewer (JSDocs: Check if cursor is on canvas area)
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
    setPersonalColor(val) {
      this.activeColor = val
    },
    colorListener(ctx, canvas) {
      let vm = this
      var colors = document.getElementsByClassName("color")
      for (var i = 0; i < colors.length; i++) {
        colors[i].addEventListener('click', function (e) {
          vm.setColor(e.target, canvas, ctx)
        }, false)
      }
    },
    palleteViewer(e, colorPickerCanvas, colorPickerCtx) {
      if (this.pallete) {
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
          this.palleteColor = hex
        }

      }
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) {
        throw "Invalid color component"
      }
      return ((r << 16) | (g << 8) | b).toString(16)
    },
    openColorPicker(el, colorPickerCtx) {
      this.$refs.pickerIndicator.classList.remove('visually-hidden')

      el.classList.add('active')

      // Draw color pallete in canvas
      let img = this.$refs.palleteSource
      colorPickerCtx.drawImage(img, 0, 0, 160, 160)

      this.pallete = true
    },
    setColorPicker() {
      this.closeColorPicker()

      this.activeColor = this.palleteColor
      let firstColorItem = this.$refs.firstColorItem
      firstColorItem.style.background = this.activeColor
      firstColorItem.style.outlineColor = this.activeColor
      firstColorItem.setAttribute('data-color', this.activeColor)

      firstColorItem.click()

      console.log(firstColorItem)
    },
    closeColorPicker() {
      if (this.pallete === true) {
        this.pallete = false

        this.$refs.pickerIndicator.classList.add('visually-hidden')
        this.$refs.colorPicker.classList.remove('active')
      }
    },

    /**
     * Drawing methods
     */
    startPosition(e, ctx) {
      this.drawing = true
      this.draw(e, ctx)
    },
    endPosition(ctx) {
      this.drawing = false
      ctx.beginPath()

      this.exportSvg(ctx)
    },
    draw(e, ctx) {
      if (!this.drawing) {
        return
      } else {
        ctx.lineWidth = 6
        ctx.lineCap = 'round'
        ctx.strokeStyle = this.activeColor

        var rect = e.target.getBoundingClientRect();
        var x = (e.clientX - rect.left) * this.ratio; //x position within the element.
        var y = (e.clientY - rect.top) * this.ratio;  //y position within the element.

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    },

    /**
     * Actually all methods which work with canvas.
     * This wrap is done because we have two context:
     * 1. Drawing representation
     * 2. Svg export
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

    // Color pallete canvas
    const colorPickerCanvas = this.$refs.colorPicker,
        colorPickerCtx = colorPickerCanvas.getContext('2d')

    colorPickerCtx.canvas.width = 160
    colorPickerCtx.canvas.height = 160

    colorPickerCanvas.addEventListener('mousemove', function (e) {
      clearTimeout(this.timer)
      vm.openColorPicker(this, colorPickerCtx)
      vm.palleteViewer(e, colorPickerCanvas, colorPickerCtx)

      this.timer = setTimeout(function () {
        vm.closeColorPicker()
      }, 800);
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

    // Connect SVG to Canvas script
    // ...
  }
}
</script>

<style lang="scss" scoped>
.art-create {
  display: flex;
  gap: 36px;
  width: 342px;
  margin: auto;
  position: relative;

  .art {
    @extend .unselectable;
    min-width: 342px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid $gray-04;
    cursor: crosshair
  }

  .personal-color {
    input {
      text-align: right;
      width: 200px;
    }
  }

  .colors {
    padding-top: 8px;
    position: absolute;
    left: -60px;

    .color {
      margin-bottom: 16px;
      cursor: pointer;
      display: block;
      width: 24px;
      height: 24px;
      border-radius: 50%;

      &:first-child {
        margin-top: 0 !important;
      }
    }

    .active {
      outline: 2px solid;
      outline-offset: 2px;
      width: 16px;
      height: 16px;
      margin-left: 4px;
      margin-bottom: 16px;
    }

    .color-picker {
      background-image: url("~@/assets/images/color-pallete.png");
      background-size: 100%;
      position: relative;
      z-index: 2;
      transform: scale(1);
      transition: 0.2s;
      margin-bottom: 16px;
      cursor: pointer;
      display: block;
      width: 24px;
      height: 24px;
      border-radius: 50%;

      &.active {
        transform: scale(6);
        margin-left: auto;
        width: 24px;
        height: 24px;
        outline: none;
        cursor: none;
      }
    }
  }

  .actions {
    width: 342px;
    height: 242px;
    display: block;
    position: absolute;
    pointer-events: none;

    > * {
      position: absolute;
      pointer-events: auto;
    }

    #clear {
      top: 0;
      right: 0;
      opacity: 0.2;

      &:hover {
        opacity: 0.3;
      }
    }

    #info {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      bottom: 8px;
      right: 12px;

      .icon {
        filter: invert(0.8);
      }
    }
  }
}

.color-picker-indicator {
  position: absolute !important;
  background-color: #FAC1BD;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  outline: 2px solid #fff;
  z-index: 3;
  position: relative;
  cursor: none;
  transition: 0.08s;
}
</style>