<template>
  <div class="flow" ref="flow">
    <div class="flow-chapter" v-for="indexCh in chapterQty" :key="indexCh" :data-index="indexCh">
      <input
          class="chapter-title italic"
          data-tip-id="chapterTip"
          placeholder="Название секции..."
          v-tip
          @keyup.enter="newChapter"
      >
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
export default {
  name: "v-flow-create",
  emits: ['sendContent'],
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
      startIndex: 1
    }
  },
  methods: {
    newItem(value, item, chapter) {
      this.$nextTick(() => {

        // Vars
        var items = item.parentElement

        // Add info about prev item in general object
        this.content.links.push(value)

        // Insert a new flow item in DOM and check isn't it just editing an existing one
        var firstItemUrl = items.children[0].querySelector('.item-create-url input')

        if (firstItemUrl.value.length != 0) {
          this.chaptersItemsQty[chapter].itemsQty++
        }

        // Order items
        this.orderItems(items)

        // Assign new item-number for all items
        this.assignNumbers()

        // Focus on link input of a pasted item
        this.$nextTick(() => {
          items.children[0].querySelector('.item-create-url input').focus()

          // Send content variable to createFlow view
          this.sendContent()
        })
      })
    },
    newChapter() {
      this.$nextTick(() => {
        // Vars
        var flow = this.$refs.flow

        // Insert new chapter item in DOM
        var firstChapterInput = flow.children[0].querySelector('input')

        if (firstChapterInput.value.length != 0) {
          this.chaptersItemsQty[this.chapterQty + 1] = {}
          this.chaptersItemsQty[this.chapterQty + 1].itemsQty = 1

          // Build chapter object and push it in general object
          var chapterObj = {
            id: this.chapterQty,
            name: flow.children[0].querySelector('input').value
          }

          this.content.chapters.push(chapterObj)

          // Assign new item-number for all items
          this.assignNumbers()

          this.chapterQty++

        // Create a new qty var for new chapter
        // ...
        }

        // Order chapters
        this.orderChapters()

        // Focus on the new chapter's input
        this.$nextTick(() => {
          this.$refs.flow.children[0].querySelector('input').focus()

          // Send content variable to createFlow view
          this.sendContent()
        })
      })
    },
    orderItems(items) {
      var itemsChildren = [].slice.call(items.children);

      itemsChildren.sort(function (a, b) {
        return a.getAttribute("data-index").localeCompare(b.getAttribute("data-index"));
      }).reverse()

      itemsChildren.forEach(function (el) {
        items.appendChild(el)
      });
    },
    orderChapters() {
      var flow = this.$refs.flow,
          chapters = [].slice.call(flow.children);

      chapters.sort(function (a, b) {
        return a.getAttribute("data-index").localeCompare(b.getAttribute("data-index"));
      }).reverse()

      chapters.forEach(function (el) {
        flow.appendChild(el)
      });
    },
    assignNumbers() {
      // Assign new item-number for all items
      this.$nextTick(() => {
        var allItems = document.querySelectorAll('.flow-item-create')
        allItems = [].slice.call(allItems).reverse()
        this.startIndex = allItems.length + 1
        this.$nextTick(() => {
          for (var i = 0; allItems.length > i; i++) {
            allItems[i].querySelector('.item-number').innerHTML = '§ ' + (i + 1) + '.'
          }
        })
      })
    },
    sendContent() {
      this.$emit('sendContent', this.content)
    },
  },
  mounted() {
    var items = this.$refs.flowItems
    this.orderItems(items)
    this.orderChapters()
  }
}
</script>

<style lang="scss" scoped>
.flow {

  .flow-chapter {
    display: flex;
    gap: 24px;
    align-items: flex-end;
    margin-bottom: 48px;

    .chapter-title {
      @extend .par-1;
      @extend .italic;
      width: 200px;
      text-align: right;
      color: $label-1;
      padding-bottom: 8px;
      border: none;
      outline: none;

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