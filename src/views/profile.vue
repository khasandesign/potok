<template>
  <Head>
    <title>Хасан Шадияров</title>
  </Head>

  <button @click="changeFavicon">Change favicon</button>

  profile
</template>

<script>
export default {
  data() {
    return {
      mainFavicon: ''
    }
  },
  methods: {
    changeFavicon() {
      const favicon = document.getElementById("favicon")
      this.mainFavicon = favicon.href
      favicon.href = require(`@/assets/images/profile2.svg`)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>