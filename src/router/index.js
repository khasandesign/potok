import { createRouter, createWebHistory } from "vue-router";
import typography from "../views/typography";
import home from "../views/home";
import flow from "../views/flow";
import profile from "../views/profile";
import createFlow from "../views/createFlow";
import errorPage from "../views/errorPage";
import signIn from "../views/signIn";
import mobileApp from "../views/mobileApp";
import search from "../views/search";
import store from '../store/'
import redirect from "../views/redirect";
import emailConfirm from "../views/emailConfirm";

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
 * Guard for pages, which can be used only by non-authorized people
 * @param to
 * @param from
 * @param next
 */
const authPrevent = function (to, from, next) {
  if (store.state.authorized) next({path: '/'})
  else next()
}

const routes = [
  {
    path: '/typography',
    component: typography
  },
  {
    path: '/',
    component: home,
    meta: {
      permission: 'user'
    }
  },
  {
    path: '/flow',
    name: 'flow',
    component: flow
  },
  {
    path: '/profile', // Editing profile functionality will be inside of this page
    component: profile,
    beforeEnter: authGuard
  },
  {
    path: '/create-flow', // This page include all steps of creating a flow
    component: createFlow,
    beforeEnter: authGuard
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: signIn,
    beforeEnter: authPrevent
  },
  {
    path: '/sign-in/confirm-email/:email/:acceptToken',
    component: emailConfirm
  },
  {
    path: '/search',
    component: search
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
  },
  {
    path: "/:catchAll(.*)",
    component: () => {
      store.commit('throwError', {
        status: 404
      })
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
