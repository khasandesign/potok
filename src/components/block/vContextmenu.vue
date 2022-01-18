<template>
  <div>
    <v-dropdown size="md" class="contextmenu" v-if="contextName === 'flow-card'">
      <v-dropdown-item icon="pencil">Изменить</v-dropdown-item>
      <v-dropdown-item icon="copy">Скопировать ссылку</v-dropdown-item>
      <v-dropdown-item icon="share">Поделиться</v-dropdown-item>
      <v-separator></v-separator>
      <v-dropdown-item icon="globe" v-if="publicFlow" @click="setPrivate">Приватность <span>Выкл</span>
      </v-dropdown-item>
      <v-dropdown-item icon="lock" v-else @click="setPublic">Приватность <span>Вкл</span></v-dropdown-item>
      <v-dropdown-item icon="delete" d-action>Удалить</v-dropdown-item>
    </v-dropdown>
  </div>
</template>

<script>
export default {
  name: "v-contextmenu",
  emits: ['action'],
  data() {
    return {
      click: {},
      contextName: '',
      contextmenu: this.context,
      publicFlow: false,
      flowCard: '',
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
     * Call contextmenu and place it click's position
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

          if (this.validate()) {
            this.$nextTick(() => {
              // Positioning custom context menu
              let contextmenu = document.querySelector('.contextmenu')

              // Don't close contextmenu if note was clicked
              if (contextmenu.querySelector('.dropdown-note')) {
                contextmenu.querySelector('.dropdown-note').addEventListener('click', function (e) {
                  e.stopPropagation()
                })
              }

              this.click.x = event.clientX
              this.click.y = event.clientY + window.scrollY

              contextmenu.classList.add('d-block')
              let clientHeight = contextmenu.clientHeight
              contextmenu.classList.remove('d-block')

              // Check if there's enough space to collapse it down
              if (event.clientY + clientHeight < window.innerHeight) { // yes
                contextmenu.style.left = this.click.x + 'px'
                contextmenu.style.top = this.click.y + 'px'
              } else { // no
                contextmenu.style.left = this.click.x + 'px'
                contextmenu.style.top = this.click.y - clientHeight + 'px'
              }

              // Clear store's state
              this.$store.commit('clearContextmenu')
            })
          }

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

      // Flow card contextmenu
      if (this.contextmenu.name === 'flow-card') {
        this.flowCard = this.contextmenu.event.target.closest('.flow-card')
        this.publicFlow = (this.flowCard.getAttribute('data-public') === 'true')
      }
    },

    /**
     * Check if all necessary data was passed and generate log info
     */
    validate() {
      let cname = this.contextName
      if (cname === 'flow-card') {
        // ...
        return true
      }
      if (cname === 'flow-item-create') {
        // Generate note message
        let link = this.contextmenu.link

        // Created message
        if (link.flow_created && link.flow_updated === 0) {
          let date = new Date(link.flow_created),
              dateStr = date.getDate() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getFullYear()

          this.contextmenu.note = 'Внесено: ' + link.user.name + '<br>' + dateStr
        }
        // Updated message
        else if (link.flow_updated) {
          let date = new Date(link.flow_updated),
              dateStr = date.getDate() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getFullYear()

          this.contextmenu.note = 'Изменено: ' + link.user.name + '<br>' + dateStr
        }
        // Not submitted yet
        else {
          this.contextmenu.note = 'Только создаётся...'
        }

        // Link is not finished
        if (!link.name || !link.url) {
          this.closeContext()
          return false
        }
        return true
      }
    },

    /**
     * Below you will only find specific methods for each of the action
     * Write down common methods above of this comment
     * 👇
     */

    /**
     * Make flow public (contextmenu: flow-card)
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

    /**
     * Make flow private (contextmenu: flow-card)
     */
    setPrivate() {
      // ...Do query to db to set privacy public and then do following code

      this.flowCard.querySelector('.private').style.display = 'block'
      this.flowCard.setAttribute('data-public', false)

      this.pushNotification({
        title: 'Приватный поток',
        description: '“' + this.contextmenu.flow.title.substring(0, 22) + '...” теперь публичный',
        icon: 'lock'
      })
    },

    /**
     * Emit event to delete specific item
     */
    action(action, data) {
      this.$store.commit('contextAction', {
        action: action,
        data: data
      })
    }
  },
  mounted() {
    document.addEventListener("contextmenu", this.callContext)
    document.addEventListener("click", this.closeContext)

    let vm = this
    document.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        vm.closeContext()
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
}
</style>