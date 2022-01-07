<template>
  <v-dropdown size="md" class="contextmenu" v-show="contextName === 'flow-card'">
    <v-dropdown-item icon="pencil">Изменить</v-dropdown-item>
    <v-dropdown-item icon="copy">Скопировать ссылку</v-dropdown-item>
    <v-dropdown-item icon="share">Поделиться</v-dropdown-item>
    <v-separator></v-separator>
    <v-dropdown-item icon="globe" v-if="publicFlow" @click="setPrivate">Приватность <span>Выкл</span></v-dropdown-item>
    <v-dropdown-item icon="lock" v-else @click="setPublic">Приватность <span>Вкл</span></v-dropdown-item>
    <v-dropdown-item icon="delete" d-action>Удалить</v-dropdown-item>
  </v-dropdown>
</template>

<script>
export default {
  name: "v-contextmenu",
  data() {
    return {
      click: {},
      contextName: '',
      contextmenu: this.context,
      publicFlow: false,
      flowCard: ''
    }
  },
  props: {
    context: {
      type: Object,
      default: new Object()
    }
  },
  methods: {
    /**
     *
     * @param event
     * @returns {boolean}
     */
    callContext(event) {
      this.rewriteProps()
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

          contextmenu.style.display = 'block'

          // Check if there's enough space to collapse it down
          if (event.clientY + contextmenu.clientHeight < window.innerHeight) { // yes
            contextmenu.style.left = this.click.x + 'px'
            contextmenu.style.top = this.click.y + 'px'
          } else { // no
            contextmenu.style.left = this.click.x + 'px'
            contextmenu.style.top = this.click.y - contextmenu.clientHeight + 'px'
          }

          // Clear store's state
          this.$store.commit('clearContextmenu')

          return false // *preventDefault and *return are done to avoid native contextmenu
        }
      }
    },

    /**
     * Close current contextmenu
     */
    closeContext() {
      this.contextName = ''
    },

    /**
     * Rewrite props in data properties to use them reactively
     */
    rewriteProps() {
      this.contextmenu = this.context
      this.flowCard = this.contextmenu.event.target.closest('.flow-card')
      this.publicFlow = (this.flowCard.getAttribute('data-public') === 'true')
    },

    /**
     * Below you will only find specific methods for each of the action
     * Write down common methods above of this comment
     */


    setPublic() {
      // ...Do query to db to set privacy public and then do following code

      this.flowCard.querySelector('.private').style.display = 'none'
      this.flowCard.setAttribute('data-public', true)

      this.pushNotification({
        title: 'Публичный поток',
        description: '“' + this.contextmenu.flow.title.substring(0, 22) + '...” теперь публичный',
        icon: 'globe',
      })
    },
    setPrivate() {
      // ...Do query to db to set privacy public and then do following code

      this.flowCard.querySelector('.private').style.display = 'block'
      this.flowCard.setAttribute('data-public', false)

      this.pushNotification({
        title: 'Приватный поток',
        description: '“' + this.contextmenu.flow.title.substring(0, 22) + '...” теперь публичный',
        icon: 'lock'
      })
    }
  },
  mounted() {
    document.addEventListener("contextmenu", this.callContext)
    document.addEventListener("click", this.closeContext)
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
}
</style>