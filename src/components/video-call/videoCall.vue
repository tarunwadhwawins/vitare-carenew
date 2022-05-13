<template>
<div>
    <!---->
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <Sidebar />
            <a-layout-content>
                <div class="common-bg">
                    <a-row>
                        <a-col :span="24">
                            <div class="videoCallHeading">
                                <h2 class="pageTittle">Video Call </h2> <span></span><img width="30" src="../../assets/images/flag-orange.svg">
                            </div>
                        </a-col>
                    </a-row>
                    <div class="videoWrapper">
                            <!-- video call  -->'
                            <div class="leftWrapper" id="videoDiv">
                                
                              <div class="videoCall" >
                                  <video id="videoCallLoader" ref="videoCall"></video>
                              </div>
                              <Loader />
                            </div>
                            <div class="callRightWrapper" id="detailDiv">
                              <span class="dragImg" @mousedown="resize($event)"><img src="@/assets/images/drag.png" alt="" ></span>
                              <div class="header" v-if="acceptVideoCallDetails">
                                    <!-- <img :src="acceptVideoCallDetails?acceptVideoCallDetails.patient.profilePhoto:defaultImage" /> -->
                                    <img src="@/assets/images/userAvatar.png"  />
                                    <div class="name">
                                        <h4>{{acceptVideoCallDetails.name}}</h4>
                                        <router-link v-if="acceptVideoCallDetails" :to="{ name: 'PatientSummary', params: { udid:acceptVideoCallDetails?acceptVideoCallDetails.patient.id:'' }}" target="_blank">View Profile</router-link>
                                    </div>
                                    <!-- <span class="callTime">7:20</span> -->
                                </div>
                                <div class="header" v-else-if="getVideoDetails">
                                    <!-- <img :src="getVideoDetails?getVideoDetails.patientDetailed.profilePhoto:'@/assets/images/userAvatar.png'" /> -->
                                    <img src="@/assets/images/userAvatar.png" />
                                    <div class="name">
                                        <h4>{{getVideoDetails?getVideoDetails.patient:''}}</h4>
                                        <router-link v-if="getVideoDetails" :to="{ name: 'PatientSummary', params: { udid:getVideoDetails?getVideoDetails.patientDetailed.id:'' }}" target="_blank">View Profile</router-link>
                                    </div>
                                    <!-- <span class="callTime">7:20</span> -->
                                </div>
                                
                                <div class="body">
                                    <a-row>
                                        <a-col :span="6" :class="notesDetailVisible==true?'bold':''">
                                            <div class="moreAction" @click="showNotesModal" >
                                                <div class="moreActionImg four">
                                                    <img src="../../assets/images/edit.svg" />
                                                </div>
                                                <p>Notes</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6" :class="documentDetailVisible==true?'bold':''">
                                            <div class="moreAction"  @click="showDocumentsModal">
                                                <div class="moreActionImg green">
                                                    <img src="../../assets/images/report.svg" />
                                                </div>
                                                <p>Document</p>
                                            </div>
                                        </a-col>
                                        
                                        <a-col :span="6" @click="showVitalssModal" :class="patientVitalsVisible==true?'bold':''">
                                            <div class="moreAction">
                                                <div class="moreActionImg redBgColor">
                                                    <img src="../../assets/images/wave.svg" />
                                                </div>
                                                <p>Vital</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6" v-if="currentUrl" >
                                            <div class="moreAction"  @click="copyURL(currentUrl)">
                                                <div class="moreActionImg purpleBgColor">
                                                    <!-- <img src="../../assets/images/edit.svg" /> -->
                                                    <CopyFilled  />
                                                </div>
                                                <p>Copy Url</p>
                                            </div>
                                        </a-col>
                                    </a-row>
                                    <a-row class="overFlow">
                                     
                                     <NotesDetail v-if="notesDetailVisible==true"   :Id="getVideoDetails?getVideoDetails.patientDetailed.id:acceptVideoCallDetails.patient.id" />
                <DocumentDetail v-if="documentDetailVisible==true"    :patientDetails="getVideoDetails?getVideoDetails.patientDetailed:acceptVideoCallDetails.patient"  />
                <PatientVitalsDetails v-if="patientVitalsVisible == true"  :patientId="getVideoDetails?getVideoDetails.patientDetailed.id:acceptVideoCallDetails.patient.id"  />
                                    </a-row>
                                </div>
                                <div class="footer">
                                    <a-button class="endCall" :size="size" block @click="hangUp()">End Call</a-button>
                                </div>
                            </div>
                    </div>
                </div>
                 
            </a-layout-content>
        </a-layout>
    </a-layout>
