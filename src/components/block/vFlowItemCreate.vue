<template>
  <div class="flow-item flow-item-create" ref="item">
    <p class="item-number">§ {{ startIndex }}.</p>
    <div :class="`item-create-url ${urlPasted ? 'visually-hidden' : ''}`">
      <v-icon customSize="32" name="link" data-link=""></v-icon>
      <input
          type="text"
          class="par-1"
          placeholder="Вставьте ссылку..."
          v-model="url"
          @paste="validateUrl"
          @focusout="validateUrl"
          @keyup.enter="validateUrl">
    </div>
    <div :class="`item-create-name ${!urlPasted ? 'visually-hidden' : ''}`">
      <v-icon customSize="32" name="link" data-link="" @click="urlPasted = false"></v-icon>
      <input
          type="text"
          class="par-1"
          placeholder="Введите название..."
          ref="createName"
          v-model="name"
          @focusout="newItem"
          @keyup.enter="newItem">
    </div>
  </div>
</template>

<script>
export default {
  name: "v-flow-item-create",
  data() {
    return {
      name: '',
      url: '',
      type: 1,
      urlPasted: false,
      newItemSent: false
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    chapterIndex: {
      type: Number,
      required: true
    },
    startIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    /**
     * Check if pasted url is actually link
     */
    validateUrl() {
      if (!this.validated) {
        let isUrl = false
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        setTimeout(() => {
          isUrl = !!pattern.test(this.url);

          if (this.url && isUrl) {
            this.urlPasted = true
            this.$refs.createName.focus()
          } else {
            // throw error that value is not url and add class by ref
          }
        }, 1)
      }
    },

    /**
     * Apply new item to the flow's array
     */
    newItem() {
      if (!this.newItemSent) {
        this.newItemSent = true
        if (this.name) {
          this.$emit('newItem', {
            index: this.index,
            name: this.name,
            url: this.url,
            type: this.type,
            chapterId: this.chapterIndex
          }, this.$refs.item, this.chapterIndex)

          this.newItemSent = true
        } else {
          // throw error that name is not filled
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.flow-item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 48px;

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