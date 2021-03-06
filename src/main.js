import { createApp,h } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import i18n from './locales/i18n'
import store from './store'
import './assets/scss/common.scss'
import VueApexCharts from "vue3-apexcharts";
import { notification, Button } from "ant-design-vue";

const app = createApp(App)

// Firebase for push notifications
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyARXttm2zCcHO6spiUj1v61HAZqWc9E9oU",
    authDomain: "rpmdemoapp-16785.firebaseapp.com",
    projectId: "rpmdemoapp-16785",
    storageBucket: "rpmdemoapp-16785.appspot.com",
    messagingSenderId: "849086876464",
    appId: "1:849086876464:web:c83c77d045851fef4556f5",
    measurementId: "G-XJW2B0HXTL"
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging();
getToken(messaging, { vapidKey: 'BLuPXuT693CDqZoVL-uUKfn-VFDHGail1U9Dk6i8krkcyjvmkvLSrGn2un21gjiEAUnJ6bdCAMNSrIoHeSaqW60' }).then((currentToken) => {
    console.log("tokenFirebase", currentToken);
    localStorage.setItem('fireBaseToken',currentToken)
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        

    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  store.dispatch('notificationList')
  const key = `open${Date.now()}`;
  notification.open({
    message: <div><h2>{`${payload.notification.title}`}</h2></div>,
    description: <div> {`${payload.notification.body}`} </div>,
    btn: [
        h(Button, {
            onClick: () => {   notification.close(key) },
        },
            "Cancel "
        ),
        h(Button, {
            type: "primary",
            onClick: () => { if(payload.data.type=="Appointment"){
                router.push('/appointment-calendar'),
                notification.close(key)
            }else{
                router.push('/communications'),
                notification.close(key)
            }
              
            }
        },
            "ok"
        ),

    ],
    key,
    onClose: () => {   notification.close(key) },
    duration: null,
    placement: 'bottomRight'

})
  // ...
});

//end firebase


// video call config
if (store.state.authentication.loggedInUser) {
    store.getters.videoCall;
}



app.use(Antd).use(firebaseApp).use(VueApexCharts).use(store).use(router).use(i18n).mount('#app')


