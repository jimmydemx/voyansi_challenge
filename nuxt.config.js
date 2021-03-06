// const envConfig = require('dotenv').config({
//   path: `.env${process.env.ENV ? `.${process.env.ENV}` : ''}`
// })

require('dotenv').config()

module.exports={
  // Global page headers: https://go.nuxtjs.dev/config-head
  dev: process.env.NODE_ENV !== 'production',
  telemetry: false,

  env:{MONGOLAB_URI:"mongodb+srv://voyansi-challenge-james:1qaz2wsx@cluster0.t2z17.mongodb.net/voyansi-challenge-james?retryWrites=true&w=majority"},
  publicRuntimeConfig: {
    MONGOLAB_URI:"123"

  },

  head: {
    title: 'voyansi_challenge',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [


  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
