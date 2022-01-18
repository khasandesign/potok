<template>
  <div class="avatar" :style="{borderRadius: size / 4 + 'px', width: size + 'px', height: size + 'px' }">
    <img :src="blobUrl ? blobUrl : require(`@/assets/images/${src}`)" :alt="src">
  </div>
</template>

<script>
export default {
  name: 'v-avatar',
  data() {
    return {
      blobUrl: ''
    }
  },
  props: {
    size: {
      type: String,
      default: '24'
    },
    src: {
      type: [Blob, Boolean, String],
      required: true
    },
  },
  beforeMount() {
    // Get image url from blob
    if (this.src instanceof Blob) {
      let urlCreator = window.URL || window.webkitURL
      this.blobUrl = urlCreator.createObjectURL(this.src)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  overflow: hidden;

  img {
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    height: 100%;
  }
}
</style>
