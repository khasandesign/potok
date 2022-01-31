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
            <v-button size="md" variant="highlight" to="/search" icon="search"></v-button>
            <v-button size="md" variant="highlight" icon="mode"></v-button>
          </div>
          <div class="page-action">
            <v-button class="d-none d-md-block" to="/sign-in" size="xs" variant="secondary">Войти</v-button>
            <v-button class="d-none d-md-block" :to="{name: 'sign-in', params: {reqSession: false}}" size="xs" variant="primary">Регистрация</v-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar-guest',
}
</script>

<style lang="scss" scoped>

</style>