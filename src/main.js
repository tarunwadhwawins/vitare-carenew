import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router'
import store from './store'
import './assets/scss/common.scss'
import "vue-loading-overlay/dist/vue-loading.css"
import VueApexCharts from "vue3-apexcharts";
createApp(App).use(Antd).use(VueApexCharts).use(store).use(router).mount('#app')


