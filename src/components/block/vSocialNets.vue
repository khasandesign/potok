<template>
  <div class="social-nets">
    <router-link to="" v-if="all || instagram"><img src="@/assets/images/Instagram.svg" alt="Instagram"></router-link>
    <router-link to="" v-if="all || tiktok"><img src="@/assets/images/TikTok.svg" alt="TikTok"></router-link>
    <router-link to="" v-if="all || youtube"><img src="@/assets/images/YouTube.svg" alt="YouTube"></router-link>
    <router-link to="" v-if="all || telegram"><img src="@/assets/images/Telegram.svg" alt="Telegram"></router-link>
  </div>
</template>

<script>
export default {
  name: "v-social-nets",
  props: {
    all: {
      type: Boolean,
    },
    instagram: {
      type: Boolean,
    },
    tiktok: {
      type: Boolean,
    },
    youtube: {
      type: Boolean,
    },
    telegram: {
      type: Boolean,
    }
  }
}
</script>

<style lang="scss" scoped>
.social-nets {
  display: flex;
  gap: 16px;
  justify-content: center;
}
</style>