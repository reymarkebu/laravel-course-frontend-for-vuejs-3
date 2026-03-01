// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss", "@formkit/nuxt"],
  css: ["@/assets/main.css"],
  tailwindcss: {
    config: {
      content: ["./node_modules/laravel-vue-pagination/**/*.vue"],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000", // added this one
      appURL: "http://localhost",
    },
  },
  routeRules: {
    "/profiles/*": { swr: true },
    "/*": { ssr: false },
  },
});
