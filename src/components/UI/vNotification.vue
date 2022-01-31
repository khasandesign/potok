<template>
  <div class="swipe-wrap">
    <div class="notification anim-click">
      <div class="content">
        <div class="close-area">
          <div class="close anim-click" @click="emitClose($event)">
            <v-icon name="close" size="16"></v-icon>
          </div>
        </div>
        <p class="title par-4 italic semibold">{{ notification.title }}</p>
        <p class="desc par-4 italic">{{ notification.description }}</p>
      </div>
      <div class="asset">
        <v-avatar :src="notification.image" size="32" v-if="notification.image"></v-avatar>
        <v-icon :name="notification.icon" size="32" v-else-if="notification.icon"></v-icon>
      </div>
      <span class="bg"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-notification",
  emits: ['closeClick'],
  props: {
    notification: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    /**
     * Close button clicked
     * @param e
     */
    emitClose(e) {
      e.preventDefault()
      this.$emit('closeClick', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  padding: 14px 12px 16px 16px;
  position: relative;
  display: flex;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid $gray-06;
  cursor: pointer;
  transition: 0.1s !important;
  margin-bottom: 16px;
  background-color: $bg-primary;

  &:hover {
    .bg {
      background-color: $gray-008;
    }
  }

  .bg {
    background-color: transparent;
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 8px;
    pointer-events: none;
  }


  .close-area {
    position: absolute;
    left: 0;
    top: 0;
    width: 30%;
    height: 70%;
    background: transparent;

    &:hover {
      .close {
        opacity: 1;
        pointer-events: auto;
      }
    }

    .close {
      display: flex;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid $gray-06;
      text-align: center;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: -10px;
      top: -10px;
      background-color: $bg-primary;
      transition: 0.1s;
      cursor: pointer;
      pointer-events: none;
      opacity: 0;

      img {
        width: 16px;
        height: 16px;
        opacity: 0.4;
      }
    }
  }

  .content {
    padding-top: 2px;
    min-width: 254px;

    .title {
      margin-bottom: 4px;
    }
    .desc {
      margin-bottom: 0;
    }
  }

  .asset {
    margin-top: -4px;
  }
}
</style>