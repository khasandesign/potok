<template>
  <div class="flow" ref="flow">
    <div class="flow-chapter" v-for="indexCh in chapterQty" :key="indexCh" :data-index="indexCh">
      <textarea
          class="chapter-title italic text-block-input"
          data-tip-id="chapterTip"
          placeholder="Название секции..."
          v-tip
          @keyup.enter="newChapter"
          @keydown.enter="$event.preventDefault()"
          @input="autoGrow($event.target)"
          ref="chapterTitle"
      ></textarea>
      <div class="flow-items" ref="flowItems">
        <v-flow-item-create
            :index="index"
            :startIndex="startIndex"
            :data-index="index"
            :chapterIndex="indexCh"
            @newItem="newItem"
            v-for="index in chaptersItemsQty[indexCh].itemsQty"
            :key="index"></v-flow-item-create>
      </div>
    </div>
  </div>

  <!--  Tips  -->
  <v-tip id="chapterTip" class="tip-top" data-direction="top" tip-id="chapterTip" action="Понятно">
    Чтобы начать новую <br> секцию нажмите <kbd>↵</kbd>
  </v-tip>
</template>

<script>
import autoGrow from "../../mixins/autoGrow";

export default {
  name: "v-flow-create",
  mixins: [autoGrow],
  data() {
    return {
      content: {
        links: [],
        chapters: []
      },
      chapterQty: 1,
      chaptersItemsQty: {
        1: {
          itemsQty: 1,
          startIndex: 0
        }
      },
      startIndex: 1,
      gIndexCount: 0
    }
  },
  emits: ['sendContent'],
  methods: {
    /**
     * Save gotten item in content object and switch to a new one
     * @param value
     * @param item
     * @param chapter
     */
    newItem(value, item, chapter) {
      this.$nextTick(() => {
        let items = item.parentElement

        // Add info about prev item in general object
        this.gIndexCount += 1
        this.content.links.push(value)

        // Insert a new flow item in DOM and check isn't it just editing an existing one
        let firstItemUrl = items.children[0].querySelector('.item-create-url input')
        if (firstItemUrl.value.length !== 0) {
          this.chaptersItemsQty[chapter].itemsQty++
        }

        this.orderItems(items)

        this.assignNumbers()

        // Focus on link input of a pasted item
        this.$nextTick(() => {
          items.children[0].querySelector('.item-create-url input').focus()

          this.sendContent()
        })
      })
    },

    /**
     * Base logic for interaction with chapters and saving them in the content object
     */
    newChapter() {
      this.$nextTick(() => {
        let flow = this.$refs.flow

        // Insert new chapter item in DOM
        let firstChapterInput = flow.children[0].querySelector('input')

        if (firstChapterInput.value.length === 0) {
          this.chaptersItemsQty[this.chapterQty + 1] = {}
          this.chaptersItemsQty[this.chapterQty + 1].itemsQty = 1

          // Build chapter object and push it in general object
          let chapterObj = {
            id: this.chapterQty,
            name: flow.children[0].querySelector('input').value
          }
          this.content.chapters.push(chapterObj)

          this.assignNumbers()

          this.chapterQty++
        }

        this.orderChapters()

        // Focus on the new chapter's input
        this.$nextTick(() => {
          let newChapterField = this.$refs.flow.children[0].querySelector('textarea')

          this.autoGrow(newChapterField)
          newChapterField.focus()

          this.sendContent()
        })
      })
    },

    /**
     * Order items in decrement/increment
     * @param items
     */
    orderItems(items) {
      let itemsChildren = [].slice.call(items.children)

      itemsChildren.sort(function (a, b) {
        return a.getAttribute("data-index").localeCompare(b.getAttribute("data-index"));
      }).reverse()

      itemsChildren.forEach(function (el) {
        items.appendChild(el)
      });
    },

    /**
     * Order chapters in decrement/increment
     */
    orderChapters() {
      let flow = this.$refs.flow,
          chapters = [].slice.call(flow.children);

      chapters.sort(function (a, b) {
        return a.getAttribute("data-index").localeCompare(b.getAttribute("data-index"));
      }).reverse()

      chapters.forEach(function (el) {
        flow.appendChild(el)
      });
    },

    /**
     * Assign new item-number for all items
     */
    assignNumbers() {
      this.$nextTick(() => {
        let allItems = document.querySelectorAll('.flow-item-create')
        allItems = [].slice.call(allItems).reverse()
        this.startIndex = allItems.length + 1
        this.$nextTick(() => {
          for (let i = 0; allItems.length > i; i++) {
            allItems[i].querySelector('.item-number').innerHTML = '§ ' + (i + 1) + '.'
          }
        })
      })
    },

    /**
     * Send content object to createFlow view
     */
    sendContent() {
      this.$emit('sendContent', this.content)
    },
  },
  mounted() {
    this.orderItems(this.$refs.flowItems)
    this.orderChapters()

    this.autoGrow(this.$refs.chapterTitle)
  }
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
</style>