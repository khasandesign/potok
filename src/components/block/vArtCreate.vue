<template>
  <div class="art-create">
    <div class="colors">
      <span class="color active" data-color="#0284EB" style="background: #0284EB; outline-color: #0284EB"></span>
      <span class="color" data-color="#E84D1C" style="background: #E84D1C; outline-color: #E84D1C"></span>
      <span class="color" data-color="#753838" style="background: #753838; outline-color: #753838"></span>
      <span class="color" data-color="#2BB4AB" style="background: #2BB4AB; outline-color: #2BB4AB"></span>
      <span class="color" data-color="#DFCA0C" style="background: #DFCA0C; outline-color: #DFCA0C"></span>
      <div class="personal-color">
        <input type="text" class="par-1 italic text-block-input" id="personal-color" placeholder="Ваш цвет...">
      </div>
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

  <!--  Tips  -->
  <v-tip id="artTip" class="tip-left" data-direction="left" tip-id="artTip" action="Понятно">
    Рисунок – обложка <br> и опозновательная фигура
  </v-tip>
</template>

<script>
export default {
  name: "v-art-create",
  mounted() {
    //  Drawing logic
    const canvas = this.$refs.artCanvas
    const ctx = canvas.getContext('2d')

    //  Vars
    let drawing = false
    let ratio = 2
    let activeColor = '#0284EB'

    //  Resizing
    canvas.width = 342 * ratio
    canvas.height = 242 * ratio

    //  Clear canvas
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    //  Set color
    function setColor(el) {
      //  Get color
      activeColor = el.getAttribute('data-color')

      //  Remove active class
      if (document.querySelector('.colors .active')) {
        document.querySelector('.colors .active').classList.remove('active')
      }

      //  Set active class
      el.classList.add('active')

      clearCanvas()
    }

    //  Set personal color
    function setPersonalColor(val) {
      activeColor = val
    }

    function startPosition(e) {
      drawing = true
      draw(e)
    }

    function endPosition() {
      drawing = false
      ctx.beginPath()
    }

    function draw(e) {
      if (!drawing) {
        return
      } else {
        ctx.lineWidth = 6
        ctx.lineCap = 'round'
        ctx.strokeStyle = activeColor

        var rect = e.target.getBoundingClientRect();
        var x = (e.clientX - rect.left) * ratio; //x position within the element.
        var y = (e.clientY - rect.top) * ratio;  //y position within the element.

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    }

    function inCanvasViewer(e) {
      if (e.target.tagName != 'CANVAS') {
        drawing = false
        ctx.beginPath()
      }
    }

    //  Event listeners
    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', endPosition)
    canvas.addEventListener('mousemove', draw)

    //  Set color - listener
    var colors = document.getElementsByClassName("color");
    for (var i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', function (e) {
        setColor(e.target)
      }, false);
    }

    //  Set personal color - listener
    const personalColorInp = document.getElementById('personal-color')
    personalColorInp.addEventListener('input', function () {
      //  Remove active class from colors
      var activeColor = document.querySelector('.colors .active')
      if (activeColor) {
        activeColor.classList.remove('active')
      }

      clearCanvas()

      setPersonalColor(personalColorInp.value)
    })

    //  Check if user is drawing inside of the canvas
    window.addEventListener('mousemove', inCanvasViewer)

    //  Clear button action
    document.querySelector('#clear').addEventListener('click', clearCanvas)
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
    left: -236px;

    .color {
      transition: 0.05s;
      margin-left: auto;
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
      margin-right: 4px;
      margin-bottom: 20px;
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
</style>