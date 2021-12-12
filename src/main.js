import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import VueApexCharts from 'vue3-apexcharts'
import i18n from './locales/i18n'
import 'ant-design-vue/dist/antd.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import './assets/scss/common.scss'
import 'vue-loading-overlay/dist/vue-loading.css'
createApp(App).use(Antd).use(VueApexCharts).use(store).use(router).use(i18n).mount('#app')


