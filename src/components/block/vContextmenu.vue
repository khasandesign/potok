<template>
  <v-dropdown size="md" class="contextmenu" v-show="contextName === 'flow-card'">
    <v-dropdown-item icon="pencil">Изменить</v-dropdown-item>
    <v-dropdown-item icon="copy">Скопировать ссылку</v-dropdown-item>
    <v-dropdown-item icon="share">Поделиться</v-dropdown-item>
    <v-separator></v-separator>
    <v-dropdown-item icon="lock">Приватность <span>Выкл</span></v-dropdown-item>
    <v-dropdown-item icon="delete" d-action>Удалить</v-dropdown-item>
  </v-dropdown>
</template>

<script>
export default {
  name: "v-contextmenu",
  data() {
    return {
      click: {},
      contextName: ''
    }
  },
  props: {
    context: {
      type: Object,
      default: new Object()
    }
  },
  methods: {
    callContext(event) {
      // Close current contextmenu
      this.closeContext()

      // Check for special context menu was triggered
      if (Object.keys(this.context).length) {
        // Check if this contextmenu is allowed on the current page
        if (this.context.routes.includes(this.$route.path)) {
          event.preventDefault()

          // Context name to avoid reactivity of state to display context menu
          this.contextName = this.context.name

          // Positioning custom context menu
          let contextmenu = document.querySelector('.contextmenu')
          this.click.x = event.clientX
          this.click.y = event.clientY + window.scrollY
          contextmenu.style.left = this.click.x + 'px'
          contextmenu.style.top = this.click.y + 'px'

          // Clear store's state
          this.$store.commit('clearContextmenu')

          return false // *preventDefault and *return are done to avoid native contextmenu
        }
      }
    },
    closeContext() {
      this.contextName = ''
    },

    /**
     * Below you will only find specific methods for each of the action
     * Write down common methods above of this comment
     */
  },
  mounted() {
    document.addEventListener("contextmenu", this.callContext);
    document.addEventListener("click", this.closeContext);
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
}
</style>