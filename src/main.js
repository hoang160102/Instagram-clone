import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css";
import MainContent from "./components/MainContent.vue";
import store from "./state/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./input.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import clickOutside from './directives/clickOuside.js';

const options = {
  position: "top-right",
  timeout: 1414,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});
let app
const auth = getAuth()
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.component("main-content", MainContent);
    app.use(vuetify);
    app.use(router);
    app.use(Toast, options)
    app.use(store)
    app.directive('click-outside', clickOutside);
    app.mount("#app");
  }
})
