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
            </div>
            <div class="page-action">
              <v-button class="d-none d-md-block" to="/sign-in" size="xs" variant="secondary">Войти</v-button>
              <v-button class="d-none d-md-block" to="/sign-in" size="xs" variant="primary">Регистрация</v-button>
            </div>
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