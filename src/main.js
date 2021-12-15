import { createApp } from "vue";
import { createHead } from '@vueuse/head'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/components";
import directives from '@/directives';

// App scss and bootstrap connecting
import '@/assets/scss/app.scss'
// Fonts connecting
import '@/assets/fonts/fonts.scss'

const app = createApp(App)
const head = createHead()

// Registering components
components.forEach(component => {
  app.component(component.name, component)
});

// Register directives
directives.forEach(directive => {
  app.directive(directive.name, directive)
});

app
    .use(head)
    .use(store)
    .use(router)
    .mount("#app");

