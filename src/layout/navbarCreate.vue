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
              <v-button class="d-none d-md-block save-flow" size="xs" v-loading variant="primary">Сохранить</v-button>
              <v-button class="d-none d-md-block draft-flow" size="xs" v-loading variant="secondary">В черновики</v-button>
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
}
</script>

<style lang="scss" scoped>

</style>