<template>
  <div class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 flow-wrap">
    <router-link to="/flow">
      <div class="flow-card anim-click" @contextmenu="$store.commit('contextmenu', {name: 'flow-card', routes: ['/profile'], private: privateFlow})">
        <v-crip :src="cripSrc">{{ cripName }}</v-crip>
        <h6 class="title">{{ title }}</h6>
        <p class="annotation par-3 italic">{{ annotation }}</p>
        <v-art :art="art"></v-art>
        <v-icon v-if="privateFlow" name="filled-lock"></v-icon>
      </div>
    </router-link>
  </div>
</template>

<script>

// Doc note: Share now privateFlow, but value from the flow's object (e.g. flow.private)

export default {
  name: "v-flow-card",
  data() {
    return {
      contextmenu: false
    }
  },
  props: {
    cripSrc: {
      type: String,
      required: true
    },
    cripName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    annotation: {
      type: String,
    },
    art: {
      type: String,
    },
    privateFlow: {
      type: Boolean,
      default: false
    }
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
</style>