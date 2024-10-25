// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'luna-main',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        { rel: 'stylesheet', href: '/assets/fontawesome/css/all.min.css' },
        { rel: 'stylesheet', href: '/assets/xeicon/xeicon.min.css' },
        { rel: 'stylesheet', href: '/assets/pretendard/web/static/pretendard.css' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  compatibilityDate: '2024-04-03',
  modules: [ '@nuxtjs/tailwindcss', '@vueuse/nuxt' ],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiEndpoint: process.env.API_ENDPOINT,
      build: process.env.BUILD
    }
  },
  build: {

  },
  devServer: {
    host: '0.0.0.0'
  }
})
