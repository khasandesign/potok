<template>
  <div class="loading-screen" v-if="loading">
    <img src="@/assets/images/UI/logo.svg" alt="Potok loading...">
  </div>

  <navbar :change="layout.navbar" v-if="showLayout()"></navbar>
  <router-view v-slot="slotProps" @navbar="changeNavbar" @footer="changeFooter" @notification="setNotification">
    <transition name="route" mode="out-in">
      <div v-if="$store.state.browser.underConstruction">
        <under-construction></under-construction>
      </div>
      <div v-else-if="!$store.state.browser.browserSupport">
        <browser-support></browser-support>
      </div>
      <div v-else-if="Object.keys($store.state.error).length">
        <error-page :error="$store.state.error"></error-page>
      </div>
      <component v-else :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <footbar :change="layout.footer" v-if="showLayout()"></footbar>

  <!-- Notifications bar -->
  <v-notifications :pushed="notification"></v-notifications>

  <!-- Modals -->
  <div class="modals">
    <div class="modal" ref="modalSignIn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <v-sign-in></v-sign-in>
        </div>
      </div>
    </div>
  </div>

  <!-- Context menu -->
  <v-contextmenu
      :context="$store.state.context"
      @notification="setNotification"
  ></v-contextmenu>
</template>

<script>
import {Modal} from 'bootstrap';
import changeFavicon from "./mixins/changeFavicon";
import BrowserSupport from "./views/browserSupport";
import browserDetect from "./mixins/browserDetect";

export default {
  components: {BrowserSupport},
  data() {
    return {
      modalSignIn: null,
      loading: true,
      notification: {},
      layout: {
        navbar: '',
        footer: ''
      },
    }
  },
  mixins: [changeFavicon, browserDetect],
  methods: {
    /**
     * Set a new navbar
     * @param navbar
     */
    changeNavbar(navbar) {
      this.layout.navbar = navbar
    },

    /**
     * Set a new footer
     * @param footer
     */
    changeFooter(footer) {
      this.layout.footer = footer
    },

    /**
     * Push a notification form the emitted event
     * @param notification
     */
    setNotification(notification) {
      this.notification = notification
    },

    /**
     * Check all env factors and decide does it need to show navbar/footer layout
     */
    showLayout() {
      return !this.$store.state.browser.underConstruction && this.$store.state.browser.browserSupport;
    }
  },
  beforeMount() {
    let browser = this.browserDetect()
    this.$store.commit('checkBrowser', browser)
  },
  mounted() {
    this.loading = false
    this.modalSignIn = new Modal(this.$refs.modalSignIn)

    // Show Mobile App page if window width is less than 768px
    let vm = this
    window.addEventListener('resize', function () {
      if (window.innerWidth <= 768) {
        vm.$router.push('/mobile-app')
      }
    })

    // Set favicon
    setTimeout(() => {
      if (this.$store.state.authorized === false) {
        // Set default favicon
        this.changeFavicon("UI/favicon-light-mode.svg", "UI/favicon-dark-mode.svg")
      } else {
        // Set avatar favicon
        this.changeFavicon("user/original/profile.jpg")
      }
    }, 100)
  },
}
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}

/* route transitions */
.route-enter-active {
  transition: all 0.1s ease-in;
}

.route-leave-active {
  transition: all 0.1s ease-out;
}

.route-leave-to {
  opacity: 0;
}

.route-enter-from {
  opacity: 0;
}

/* loading */
.loading-screen {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: $bg-primary;
  z-index: 999;

  img {
    width: 100px;
    height: 100px;
  }
}

* {
  margin: 0;
  padding: 0;
}

.section, .description, .subsection {
  font-size: 12px;
  line-height: 14px;
  font-family: "Inter", sans-serif;
  margin: 0;
}

.section {
  color: rgba(0, 0, 0, 0.3);
  padding: 40px 0;
}

.subsection {
  color: rgba(0, 0, 0, 0.3);
  padding-bottom: 4px;
}

.description {
  color: rgba(0, 0, 0, 0.2);
}

section {
  margin-top: 28px;
}

.modals {
  .modal {
    .modal-dialog {
      width: 100%;
      margin: 0;
      max-width: 100%;

      .modal-content {
        background: transparent;
        border: none;
        pointer-events: none;

        > .container {
          pointer-events: none;
        }

        * {
          pointer-events: auto;
        }
      }
    }
  }
}

.skeleton-animation {
  > .skeleton-body {
    background-color: $gray-03;
    animation: skeleton-animation 2s infinite;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
}

@keyframes skeleton-animation {
  0% {
    background-color: $gray-03;
  }
  50% {
    background-color: $gray-06;
  }
  100% {
    background-color: $gray-03;
  }
}
</style>
