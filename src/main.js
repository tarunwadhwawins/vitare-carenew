import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import i18n from './locales/i18n'
import store from './store'
import './assets/scss/common.scss'
import VueApexCharts from "vue3-apexcharts";




const app = createApp(App)

// video call config
// if(store.state.authentication.loggedInUser){
// store.getters.videoCall;
// }

 

app.use(Antd).use(VueApexCharts).use(store).use(router).use(i18n).mount('#app')


