<template>
  <div class="art">
    <!--  Change img tag on svg placement when connect DB  -->
    <img class="undraggable" :src="require(`@/assets/images/_trash/${art}`)" :alt="art">
  </div>
</template>

<script>
export default {
  name: "v-art",
  props: {
    art: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.art {
  @extend .unselectable;
  height: 232px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: 100%;
  }
}

@media (max-width: 1200px) {
  .art {
    height: 200px;
  }
}

@media (max-width: 992px) {
  .art {
    height: 232px;
  }
}
</style>