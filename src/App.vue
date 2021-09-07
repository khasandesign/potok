<template>
  <navbar></navbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./layout/navbar";
export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "/assets/scss/themes/light/colors";
  * {
    margin: 0;
    padding: 0;
  }
  .section, .description, .subsection {
    font-size: 12px;
    line-height: 14px;
    font-family: 'Inter', sans-serif;
    margin: 0;
  }
  .section {
    color: rgba(0,0,0,0.3);
    padding: 40px 0;
  }
  .subsection {
    color: rgba(0,0,0,0.3);
    padding-bottom: 4px;
  }
  .description {
    color: rgba(0,0,0,0.2);
  }

  section {
    margin-top: 56px;
    margin-bottom: 24px;
  }
</style>
