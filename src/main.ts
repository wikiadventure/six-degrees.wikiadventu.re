import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from "./i18n";
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
// Import Quasar css
import 'quasar/src/css/index.sass'


createApp(App)
  .use(i18n)
  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  .mount('#app');
