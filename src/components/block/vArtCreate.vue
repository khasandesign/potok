<template>
  <div class="art-create">
    <div class="colors">
      <span class="color active" data-color="#0284EB" ref="firstColorItem" style="background: #0284EB; outline-color: #0284EB"></span>
      <span class="color" data-color="#E84D1C" style="background: #E84D1C; outline-color: #E84D1C"></span>
      <span class="color" data-color="#0E0F0F" style="background: #0E0F0F; outline-color: #0E0F0F"></span>
      <span class="color" data-color="#2BB4AB" style="background: #2BB4AB; outline-color: #2BB4AB"></span>
      <span class="color" data-color="#DFCA0C" style="background: #DFCA0C; outline-color: #DFCA0C"></span>
      <canvas class="color-picker" ref="colorPicker" @click="setColorPicker()"></canvas>
      <img src="@/assets/images/UI/color-palette-canvas.png" ref="paletteSource" alt="pallete" class="visually-hidden">
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
import artCreation from "../../mixins/artCreation";
import colorPicker from "../../mixins/colorPicker";

export default {
  name: "v-art-create",
  mixins: [artCreation, colorPicker],
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
      background-image: url("~@/assets/images/UI/color-palette.png");
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