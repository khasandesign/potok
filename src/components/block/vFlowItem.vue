<template>
  <div class="flow-item">
    <p class="item-number">§ 1.</p>
    <router-link :to="{path: '/redirect', query: {name: item.name, url: item.url, flowId: flowId}}" target="_blank"
                 class="item-link" v-if="warn">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 8H14V7H9V8ZM9 18C6.23858 18 4 15.7614 4 13H3C3 16.3137 5.68629 19 9 19V18ZM14 8C16.7614 8 19 10.2386 19 13H20C20 9.68629 17.3137 7 14 7V8ZM9 7C5.68629 7 3 9.68629 3 13H4C4 10.2386 6.23858 8 9 8V7ZM23 24H18V25H23V24ZM18 24C15.2386 24 13 21.7614 13 19H12C12 22.3137 14.6863 25 18 25V24ZM28 19C28 21.7614 25.7614 24 23 24V25C26.3137 25 29 22.3137 29 19H28ZM23 14C25.7614 14 28 16.2386 28 19H29C29 15.6863 26.3137 13 23 13V14ZM21.5 14H23V13H21.5V14ZM17.4551 13.0244C14.3965 13.3001 12 15.8699 12 19H13C13 16.3921 14.997 14.25 17.5449 14.0204L17.4551 13.0244ZM19 13C19 15.6079 17.003 17.75 14.4551 17.9796L14.5449 18.9756C17.6035 18.6999 20 16.1301 20 13H19ZM10.5 18H9V19H10.5V18Z" fill="black"/>
      </svg>
      <p>{{ item.name }}</p>
    </router-link>
    <a :href="item.url" target="_blank" class="item-link" v-else @click="setRedirectHistory">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 8H14V7H9V8ZM9 18C6.23858 18 4 15.7614 4 13H3C3 16.3137 5.68629 19 9 19V18ZM14 8C16.7614 8 19 10.2386 19 13H20C20 9.68629 17.3137 7 14 7V8ZM9 7C5.68629 7 3 9.68629 3 13H4C4 10.2386 6.23858 8 9 8V7ZM23 24H18V25H23V24ZM18 24C15.2386 24 13 21.7614 13 19H12C12 22.3137 14.6863 25 18 25V24ZM28 19C28 21.7614 25.7614 24 23 24V25C26.3137 25 29 22.3137 29 19H28ZM23 14C25.7614 14 28 16.2386 28 19H29C29 15.6863 26.3137 13 23 13V14ZM21.5 14H23V13H21.5V14ZM17.4551 13.0244C14.3965 13.3001 12 15.8699 12 19H13C13 16.3921 14.997 14.25 17.5449 14.0204L17.4551 13.0244ZM19 13C19 15.6079 17.003 17.75 14.4551 17.9796L14.5449 18.9756C17.6035 18.6999 20 16.1301 20 13H19ZM10.5 18H9V19H10.5V18Z" fill="black"/>
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
  align-items: flex-end;

  p {
    margin: 0;
  }

  .item-number {
    @extend .regular;
    display: flex;
    justify-content: flex-end;
    width: 64px;
    color: $label-1;
    padding: 8px 0;
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
    width: 100%;

    &:first-child {
      padding-top: 0;
    }

    svg {
      min-width: 32px;

      path {
        fill: $accent;
      }
    }

    &:visited {
      color: #BC18B2;

      svg path {
        fill: #BC18B2;
      }
    }

    &:hover {
      color: $red;

      svg path {
        fill: $red;
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

    .item-link {
      width: auto;
    }
  }
}
</style>