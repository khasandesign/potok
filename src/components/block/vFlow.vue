<template>
  <div class="flow">
    <div class="flow-chapter">
      <p class="flow-title italic">Интерактив.</p>
      <div class="flow-items">
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
      </div>
    </div>
    <div class="flow-chapter">
      <p class="flow-title italic">Интерактив.</p>
      <div class="flow-items">
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
      </div>
    </div>
    <div class="flow-chapter">
      <p class="flow-title italic">Интерактив.</p>
      <div class="flow-items">
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
        <v-flow-item id="1"></v-flow-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-flow",
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.flow {

  .flow-chapter {
    display: flex;
    gap: 24px;
    align-items: flex-end;
    margin-bottom: 48px;

    .flow-title {
      width: 200px;
      text-align: right;
      color: $label-1;
      padding-bottom: 8px;
    }
  }

  p {
    margin: 0;
  }
}

@media (max-width: 992px) {
  .flow {
    .flow-chapter {
      display: grid;
      gap: 12px;

      .flow-title {
        width: auto;
        text-align: left;
      }
    }
  }
}
</style>