<template>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-md-1 col-3">
          <div class="brand anim-click">
            <router-link to="/"><v-logo></v-logo></router-link>
          </div>
        </div>
        <div class="col-md-6 col-9 actions">
          <div class="pinned-tools">
          </div>
          <div class="page-action">
            <v-button class="d-none d-md-block save-profile" size="xs" variant="primary">Сохранить</v-button>
            <v-button class="d-none d-md-block cancel-profile" size="xs" variant="secondary">Отмена</v-button>
          </div>
          <div class="profile anim-click">
            <router-link to="/profile"><v-avatar src="user/original/profile.jpg" size="32"></v-avatar></router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar-profile',
}
</script>

<style lang="scss" scoped>

</style>