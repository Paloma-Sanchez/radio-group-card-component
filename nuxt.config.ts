// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css:[
    './assets/css/vello.css', 
    './assets/css/main.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', 
    '@nuxt/ui', 
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-icon'
  ],
  googleFonts: {    
    families: {
      'DM Sans': true,      
    }
  },
  colorMode: {
    preference: 'light'
  },
  ui: {
    safelistColors: ["red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose","primary"]
  }
})
