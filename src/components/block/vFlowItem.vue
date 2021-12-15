<template>
  <div class="flow-item">
    <p class="item-number">§ 26.</p>
    <router-link to="/" class="item-link">
      <v-icon customSize="32" name="link"></v-icon>
      <p>Инкапсуляция и полиморфизм. Просто о сложном</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "v-flow-item",
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-item {
  display: flex;
  gap: 48px;

  p {
    margin: 0;
  }

  .item-number {
    display: flex;
    align-self: flex-start;
    justify-content: flex-end;
    width: 64px;
    color: $label-1;
    padding-top: 8px;
  }

  .item-link {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    text-decoration: none;
    color: $accent;
    padding: 8px 0 8px 0;

    &:first-child {
      padding-top: 0;
    }

    img {
      filter: invert(0.5) sepia(0.47) saturate(97) hue-rotate(207deg);
    }

    &:hover, &:focus {
      color: $red;

      img {
        filter: invert(0.5) sepia(1) saturate(100) hue-rotate(0deg);
      }
    }
  }
}

@media (max-width: 992px) {
  .flow-item {
    gap: 16px;

    .item-number {
      justify-content: flex-start;
    }
  }
}
</style>