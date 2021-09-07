import { createRouter, createWebHistory } from "vue-router";
import typography from "../views/typography";
import home from "../views/home";
import flow from "../views/flow";
import profile from "../views/profile";
import createFlow from "../views/createFlow";

const routes = [
  {
    path: '/typography',
    component: typography
  },
  {
    path: '/',
    component: home,
    meta: {
      title: '1332'
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
