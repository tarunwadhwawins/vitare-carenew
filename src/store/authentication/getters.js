import { Web } from '@/assets/js/sip-0.20.0'
import { h } from 'vue'
import router from '@/router/index'
import state from './state';
import { notification, Button } from "ant-design-vue";
import { successSwal } from '@/commonMethods/commonMethod';


export function videoCall() {
    let callNotification =0
    const key = `open${Date.now()}`;
    state.options = Web.SimpleUserOptions = {
        aor: `sip:${state.loggedInUser.user.sipId}@tele.icc-heaalth.com`,
        media: {
            constraints: {
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
                        h(Button, {
                            onClick: () => { callNotification=0, simpleUser.hangup(), notification.close(key) },
                        },
                            "Cancel "
                        ),
                        h(Button, {
                            type: "primary",
                            onClick: () => {
                                callNotification=0
                                state.simpleUser = simpleUser,
                                router.push('/video-call'), notification.close(key)
                            }
                        },
                            "Accept"
                        ),

                    ],
                    key,
                    onClose: () => { callNotification=0, simpleUser.hangup(), notification.close(key) },
                    duration: null,
                    placement: 'bottomRight'

                })

            },
            
            onCallHangup: async () => {
            if(callNotification==1){
                // console.log('callHangValue',callNotification);
                notification.close(key)
            }else{
                successSwal('Call Ended! Thank You')
                router.push('/dashboard')
            }
            }
        },
        userAgentOptions: {
            // logLevel: "debug",
            displayName: state.loggedInUser.user.sipId,
            authorizationPassword: "123456",
            authorizationUsername: state.loggedInUser.user.sipId,
            sessionDescriptionHandlerFactoryOptions: {
                peerConnectionOptions: {
                    rtcConfiguration: {
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
