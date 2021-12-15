<template>
  <nav>
    <div class="container">
      <div class="col-md-10 mx-auto">
        <div class="row">
          <div class="col-md-1 col-3">
            <div class="brand anim-click">
              <router-link to="/"><img src="@/assets/images/logo.svg" alt="Potok"></router-link>
            </div>
          </div>
          <div class="col-md-6 col-9 actions">
            <div class="pinned-tools">
              <v-button size="i-md" variant="highlight" @click="$router.push('/search')"><v-icon name="search" size="24"></v-icon></v-button>
              <v-button size="i-md" variant="highlight"><v-icon name="mode" size="24"></v-icon></v-button>
              <v-button size="i-md" variant="highlight d-md-none"><v-icon name="plus" size="24" custom-size="25.5"></v-icon></v-button>
            </div>
            <div class="page-action">
              <v-button class="d-none d-md-block" @click="$router.push('/create-flow')" size="xs" variant="outline-dark">Создать поток</v-button>
            </div>
            <div class="profile anim-click">
                <router-link to="/profile"><v-avatar src="profile.jpg" size="32"></v-avatar></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar-default'
}
</script>

<style lang="scss" scoped>

</style>