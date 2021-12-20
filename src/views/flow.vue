<template>
  <div>
    <Head>
      <title>Становление мидлом в PHP back end</title>
    </Head>

    <div class="container">
      <section id="info">
        <div class="col-xl-4 col-lg-6 col-md-8 mx-auto">
          <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
          <h3>Становление мидлом в PHP back end</h3>
          <p class="desc par-1 italic">Делаю эту подборку для себя в открытом доступе для того чтобы стать мидлом</p>
          <v-art art="art-1.svg"></v-art>
        </div>
      </section>
      <section id="content">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <v-flow id="1"></v-flow>
          </div>
          <div class="col-xl-3 col-md-6 info-md">
            <v-crip src="user/original/profile.jpg">Khasan Sh.</v-crip>
            <p class="headline">Становление мидлом <br> в PHP back end</p>
            <p class="par-3 italic">Делаю эту подборку для себя в открытом доступе для того чтобы стать мидлом</p>
            <v-button size="xl" icon="highFive" icon-size="32"></v-button>
            <v-button size="xl" icon="bookmark" icon-size="32"></v-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
section {
  margin: 0;
}

#info {
  margin-top: 48px;

  > div {
    text-align: center;
  }

  .crip {
    margin-bottom: 16px;
  }

  .desc {
    margin-bottom: 8px;
  }
}

#content {
  .info-md {
    text-align: center;

    .crip {
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 992px) {
  #content {
    .info-md {
      margin: auto;
    }
  }
}
</style>