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
    component: flow
  },
  {
    path: '/profile', // Editing profile functionality will be inside of this page
    component: profile
  },
  {
    path: '/create-flow', // This page include all steps of creating a flow
    component: createFlow
  },
  {
    path: '/sign-in',
    component: signIn
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
    path: '/error/',
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
  }
});

export default router;
