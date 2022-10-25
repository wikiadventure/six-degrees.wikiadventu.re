import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import Icons from 'unplugin-icons/vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n(),
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    }),
  ]
})
