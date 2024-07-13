// https://nuxt.com/docs/api/configuration/nuxt-config

//定义变量
const commonUrl = 'http://localhost:3000'; //公共请求地址

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@element-plus/nuxt'],
  elementPlus: {
    //配置项
    icon: 'ElIcon'
  },
  compatibilityDate: '2024-07-13',
  //项目是前后端分离的,所以要做代理转发,解决跨域问题
  nitro: {
    devProxy: {
      '/api': {
        target: commonUrl,
        changeOrigin: true,
        prependPath: true
      },
      '/proxy/example': { target: 'https://example.com', changeOrigin: true }
    },
    // 该配置用于服务端请求转发
    routeRules: {
      '/api/**': {
        proxy: `${commonUrl}/**`
      }
    }
  },
  //定义应用的配置，这些配置可以在运行时动态地被访问
  runtimeConfig: {
    // 私密变量,获取使用
    apiSecret: '123456',
    dbPassword: process.env.PRIVATE_DB_PASSWORD || '',
    // 公共变量,获取使用
    public: {
      commonUrl: commonUrl,
      baseUrl: '/api'
    }
  }
});
