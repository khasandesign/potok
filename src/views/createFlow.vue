<template>
  <Head>
    <title>{{ title ? title : 'Заголовок...' }}</title>
  </Head>

  <input type="text" v-model="title" placeholder="Заголовок...">
  create flow
</template>

<script>
export default {
  data() {
    return {
      title: '132'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>