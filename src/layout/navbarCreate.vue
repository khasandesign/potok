<template>
  <nav>
    <div class="container">
      <div class="col-md-10 mx-auto">
        <div class="row">
          <div class="col-md-1 col-3">
            <div class="brand anim-click">
              <router-link to="/"><img src="@/assets/images/UI/logo.svg" alt="Potok"></router-link>
            </div>
          </div>
          <div class="col-md-6 col-9 actions">
            <div class="pinned-tools">
              <v-button size="i-md" variant="highlight"><v-icon name="mode" size="24"></v-icon></v-button>
            </div>
            <div class="page-action">
              <v-button class="d-none d-md-block" @click="startAnim" :to="{name: 'create-flow', params: {save: 'publish'}}" size="xs" variant="primary">Сохранить</v-button>
              <v-button class="d-none d-md-block" :to="{name: 'create-flow', params: {save: 'draft'}}" size="xs" variant="secondary">В черновики</v-button>
            </div>
            <div class="profile anim-click">
              <router-link to="/profile"><v-avatar src="user/original/profile.jpg" size="32"></v-avatar></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar-create',
  methods: {
    startAnim() {
      // Start loading animation on button
    }
  }
}
</script>

<style lang="scss" scoped>

</style>