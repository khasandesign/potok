<template>
  <nav>
    <div class="container">
      <div class="col-md-10 mx-auto">
        <div class="row">
          <div class="col-md-1 col-3">
            <div class="brand anim-click">
              <router-link to="/"><img src="@/assets/images/logo.svg" alt=""></router-link>
            </div>
          </div>
          <div class="col-md-6 col-9 actions">
            <div class="pinned-tools">
              <p-button size="i-md" variant="highlight"><p-icon name="search" size="24"></p-icon></p-button>
              <p-button size="i-md" variant="highlight"><p-icon name="mode" size="24"></p-icon></p-button>
              <p-button size="i-md" variant="highlight d-md-none"><p-icon name="plus" size="24" custom-size="25.5"></p-icon></p-button>
            </div>
            <div class="page-action">
              <p-button class="d-none d-md-block" @click="$router.push('/create-flow')" size="xs" variant="outline-dark">Создать поток</p-button>
            </div>
            <div class="profile anim-click">
                <router-link to="/profile"><p-avatar src="profile.jpg" size="32"></p-avatar></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
nav {
  height: 68px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  display: flex;

  * {
    align-self: center;
  }

  .row {
    justify-content: space-between;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    .page-action {
      margin-left: 8px;
    }
  }
}

.profile {
  margin-left: 20px;
}

@media (max-width: 768px) {
  nav {
    border-bottom: 0;
  }
  .profile {
    margin-left: 8px;
  }
}
</style>