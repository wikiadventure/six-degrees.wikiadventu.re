import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import Icons from 'unplugin-icons/vite';
// import ssl from '@vitejs/plugin-basic-ssl';
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ssl(),
    vue(),
    vueI18n({}),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    }),
  ],
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
    cssMinify: 'lightningcss'
  }
})
