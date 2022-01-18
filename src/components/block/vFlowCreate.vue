<template>
  <div class="flow" ref="flow">
    <!--  Chapters  -->
    <div class="flow-chapter"
         v-for="(chapter, chi) in content.chapters"
         :key="chi">
      <textarea class="chapter-title italic text-block-input" placeholder="Название секции..."
                v-tip
                data-tip-id="chapterTip"
                v-model="chapter.name"
                @input="autoGrow($event.target)"
                @keydown.enter="newChapter"
      ></textarea>
      <!--   Items   -->
      <div class="flow-items" :id="'chapter-items-' + chi">
        <draggable v-model="chapter.links" handle=".drag" :key="dragKey">
          <div class="flow-item flow-item-create" :class="!link.url ? 'empty' : ''" ref="item"
               v-for="(link, li) in chapter.links"
               :key="li"
               @contextmenu="$store.commit('contextmenu', {
                name: 'flow-item-create',
                routes: ['/create-flow'],
                link: link,
                li: li,
                chi: chi,
                event: $event
              })">
            <p class="item-number">§ 1.</p>
            <div class="item-create-url" v-show="!link.url || link.error">
              <v-icon size=32 name="link"></v-icon>
              <input type="text" class="par-1" placeholder="Вставьте ссылку..."
                     v-model="link.url"
                     @input="link.error = true"
                     @paste="validateUrl($event, link)"
                     @keydown.enter="validateUrl($event, link, true)"
                     @blur="focusName">
            </div>
            <div class="item-create-name" v-show="link.url && !link.error">
              <v-icon size=32 name="link" @click="link.error = true; link.link_updated = +new Date()"></v-icon>
              <input type="text" class="par-1" placeholder="Введите название..." v-model="link.name"
                     @keydown.enter="link.name ? newItem(chi) : link.name"
              >
            </div>
            <v-error v-show="link.error" :message="link.error !== true ? link.error : ''"></v-error>
            <div class="item-actions" v-show="!link.error && link.url && link.name && link.link_created">
              <v-button @click="insertItem(chi, li)" icon="plus"></v-button>
              <v-button @click="deleteItem(chi, li)" icon="delete"></v-button>
              <v-button @click="openUrl(link.url)" icon="launch"></v-button>
              <v-button icon="drag" class="drag"></v-button>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>

  <!--  Tips  -->
  <v-tip id="chapterTip" class="tip-top" data-direction="top" tip-id="chapterTip" action="Понятно">
    Чтобы начать новую <br> секцию нажмите <kbd>↵</kbd>
  </v-tip>
</template>

<script>
import {VueDraggableNext} from 'vue-draggable-next'
import autoGrow from "../../mixins/autoGrow"