</div>
</template>
<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import {
  ref,
  onMounted,
  computed,
  reactive,
  watchEffect,
  onUnmounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Loader from "@/components/loader/VideoLoader";
import { Web } from "@/assets/js/sip-0.20.0";
import { notification } from "ant-design-vue";
import { successSwal, deCodeString } from "@/commonMethods/commonMethod";
import NotesDetail from "@/components/video-call/table/NotesDetail";
import DocumentDetail from "@/components/video-call/table/DocumentDetail";
import PatientVitalsDetails from "@/components/video-call/table/PatientVitalsDetails";
import { CopyFilled } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

export default {
  components: {
    CopyFilled,
    Header,
    Sidebar,
    Loader,
    NotesDetail,
    DocumentDetail,
    PatientVitalsDetails,
  },

  setup() {
    // the DOM element(video) will be assigned to the ref after initial render
    const sipDomain = process.env.VUE_APP_SIP_DOMAIN;
    const store = useStore();
    const videoCall = ref();
    const notesDetailVisible = ref(false);
    const documentDetailVisible = ref(false);
    const patientVitalsVisible = ref(false);
    const decodedUrl = ref();
    const route = useRoute();
    const router = useRouter();
    //copy url
    const currentUrl = ref();
    async function copyURL(url) {
      try {
        await navigator.clipboard.writeText(url);
        message.success("Copied");
      } catch ($e) {
        message.error("Cannot copy");
      }
    }
    //end url

    const upcomingCallDetails = reactive({
      user: "",
    });

    const simpleUserHangup = ref();
    const session = computed(() => {
      return store.state.authentication.simpleUser;
    });

    const authentication = computed(() => {
      return store.state.authentication;
    });

    const guestUser = computed(() => {
      return store.state.videoCall;
    });

    onMounted(() => {
      if(route.params.id){
        store.dispatch("guestUser",{
          conference:deCodeString(route.params.id),
          name:authentication.value.loggedInUser.user.name,
          email:authentication.value.loggedInUser.user.email
          }).then(()=>{
        store.dispatch("getVideoDetails", deCodeString(route.params.id));
        store.commit("videoLoadingStatus", true);
        //accept videoCall code
        if (session.value) {
          //  store.commit("loadingStatus", false);
          session.value.options.media.remote = {
            video: videoCall.value ? videoCall.value : <video></video>,
          };
          //getting upcoming call user details
          upcomingCallDetails.user =
            session.value.session.incomingInviteRequest.message.from.uri.raw.user;
          store.dispatch(
            "acceptVideoCallDetails",
            upcomingCallDetails.user.substring(2)
          );
          session.value.answer();
        } //end accept video call

        //Start conference video call code
        else {
          if (route.params.id) {
            // store.commit("loadingStatus", false);
            currentUrl.value = window.location.href;
            decodedUrl.value = deCodeString(route.params.id);
            let callNotification = 0;
            const key = `open${Date.now()}`;
            authentication.value.options = Web.SimpleUserOptions = {
              aor: `sip:${guestUser.value.guestUser.sipId}@${sipDomain}`,
              media: {
                constraints: {
                  audio: true,
                  video: true,
                },
                remote: {
                  video: videoCall.value ? videoCall.value : <video></video>,
                },
              },
              delegate: {
                onCallHangup: async () => {
                  if (callNotification == 1) {
                    notification.close(key);
                  } else {
                    store.state.videoCall.getVideoDetails = null;
                    store.state.videoCall.acceptVideoCallDetails = null;
                    //call end api
                    store.dispatch("callNotification", {
                      id: conferenceId.value,
                      status: "end",
                    });
                    successSwal("Call Ended! Thank You");
                    router.push("/dashboard");
                  }
                },
              },
              userAgentOptions: {
                displayName: guestUser.value.guestUser.sipId,
                authorizationPassword: "123456",
                authorizationUsername: guestUser.value.guestUser.sipId,
                sessionDescriptionHandlerFactoryOptions: {
                  peerConnectionOptions: {
                    rtcConfiguration: {
                      iceServers: [
                        {
                          urls: "stun:stun.xten.com",
                        },
                        {
                          urls: "turn:numb.viagenie.ca",
                          username: "mailto:webrtc@live.com",
                          credential: "muazkh",
                        },
                      ],
                    },
                  },
                },
              },
            };

            // Construct a SimpleUser instance
            const simpleUser = new Web.SimpleUser(
              authentication.value.server,
              authentication.value.options
            );
            // Connect to server and place call
            simpleUser
              .connect()
              .then(() => {
                simpleUser.register().then(() => {
                  //call start api/
                  store.dispatch("callNotification", {
                    id: decodedUrl.value,
                    status: "start",
                  });
                  simpleUser.call(`sip:${decodedUrl.value}@${sipDomain}`);
                  simpleUserHangup.value = simpleUser;
                });
              })
              .catch((error) => {
                console.log(error);
              });
            // }
          } else {
            router.push("/dashboard");
          }
        } //end conference video call
      })
      }
    });
    function resize(){
    window.addEventListener('mousemove', resizeDiv);
  }
  function resizeDiv(e){
    let video_width = (e.clientX/document.body.clientWidth)*100;

    document.getElementById('videoDiv').style.width = video_width+"%";
  }
  window.addEventListener('mouseup', e => {
    console.log(e)
    window.removeEventListener("mousemove", resizeDiv);
  });
    // Answer call
    function hangUp() {
      if (decodedUrl.value) {
        simpleUserHangup.value.hangup().then(() => {
          //call end api
          // store.dispatch("callNotification",{id:decodedUrl.value,status:'end'})
          store.state.videoCall.getVideoDetails = null;
          store.state.videoCall.acceptVideoCallDetails = null;
          store.state.videoCall.conferenceId = null;
          store.state.videoCall.guestUser = null;
          // router.push("/dashboard");
        });
      } else {
        session.value.hangup().then(() => {
          router.push("/dashboard");
        });
      }
    }

    const conferenceId = computed(() => {
      return store.state.communications.conferenceId;
    });

    const getVideoDetails = computed(() => {
      return store.state.videoCall.getVideoDetails;
    });

    const acceptVideoCallDetails = computed(() => {
      return store.state.videoCall.acceptVideoCallDetails;
    });

    const showNotesModal = () => {
       notesDetailVisible.value = true
       documentDetailVisible.value = false
       patientVitalsVisible.value = false
     
    };
   
    const showDocumentsModal = () => {
      documentDetailVisible.value = true;
      notesDetailVisible.value = false
     
     patientVitalsVisible.value = false
    };
    const showVitalssModal = () => {
      patientVitalsVisible.value = true;
      notesDetailVisible.value = false
     documentDetailVisible.value = false
    
    };

    // used for patient vital
    watchEffect(() => {
      if (getVideoDetails.value != null) {
        videoLoader();
        store.dispatch("patientVitals", {
          patientId: getVideoDetails.value.patientDetailed.id,
          deviceType: 99,
        });
        store.dispatch("patientVitals", {
          patientId: getVideoDetails.value.patientDetailed.id,
          deviceType: 100,
        });
        store.dispatch("patientVitals", {
          patientId: getVideoDetails.value.patientDetailed.id,
          deviceType: 101,
        });
        store.dispatch("devices", getVideoDetails.value.patientDetailed.id);
      } else if (acceptVideoCallDetails.value != null) {
        videoLoader();
        store.dispatch("patientVitals", {
          patientId: acceptVideoCallDetails.value.patient.id,
          deviceType: 99,
        });
        store.dispatch("patientVitals", {
          patientId: acceptVideoCallDetails.value.patient.id,
          deviceType: 100,
        });
        store.dispatch("patientVitals", {
          patientId: acceptVideoCallDetails.value.patient.id,
          deviceType: 101,
        });
        store.dispatch("devices", acceptVideoCallDetails.value.patient.id);
      }
    }); //end

    function videoLoader() {
      // start loader untill load video element
      let MuteInterval = setInterval(function () {
        //start loader
        store.commit("videoLoadingStatus", true);
        if (!document.querySelector("#videoCallLoader").paused) {
          //remove loder
          store.commit("videoLoadingStatus", false);
          clearInterval(MuteInterval);
        }
      }, 3000);
    }

    onUnmounted(() => {
      store.commit("videoLoadingStatus", false);
       store.state.videoCall.getVideoDetails = null;
          store.state.videoCall.acceptVideoCallDetails = null;
          store.state.videoCall.conferenceId = null;
          store.state.videoCall.guestUser = null;
    });

    return {
      
      guestUser,
      videoLoader,
      decodedUrl,
      copyURL,
      currentUrl,
      deCodeString,
      showVitalssModal,
      patientVitalsVisible,
      showDocumentsModal,
      documentDetailVisible,
      showNotesModal,
      notesDetailVisible,
      acceptVideoCallDetails,
      upcomingCallDetails,
      getVideoDetails,
      simpleUserHangup,
      conferenceId,
      hangUp,
      videoCall,
      size: ref("large"),
      resize
    };
  },
};
</script>
<style lang="scss" scope>
.overFlow{
  height: 500px;
  overflow: auto;
}
.bold{
  font-weight: bold;
}
</style>
