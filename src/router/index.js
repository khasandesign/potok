import { createRouter, createWebHistory } from "vue-router";
import typography from "../views/typography";
import home from "../views/home";
import profile from "../views/profile";
import createFlow from "../views/createFlow";
import errorPage from "../views/errorPage";
import signIn from "../views/signIn";
import mobileApp from "../views/mobileApp";
import search from "../views/search";
import store from '../store/'
import redirect from "../views/redirect";
import emailConfirm from "../views/emailConfirm";
import underConstraction from "../views/underConstraction";
import browserSupport from "../views/browserSupport";
import flow from "../views/flow";

/**
 * Guard for common users
 * @param to
 * @param from
 * @param next
 */
const authGuard = function (to, from, next) {
  if (!store.state.authorized) next({name: 'sign-in'})
  else next()
}

/**
 * Guard for pages, which can be visited only by non-authorized people
 * @param to
 * @param from
 * @param next
 */
// const authPrevent = function (to, from, next) {
//   if (store.state.authorized) next({path: '/'})
//   else next()
// }

/**
 * Guard for pages, which can not be visited optional, only in specific <br>
 * cases, otherwise go home
 * @param to
 * @param from
 * @param next
 */
// const goHome = function (to, from, next) {
//   next({name: 'home'})
// }

const routes = [
  {
    path: '/typography',
    name: 'typography',
    component: typography
  },
  {
    path: '/',
    component: home,
    name: 'home',
    meta: {
      navbar: 'default',
      footer: 'default'
    }
  },
  {
    path: '/flow',
    name: 'flow',
    // component: flow,
    component: flow,
    meta: {
      navbar: 'default',
      footer: 'default'
    }
  },
  {
    path: '/profile', // Editing profile functionality will be inside of this page
    component: profile,
    name: 'profile',
    beforeEnter: authGuard,
    meta: {
      navbar: 'default',
      footer: 'default'
    }
  },
  {
    path: '/create-flow', // This page include all steps of creating a flow
    name: 'create-flow',
    component: createFlow,
    props: true,
    beforeEnter: authGuard,
    meta: {
      navbar: 'create',
      footer: 'default'
    }
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    props: true,
    component: signIn,
    // beforeEnter: authPrevent,
  },
  {
    path: '/sign-in/confirm-email/:email/:acceptToken',
    name: 'confirm-email',
    component: emailConfirm
  },
  {
    path: '/search',
    component: search,
    name: 'search',
    meta: {
      navbar: 'default',
      footer: 'default'
    }
  },
  {
    path: '/mobile-app',
    component: mobileApp
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: redirect,
    props: true
  },
  {
    path: '/error',
    name: 'error-page',
    component: errorPage,
    // beforeEnter: goHome,
    meta: {
      navbar: 'default',
      footer: 'default'
    }
  },
  {
    path: '/under-construction',
    name: 'under-construction',
    component: underConstraction,
    // beforeEnter: goHome,
  },
  {
    path: '/browser-support',
    name: 'browser-support',
    component: browserSupport,
    // beforeEnter: goHome
  },
  {
    path: "/:catchAll(.*)",
    component: () => {
      if (!store.state.browser.underConstruction && store.state.browser.browserSupport) {
        store.commit('throwError', {
          status: 404
        })
      }
    },
    meta: {
      navbar: 'default',
      footer: 'default'
    }
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
});

export default router;
