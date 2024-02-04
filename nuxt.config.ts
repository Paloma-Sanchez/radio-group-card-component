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
  ],
  googleFonts: {    
    families: {
      'Black Ops One': true,      
      'Pacifico':true,
      'Abril Fatface ':true,
      'Orbitron':true,
      'Righteous':true,
      'Montserrat Alternates': true,
      'Cinzel': true,
      'Courgette': true,
    }
  },
  colorMode: {
    preference: 'light'
  }
})
