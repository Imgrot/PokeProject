import { createApp } from 'vue'
import router from './routes/routes.js'
import App from './App.vue'
import './assets/index.css'
import VueApexCharts from "vue3-apexcharts";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore);

createApp(App)
.use(router)
.use(DataTable)
.use(VueApexCharts)
.mount('#app')
