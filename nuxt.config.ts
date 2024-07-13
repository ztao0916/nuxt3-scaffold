// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@element-plus/nuxt'],
  elementPlus: {
    //配置项
    icon: 'ElIcon'
  },
  compatibilityDate: '2024-07-13'
});
