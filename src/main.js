import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import MainContent from "./components/MainContent.vue";
import "./input.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);
app.component("main-content", MainContent);
app.use(vuetify);
app.use(router);
app.mount("#app");
