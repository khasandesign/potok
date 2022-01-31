<template>
  <div class="error-message par-5" v-html="message"></div>
</template>

<script>
export default {
  name: "v-error",
  props: {
    message: {
      type: [String, Number, Boolean],
    }
  },
}
</script>

<style lang="scss" scoped>
.error-message::v-deep {
  position: absolute;
  left: 100%;
  white-space: nowrap;
  top: 14px;
  color: $red;
  background: $bg-primary;
  z-index: 2;
  min-height: 40px;
  padding-bottom: 8px;
  text-align: left;

  a {
    color: $red;
    text-decoration: none;
    border-bottom: 1px solid rgba($red, 0.2);
  }
}

@media (max-width: 992px) {
  .error-message::v-deep {
    white-space: normal;
    width: 150px;
  }
}
</style>