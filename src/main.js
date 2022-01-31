import { createApp } from "vue"
import { createHead } from "@vueuse/head"
import App from "./App.vue"
import router from "./router"
import store from "./store/index"
import components from "@/components/components"
import directives from "@/directives"
import mixins from  "@/mixins"

import '@/assets/scss/app.scss'
import '@/assets/fonts/fonts.scss'

const app = createApp(App)
const head = createHead()

components.forEach(component => {
  app.component(component.name, component)
})

directives.forEach(directive => {
  app.directive(directive.name, directive)
})

mixins.forEach(mixin => {
  app.mixin(mixin)
})

app
    .use(head)
    .use(store)
    .use(router)
    .mount("#app")

