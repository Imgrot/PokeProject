import { createApp } from 'vue'
import router from './routes/routes.js'
import App from './App.vue'
import './assets/index.css'
import VueApexCharts from "vue3-apexcharts";

createApp(App)
.use(router)
.use(VueApexCharts)
.mount('#app')
