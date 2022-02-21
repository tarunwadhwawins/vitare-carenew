import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import i18n from './locales/i18n'
import store from './store'
import './assets/scss/common.scss'
import { warningSwal } from "@/commonMethods/commonMethod";
// import { messages } from "@/config/messages";
import VueApexCharts from "vue3-apexcharts";
import { Web } from './assets/js/sip-0.20.0'

const app = createApp(App)


let loginDetails = store.state.authentication //Getting logged user details
console.log('loginDetails',loginDetails);
if(loginDetails.token){
// Options for SimpleUser
const options= Web.SimpleUserOptions = {
    aor:`sip:${loginDetails.token.sipId}@dev.icc-heaalth.com`,
    media: {
      constraints: {
        // This demo is making "video only" calls
        audio: true,
        video: true
      },
    },
    delegate: {
        onCallReceived: async () => {
        //   console.log('Incoming Call!');
          console.log('simpleUser',simpleUser);
         // simpleUser.answer();
         warningSwal(simpleUser.session.incomingInviteRequest.message.from._displayName).then((response) => {
            if (response == true) {
                app.provide('sipSession', simpleUser)
                router.push('/video-call')
            } else {
                simpleUser.hangup()
            }
        })
         
        }
      },
    userAgentOptions: {
      // logLevel: "debug",
      displayName:loginDetails.token.name,
      authorizationPassword:"123456",
      authorizationUsername:"UR270",
      sessionDescriptionHandlerFactoryOptions: {
        peerConnectionOptions: {
          rtcConfiguration : {
              iceServers: [{
                urls: "stun:stun.xten.com"
              }, {
                urls: "turn:numb.viagenie.ca",
                username: "mailto:webrtc@live.com",
                credential: "muazkh"
              }]
            },
        },
      },
    }
  };


  const server = "wss://dev.icc-health.com:7443";
  // Construct a SimpleUser instance
  const simpleUser = new Web.SimpleUser(server, options);
  // Connect to server and place call
  simpleUser.connect()
    .then(() => {
        // console.log("hello");
        simpleUser.register();
    })
    .catch((error) => {
        console.log(error);
    });
}

app.use(Antd).use(VueApexCharts).use(store).use(router).use(i18n).mount('#app')


