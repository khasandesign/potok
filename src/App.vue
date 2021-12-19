<template>
  <div class="loading-screen" v-if="loading">
    <img src="@/assets/images/logo.svg" alt="Potok loading...">
  </div>

  <navbar v-if="navbar" :view="navbar"></navbar>
  <router-view v-slot="slotProps" @navbar="getNavbar" @footer="getFooter">
    <transition name="route" mode="out-in">
      <div v-if="Object.keys($store.state.error).length">
        <error-page :error="$store.state.error"></error-page>
      </div>
      <component v-else :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <footer-default v-if="footer"></footer-default>

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
  <v-contextmenu :context="$store.state.context"></v-contextmenu>
</template>

<script>
import {Modal} from 'bootstrap';
import changeFavicon from "./mixins/changeFavicon";

export default {
  data() {
    return {
      navbar: "default",
      footer: true,
      modalSignIn: null,
      loading: true
    }
  },
  mixins: [changeFavicon],
  methods: {
    getNavbar(view) {
      this.navbar = view
    },
    getFooter(view) {
      this.footer = view
    }
  },
  mounted() {
    this.loading = false

    this.modalSignIn = new Modal(this.$refs.modalSignIn)

    // Show Mobile App page if window width is less than 768px
    if (window.innerWidth <= 768) {
      this.$router.push('/mobile-app')
    }

    this.changeFavicon('profile.jpg')
  },
}
</script>

<style lang="scss">
@import "/assets/scss/themes/light/colors";

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