export default {
  name: "v-flow-create",
  mixins: [autoGrow],
  emits: ['sendContent'],
  components: {
    draggable: VueDraggableNext
  },
  data() {
    return {
      content: {},
      undoChanges: [],
      redoChanges: [],
      meta: false,
      dragKey: false
    }
  },
  methods: {
    /**
     * Application of all validation steps abt URL
     */
    validateUrl(e, link, submit) {
      // Check if @paste
      if (e.clipboardData) {
        e.preventDefault() // Prevent to avoid dublicated url
        link.url = e.clipboardData.getData('text/plain')
      }

      // Type
      if (this.validateType(link, submit)) { // When optimize this.validateExist(link), add it
        return true
      } else {
        return false
      }
    },

    /**
     * Validate URL structure and check if it's forbidden source
     * @param url - link obj from its chapter
     * @returns {boolean}
     */
    validateType(link, submit) {
      let urlObj

      try {
        urlObj = new URL(link.url)
      } catch (_) {
        link.error = '*Это не ссылка, проверьте её написание'
        return false // not URL
      }
      if (urlObj.origin === null) {
        link.error = '*Это не ссылка, проверьте её написание'
        return false // incorrect URL
      }
      if (urlObj.protocol === 'http:') {
        // not secure URL
      }
      if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
        link.error = '*Эта ссылка недоступна остальным'
        return false // localhost URL
      }
      let forbidden = ['github'] // Grab this from DB via API, filtered by user's country
      if (forbidden.some(word => urlObj.host.includes(word))) {
        link.error = '*Этот сайт нарушает <a target="_blank" href="">Правила пользования</a>'
        return false // forbidden website
      }

      // Check if this is just regular creating or editing
      if (link.link_updated && !submit) {
        link.error = true
      } else {
        link.error = false
      }

      return true
    },

    /**
     * Send GET query to know does a link work or not
     * @param link
     * @returns {boolean}
     */
    validateExist(link) {
      let http = new XMLHttpRequest()
      http.open('HEAD', link.url, false)
      http.send()
      if (http.status == 404 || http.status == 204 || http.status == 500) {
        link.error = '*Эта <a target="_blank" href="' + link.url + '">ссылка</a> не работает, либо она пуста'
        return false
      } else {
        return true
      }
    },

    /**
     * Insert a new chapter in the content obj
     * @param e
     */
    newChapter(e) {
      e.preventDefault()

      // Vars
      let lastChapter = this.content.chapters.at(-1),
          lastChapterEl = document.querySelector('.flow .flow-chapter')

      // Check if first chapter is still empty
      if (!lastChapter.name) {
        lastChapterEl.querySelector('textarea').focus()
      } else {
        this.content.chapters.unshift({
          name: '',
          links: [
            {
              name: '',
              url: '',
              type: 1,
              link_created: 0,
              link_updated: 0,
              error: 0,
              user: {
                name: 'Хасан Шадияров' // Just get user name from store
              }
            }
          ]
        })

        // Increment chapters count
        this.content.chapter_count++

        this.indexItems()
        this.sendContent()
      }
    },

    /**
     * Insert a new item in specific chapter of the content obj
     * @param chi chapter index
     */
    newItem(chi) {
      // Re-render draggable component
      this.dragKey = !this.dragKey

      // Inser a new item
      this.$nextTick(() => {
        // Vars
        let chapters = this.content.chapters,
            currentChapter = chapters[chi],
            lastLink = currentChapter.links.at(0),
            lastLinkEl = document.querySelector('#chapter-items-' + chi + ' .flow-item')

        // Insert an empty item
        if (lastLink.url || lastLink.name) {
          currentChapter.links.unshift({
            name: '',
            url: '',
            type: 1,
            link_created: +new Date(),
            link_updated: 0,
            error: 0,
            user: {
              name: 'Хасан Шадияров' // Just get user name from store
            }
          })

          // Increment links count
          this.content.link_count++
        }
        // Focus next item
        this.$nextTick(() => {
          lastLinkEl.querySelector('.item-create-url input').focus()
        })

        this.indexItems()
        this.sendContent()
      })
    },

    /**
     * Reindex items when adding a new one or adding a new chapter
     */
    indexItems() {
      this.$nextTick(() => {
        let listNode = document.querySelectorAll('.flow-item'),
            items = [].slice.call(listNode, 0).reverse()

        items.forEach(function (item, i) {
          item.querySelector('.item-number').innerHTML = '§ ' + (i + 1) + '.'
        })
      })
    },

    /**
     * Send content to the flow obj
     */
    sendContent() {
      this.$nextTick(() => {
        this.$emit('sendContent', this.content)
      })
    },

    /**
     * Inser a new empty item below
     * @param chi
     * @param li
     * @returns {boolean}
     */
    insertItem(chi, li) {
      // Vars
      let chapters = this.content.chapters,
          currentChapter = chapters[chi],
          links = currentChapter.links

      // Insert before action
      if (li) {
        links.splice(li, 1, links[li], {
          name: '',
          url: '',
          type: 1,
          link_created: +new Date(),
          link_updated: 0,
          error: 0,
          user: {
            name: 'Хасан Шадияров' // Just get user name from store
          }
        })

        this.indexItems()
      }
    },

    /**
     * Delete flow item from content obj
     */
    deleteItem(chi, li) {
      let links = this.content.chapters[chi].links

      // Save to undo changes
      this.undoChanges.unshift({
        action: 'deleteItem',
        data: {
          chi: chi,
          li: li,
          item: links[li]
        },
        instruction: 'Insert deleted item to content obj on it\'s old position'
      })

      // Decrement links count
      this.content.link_count--

      // Delete item
      links.splice(li, 1)

      this.indexItems()
    },

    /**
     * Open link of flow item during editing/creating
     */
    openUrl(url) {
      window.open(url, '_blank').focus();
    },

    focusName(e) {
      e.target.parentElement.nextSibling.querySelector('input').focus()
    }
  },
  mounted() {
    // Insert first empty item to display the interface
    if (Object.keys(this.content).length === 0) {
      this.content = {
        link_count: 0,
        chapter_count: 0,
        chapters: [
          {
            name: '',
            links: [
              {
                name: '',
                url: '',
                type: 1,
                link_created: +new Date(),
                link_updated: 0,
                error: 0,
                user: {
                  name: 'Хасан Шадияров' // Just get user name from store
                }
              },
            ]
          }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.flow {

  .flow-chapter {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    align-items: flex-end;
    margin-bottom: 48px;

    .chapter-title {
      @extend .par-1;
      @extend .italic;
      font-size: 20px;
      width: 200px;
      height: 40px;
      text-align: right;
      color: $label-1;
      padding-bottom: 8px;
      border: none;
      outline: none;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;

      &::placeholder {
        color: $gray-22;
      }
    }
  }

  p {
    margin: 0;
  }
}

@media (max-width: 992px) {
  .flow {
    .flow-chapter {
      display: grid;
      gap: 12px;

      .chapter-title {
        width: auto;
        text-align: left;
      }
    }
  }
}

// **
// flow-item styles
// **

.flow-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 48px;
  position: relative;
  align-items: center;
  background: $bg-primary;

  &:hover {
    .item-actions::v-deep {
      opacity: 1;
      pointer-events: auto;
    }
  }

  p {
    margin: 0;
  }

  input {
    @extend .par-1;
    color: $label-1;
    padding-bottom: 8px;
    border: none;
    outline: none;
    display: block;

    &::placeholder {
      color: $gray-22;
    }
  }

  .item-number {
    display: flex;
    align-self: flex-start;
    justify-content: flex-end;
    width: 64px;
    color: $label-1;
    padding-top: 8px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  .item-link {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    text-decoration: none;
    color: $accent;
    padding: 8px 0 8px 0;

    &:first-child {
      padding-top: 0;
    }

    img {
      filter: invert(0.5) sepia(0.47) saturate(97) hue-rotate(207deg);
    }
  }

  .item-create-url, .item-create-name {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    text-decoration: none;
    color: $accent;
    padding: 8px 0 0px 0;

    input {
      width: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
    }

    &:first-child {
      padding-top: 0;
    }

  }

  .item-create-url {

    img {
      filter: invert(0.78);
    }
  }

  .item-create-name {

    input {
      color: $accent;
    }

    img {
      filter: invert(0.5) sepia(0.47) saturate(97) hue-rotate(207deg);
    }

    > .icon {
      cursor: pointer;
    }
  }

  .item-actions::v-deep {
    position: absolute;
    right: 0%;
    display: flex;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    background: $bg-primary;
    transition: 0.05s;

    .btn {
      opacity: 0.2;

      &:hover {
        opacity: 0.36;
      }
    }

    .btn:first-child {
      opacity: 0.24;

      &:hover {
        opacity: 0.36;
      }
    }

    .btn.drag {
      cursor: grab;
    }
  }
}

@media (max-width: 992px) {
  .flow-item {
    gap: 16px;

    .item-number {
      justify-content: flex-start;
    }
  }
}
</style>