<template>
  <div id="notifications" ref="notifications">
    <transition-group name="list">
      <v-notification
          v-for="(notification, ni) in notifications"
          :key="notification.id"
          :notification="notification"
          :data-index="ni"
          :index="ni"
          @wheel="swiping($event)"
          data-position="0"
          @closeClick="notification.closed = true"
          @click="goNotification(notification, ni)"
      ></v-notification>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "v-notifications",
  data() {
    return {
      itemSpliced: false,
      pos: 0,
      deltaX: 0,
      backTimer: null,
      notifications: []
    }
  },
  props: {
    pushed: {
      type: Object
    }
  },
  watch: {
    pushed: function (notification) {
      this.notifications.unshift(notification)
      this.closeNotification(-1)
    }
  },
  methods: {
    /**
     * Check if swiping is horizontal and do it
     * @param e Notifications wrapper
     */
    swiping(e) {
      if (Math.abs(e.wheelDeltaY) < 10 && Math.abs(e.wheelDeltaX) > 2) {
        // Prevent page shaking
        e.preventDefault()

        if (this.pos >= 0) {
          this.swipeRight(e)
          this.swipeLeft(e)
        } else {
          if (Math.abs(e.wheelDeltaX) <= 3) {
            this.swipeRight(e, true)
            this.swipeLeft(e)
          }
        }
      }
    },

    /**
     * Swiping right
     * @param e Info from wheel event
     * @param prevent
     */
    swipeRight(e, prevent = false) {
      // Prevent wheel's residual motion to affect on other notifications
      if (prevent) {
        this.pos = 0
        this.deltaX = 0
      } else { // Wheel stopped and prev notification is closed
        if (Math.abs(e.wheelDeltaX) <= 3) {
          this.deltaX = 0
        } else { // Wheel didn't stop. but prev notification is closed
          this.deltaX = e.wheelDeltaX
        }
      }

      let notification = this.getTouched(e)

      if (this.deltaX < -2) {
        this.pos = notification.getAttribute('data-position')
        let moveTo = Number(this.pos) + Math.abs(this.deltaX)

        notification.setAttribute('data-position', moveTo)

        this.move(notification, moveTo, 0.5)
      }
    },

    /**
     * Swiping left
     * @param e
     */
    swipeLeft(e) {
      let notification = this.getTouched(e)

      if (e.wheelDeltaX > 2) {
        // 1. Move it back till 0px X position
        // 2. Again, if it was hovered, but not closed, then close it fadeOut in 2000ms

        this.pos = notification.getAttribute('data-position')
        let moveTo = Number(this.pos) + -Math.abs(e.wheelDeltaX)

        notification.setAttribute('data-position', moveTo)

        this.move(notification, moveTo, 0.5)
      }
    },

    /**
     * Return currently interacted notification
     * @param e
     * @returns {*}
     */
    getTouched(e) {
      let notification = e.target

      if (!notification.classList.contains('notification')) {
        if (e.target.closest('.notification') === null) {
          if (notification.classList.contains('swipe-wrap') && !notification.classList.contains('notification')) {
            notification = e.target.querySelector('.notification')
          }
        } else {
          notification = e.target.closest('.notification')
        }
      }

      return notification
    },

    /**
     * Animated close of a notification
     * @param index
     */
    closeNotification(index) {
      setTimeout(() => {
        this.removeNotification(index)
      }, 4000)
    },

    /**
     * Remove notification object from data property
     * @param index
     */
    removeNotification(index) {
      this.pos = -300
      this.notifications.splice(index, 1)
    },

    /**
     * Move notification according to wheel params
     * @param el
     * @param moveTo
     * @param speed
     */
    move(el, moveTo, speed) {
      // Prevent positioning back
      clearTimeout(this.backTimer)

      // Notification is completely swiped out
      if (moveTo > el.clientWidth) {
        let index = el.parentElement.getAttribute('data-index')
        this.removeNotification(index)
      } else {
        // Start timer to return it back
        let notification = el
        this.backTimer = setTimeout(() => {
          notification.setAttribute('data-position', 0)
          notification.style.transform = 'translateX(0px)'
        }, 500)
      }

      // Notification is swiped in negative X
      if (moveTo < 0) {
        moveTo = 0
      }

      el.setAttribute('data-position', moveTo)
      el.style.transform = 'translateX(' + moveTo * speed + 'px)'
    },

    /**
     * Go to notification's url if it was clicked
     * @param notification
     * @param index
     */
    goNotification(notification, index) {
      if (!notification.closed) {
        let url = notification.url
        if (url) {
          if (!url.includes('http')) {
            this.$router.push(url)
          } else {
            window.open(url, '_blank')
          }
          this.removeNotification(index)
        } else {
          this.removeNotification(index)
        }
      } else {
        this.removeNotification(index)
      }
    },

    /**
     * Stick el when it reaches top during the page scrolling
     * @param el
     * @param topGap Gap to leave after el is stick
     * @param top Default top property of the el
     */
    stickToTop(el, topGap, top = topGap) {
      let offset = el.getBoundingClientRect()
      if (offset.top <= topGap) {
        el.style.position = 'fixed'
        el.style.top = topGap + 'px'
      }
      if (window.scrollY + topGap <= top) {
        el.style.position = 'absolute'
        el.style.top = top + 'px'
      }
    }
  },
  mounted() {
    let vm = this
    document.addEventListener('scroll', function () {
      vm.stickToTop(vm.$refs.notifications, 16, 84)
    })
  }
}
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
  transition-delay: 0.2s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 0.2s ease;
}

#notifications {
  position: absolute;
  top: 84px;
  right: 16px;
  width: 322px;
  max-width: calc(100% - 32px);
}
</style>