<template>
  <div class="tip closed" :ref="tipId">
    <div class="arrow">
      <img src="@/assets/images/UI/_arrow.svg" alt="↑">
    </div>
    <div class="content">
      <p class="par-4">
        <slot></slot>
      </p>
    </div>
    <div class="actions">
      <button class="tip-action" @click="closeTip">{{ action }}</button>
      <button class="tip-action tip-destruction" v-if="dAction">{{ dAction }}</button>
    </div>
  </div>
</template>

<script>
import setCookie from "../../mixins/setCookie";

export default {
  name: "vTip",
  mixins: [setCookie],
  data() {
    return {}
  },
  props: {
    tipId: {
      type: String,
    },
    action: {
      type: String,
      default: 'Понятно'
    },
    dAction: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeTip() {
      this.$refs[this.tipId].classList.add('closed')
      this.setCookie(this.tipId, 'closed', 365)
    },
  },
}
</script>

<style lang="scss" scoped>
.tip {
  text-align: center;
  background: $bg-primary;
  border: 1px solid $gray-06;
  width: fit-content;
  max-width: 343px;
  max-height: 120px;
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;

  .content {
    padding: 18px 20px 14px 20px;

    p {
      margin: 0;
      line-height: 24px;
    }
  }

  .actions {
    .tip-action {
      @extend .btn-2;
      @extend .regular;
      background: transparent;
      border: none;
      outline: none;
      color: $accent;
      height: 40px;
      width: 100%;

      &:not(:first-child) {
        border-top: 1px solid $gray-06;
      }
    }

    .tip-destruction {
      color: $red;
    }
  }
}

.tip-left {
  .arrow {
    position: absolute;
    display: flex;
    height: 10.5px;
    top: 50%;
    left: -7.2px;
    transform: rotate(-90deg) translateY(-50%);
  }
}

.tip-top {
  .arrow {
    position: absolute;
    display: flex;
    height: 10.5px;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.tip-right {
  .arrow {
    position: absolute;
    display: flex;
    height: 10.5px;
    top: 50%;
    right: -7.2px;
    transform: rotate(90deg) translateY(-50%);
  }
}

.tip-bottom {
  .arrow {
    position: absolute;
    display: flex;
    height: 10.5px;
    bottom: -10px;
    left: 50%;
    transform: rotate(180deg) translateX(50%);
  }
}

.closed {
  display: none;
  opacity: 0;
}
</style>