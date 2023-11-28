import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify } from "quasar";

import App from "./App.vue";
import router from "./router";
import quasarIconSet from "quasar/icon-set/mdi-v7";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";

import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(createPinia());

app.use(Quasar, {
    plugins: { Notify }, // import Quasar plugins and add here
    iconSet: quasarIconSet,
});

app.use(router);

app.mount("#app");
