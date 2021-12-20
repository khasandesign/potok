<template>
  <div class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 add-flow-card-wrap">
    <router-link to="/create-flow">
      <div class="add-flow-card anim-click">
        <v-icon name="filled-plus" size="44"></v-icon>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "v-add-flow-card",
  methods: {
    /**
     * Dynamically change height of add-flow-card according to flow-card
     */
    addFlowHeight() {
      let addFlowCard = document.querySelector('.add-flow-card'),
          flowCard = document.querySelector('.flow-card')
      if (addFlowCard && flowCard) {
        addFlowCard.style.height = flowCard.clientHeight + 'px'
      }
    }
  },
  mounted() {
    this.addFlowHeight()

    let vm = this
    window.addEventListener("resize", function() {
      vm.addFlowHeight()
    });
  }
}
</script>

<style lang="scss" scoped>
.add-flow-card-wrap {
  margin-bottom: 34px;
}
.add-flow-card {
  text-align: center;
  padding: 24px 24px 0 24px;
  border-radius: $border-radius;
  box-shadow: 0px 5px 0px $gray-08;
  cursor: pointer;
  transition: 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gray-02;
  height: 100%;

  &:hover {
    background: $gray-03;
  }

  .icon {
    @extend .unselectable;
    opacity: 0.2;
    position: absolute;
  }

  .flow-card {
    @extend .unselectable;
    opacity: 0;
  }

  img {
    @extend .undraggable;
  }
}
</style>