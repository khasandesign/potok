<template>
  <div class="flow-item">
    <p class="item-number">§ 1.</p>
    <router-link :to="{path: '/redirect', query: {name: item.name, url: item.url, flowId: flowId}}" target="_blank"
                 class="item-link" v-if="warn" @click="setHistory">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.33333 18.6667V18.6667C6.38782 18.6667 4 16.2789 4 13.3333V13.3333C4 10.3878 6.38781 8 9.33333 8H14.6667C17.6122 8 20 10.3878 20 13.3333V13.3333C20 16.2789 17.6122 18.6667 14.6667 18.6667V18.6667"/>
        <path
            d="M17.3333 13.333V13.333C14.3878 13.333 12 15.7208 12 18.6663V18.6663C12 21.6119 14.3878 23.9997 17.3333 23.9997H22.6667C25.6122 23.9997 28 21.6119 28 18.6663V18.6663C28 15.7208 25.6122 13.333 22.6667 13.333V13.333"/>
      </svg>
      <p>{{ item.name }}</p>
    </router-link>
    <a :href="item.url" target="_blank" class="item-link" @click="setRedirectHistory" v-else>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.33333 18.6667V18.6667C6.38782 18.6667 4 16.2789 4 13.3333V13.3333C4 10.3878 6.38781 8 9.33333 8H14.6667C17.6122 8 20 10.3878 20 13.3333V13.3333C20 16.2789 17.6122 18.6667 14.6667 18.6667V18.6667"
            stroke="black"/>
        <path
            d="M17.3333 13.333V13.333C14.3878 13.333 12 15.7208 12 18.6663V18.6663C12 21.6119 14.3878 23.9997 17.3333 23.9997H22.6667C25.6122 23.9997 28 21.6119 28 18.6663V18.6663C28 15.7208 25.6122 13.333 22.6667 13.333V13.333"
            stroke="black"/>
      </svg>
      <p>{{ item.name }}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: "v-flow-item",
  props: {
    index: {
      type: Number,
    },
    item: {
      type: Object
    },
    flowId: {
      type: Number
    },
    warn: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    /**
     * Save direct link to browser history even if warn is enabled
     */
    setHistory() {
      // store the current URL
      let current_url = window.location.href

      // use replaceState to push a new entry into the browser's history
      history.replaceState({}, "", this.item.url)

      // use replaceState again to reset the URL
      history.replaceState({}, "", current_url)
    },

    /**
     * Save redirect link to browser history even if warn is disabled
     */
    setRedirectHistory() {
      // store the current URL
      let current_url = window.location.href,
          redirect_url = encodeURI(window.location.protocol + '//' + window.location.host + '/redirect?name=' + this.item.name.split(' ').join('+') + '&url=' + this.item.url.split(' ').join('') + '&flowId=' + this.flowId)

      // use replaceState to push a new entry into the browser's history
      history.replaceState({}, "", redirect_url)

      // use replaceState again to reset the URL
      history.replaceState({}, "", current_url)
    }
  },
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
    @extend .regular;
    display: flex;
    align-self: flex-start;
    justify-content: flex-end;
    width: 64px;
    color: $label-1;
    padding-top: 8px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }


  .item-link {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    text-decoration: none;
    color: $accent;
    padding: 8px 0 8px 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    &:first-child {
      padding-top: 0;
    }

    svg path {
      stroke: $accent;
    }

    &:visited {
      color: #BC18B2;

      svg path {
        stroke: #BC18B2;
      }
    }

    &:hover {
      color: $red;

      svg path {
        stroke: $red;
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