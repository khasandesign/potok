<template>
  <div class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 flow-wrap" v-if="flow">
    <router-link to="/flow">
      <div
          class="flow-card anim-click"
          :data-public="flow.public"
          @contextmenu="$store.commit('contextmenu', {name: 'flow-card', routes: ['/profile'], flow: flow, event: $event})"
      >
        <v-crip :src="flow.user.avatar">{{ flow.user.name }}</v-crip>
        <h6 class="title">{{ flow.title }}</h6>
        <p class="annotation par-3 italic">{{ flow.description }}</p>
        <v-art :art="flow.art"></v-art>
        <v-icon v-show="!flow.public" name="filled-lock" class="private"></v-icon>
      </div>
    </router-link>
  </div>
  <div class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 flow-wrap" v-else>
    <router-link to="/flow">
      <div class="flow-card anim-click">
        <v-crip>...</v-crip>
        <h6 class="title">...</h6>
        <p class="annotation par-3 italic">... <br> ...</p>
        <v-art art="art-1.svg"></v-art>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  name: "v-flow-card",
  data() {
    return {
      contextmenu: false
    }
  },
  props: {
    flow: {
      type: Object,
    },
  }
}
</script>

<style lang="scss" scoped>
.flow-wrap {
  margin-bottom: 28px;

  a {
    color: inherit
  }
}

.flow-card {
  @extend .platter;
  text-align: center;
  padding: 26px 24px 0 24px;
  cursor: pointer;
  position: relative;

  &:hover {
    background: $gray-008;
  }

  .crip {
    margin-bottom: 18px;
  }

  .title {
    margin-bottom: 12px;
  }

  .annotation {
    margin-bottom: 8px;
  }

  .icon {
    @extend .unselectable;
    position: absolute;
    bottom: 12px;
    right: 10px;
    opacity: 0.13;
  }
}

@media (min-width: 1400px) {
  .flow-wrap {
    margin-right: 0.1px;
  }
}
</style>