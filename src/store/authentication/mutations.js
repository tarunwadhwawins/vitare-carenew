import { Web } from '@/assets/js/sip-0.20.0'
import router from '@/router/index'
import { successSwal } from "@/commonMethods/commonMethod";
import { h } from 'vue'
import { notification, Button } from "ant-design-vue";

const key = `open${Date.now()}`;
let date = new Date();
export const loginSuccess = async (state, data) => {
  state.token = data.user;
  state.loggedInUser=JSON.parse(localStorage.getItem('auth')),
  state.expiresIn= data?date.setSeconds(date.getSeconds() + ((data.expiresIn/100)-10)):localStorage.getItem('expiresIn')
  state.loginErrorMsg = null;
  let callNotification = 0
// console.log('loginDetails=>',state.loggedInUser.user.sipId);
state.options= Web.SimpleUserOptions = {
    aor:`sip:${state.loggedInUser.user.sipId}@tele.icc-heaalth.com`,
    media: {
      constraints: {
        // This demo is making "video only" calls
        audio: true,
        video: true
      },
    },
    delegate: {
        onCallReceived: async () => {
        callNotification=1
        notification.open({
          message: <h3>Call from...</h3>,
          description: <h1>{`${simpleUser.session.incomingInviteRequest.message.from._displayName}`} </h1>,
          btn: [
              h(Button,{
                  onClick: () => { callNotification=0,simpleUser.hangup(),notification.close(key)},
                },
                "Cancel "
              ),
              h(Button,{
                  type: "primary",
                  onClick: () =>  {callNotification=0,state.simpleUser = simpleUser,
                  router.push('/video-call'),notification.close(key)}
                },
                "Accept"
              ),
             
            ],
            key,
          onClose: ()=>{callNotification=0,simpleUser.hangup(),notification.close(key)},
         duration:null,
         placement:'bottomRight'
          
        }) 
        },
        onCallHangup: async () => {
          if(callNotification==1){
              console.log('callHangValue',callNotification);
              notification.close(key)
          }else{
            successSwal('Call Ended! Thank You')
            router.push('/dashboard')
          }
          }
      },
    userAgentOptions: {
      // logLevel: "debug",
      displayName:state.loggedInUser.user.sipId,
      authorizationPassword:"123456",
      authorizationUsername:state.loggedInUser.user.sipId,
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


   // Construct a SimpleUser instance
   const simpleUser = new Web.SimpleUser(state.server, state.options);
   // Connect to server and place call
   simpleUser.connect()
     .then(() => {
         // console.log("hello");
         simpleUser.register();
     })
     .catch((error) => {
         console.log(error);
     });
 // }



}


export const logoutSuccess = async (state) => {
  const simpleUser = new Web.SimpleUser(state.server, state.options);
  state.logout = null;
  state.token = null;
  state.errorMsg = null;
  state.accessPermission=null
  simpleUser.disconnect()
	state.options = null
	state.loggedInUser = null
	state.simpleUser=null
	state.acceptVideoCallDetails=null
}

export const refreshTokenSuccess = async (state, token) => {
  state.refreshToken = token;
  state.loginErrorMsg = null;
}

export const loginFailure = (state, error) => {
  state.errorMsg = error;
}


export const accessPermission = (state, data) => {
  state.accessPermission = data;
}


export const expiresIn = (state, data) => {
  state.expiresIn = data;
}

