import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import './assets/scss/common.scss'
import VueApexCharts from "vue3-apexcharts";
createApp(App).use(Antd).use(VueApexCharts).use(store).use(router).mount('#app')


