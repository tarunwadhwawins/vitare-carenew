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
                    <a-row :gutter="24">
                        <a-col :xl="16" :lg="14">
                            <Loader />
                            <!-- video call  -->
                            <div class="videoCall">
                                <video ref="videoCall"></video>
                            </div>
                        </a-col>
                        <a-col :xl="8" :lg="10">
                            <div class="callRightWrapper">
                              <div class="header" v-if="acceptVideoCallDetails">
                                    <img :src="acceptVideoCallDetails?acceptVideoCallDetails.patient.profilePhoto:''" />
                                    <div class="name">
                                        <h4>{{acceptVideoCallDetails.name}}</h4>
                                        <router-link v-if="acceptVideoCallDetails" :to="{ name: 'PatientSummary', params: { udid:acceptVideoCallDetails?acceptVideoCallDetails.patient.id:'' }}">View Profile</router-link>
                                    </div>
                                    <span class="callTime">7:20</span>
                                </div>
                                <div class="header" v-else>
                                    <img :src="getVideoDetails?getVideoDetails.patientDetailed.profilePhoto:''" />
                                    <div class="name">
                                        <h4>{{getVideoDetails?getVideoDetails.patient:''}}</h4>
                                        <router-link v-if="getVideoDetails" :to="{ name: 'PatientSummary', params: { udid:getVideoDetails?getVideoDetails.patientDetailed.id:'' }}">View Profile</router-link>
                                    </div>
                                    <span class="callTime">7:20</span>
                                </div>
                                <div class="body">
                                    <a-row>
                                        <a-col :span="6">
                                            <div class="moreAction">
                                                <div class="moreActionImg three">
                                                    <img src="../../assets/images/user.svg" />
                                                </div>
                                                <p>Profile</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6">
                                            <div class="moreAction" @click="showNotesModal">
                                                <div class="moreActionImg four">
                                                    <img src="../../assets/images/edit.svg" />
                                                </div>
                                                <p>Notes</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6">
                                            <div class="moreAction">
                                                <div class="moreActionImg five">
                                                    <img src="../../assets/images/chat-2.svg" />
                                                </div>
                                                <p>Chat</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6">
                                            <div class="moreAction"  @click="showDocumentsModal">
                                                <div class="moreActionImg green">
                                                    <img src="../../assets/images/report.svg" />
                                                </div>
                                                <p>Document</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6">
                                            <div class="moreAction">
                                                <div class="moreActionImg yellowBgColor">
                                                    <img src="../../assets/images/schedule.svg" />
                                                </div>
                                                <p>Appointment</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6">
                                            <div class="moreAction">
                                                <div class="moreActionImg redBgColor">
                                                    <img src="../../assets/images/wave.svg" />
                                                </div>
                                                <p>Vital</p>
                                            </div>
                                        </a-col>
                                        <a-col :span="6">
                                            <div class="moreAction">
                                                <div class="moreActionImg purpleBgColor">
                                                    <img src="../../assets/images/watch.svg" />
                                                </div>
                                                <p>Reminder</p>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </div>
                                <div class="footer">
                                    <a-button class="endCall" :size="size" block @click="hangUp()">End Call</a-button>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <NotesDetailModal v-if="notesDetailVisible==true"  v-model:visible="notesDetailVisible" :Id="getVideoDetails.patientDetailed?getVideoDetails.patientDetailed.id:getVideoDetails.patientDetailed.id" @closeModal="handleOk" />
                <DocumentDetailModal v-if="documentDetailVisible==true"   v-model:visible="documentDetailVisible" :patientDetails="getVideoDetails.patientDetailed?getVideoDetails.patientDetailed:getVideoDetails.patientDetailed"  @closeModal="handleOk"/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</div>
</template>
<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import { ref, onMounted, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Loader from "@/components/loader/Loader";
import { Web } from "@/assets/js/sip-0.20.0";
import { notification } from "ant-design-vue";
import { successSwal } from "@/commonMethods/commonMethod";
import NotesDetailModal from "@/components/modals/NotesDetail";
import DocumentDetailModal from "@/components/modals/DocumentDetail";

export default {
  components: {
    Header,
    Sidebar,
    Loader,
    NotesDetailModal,
    DocumentDetailModal
  },

  setup() {
    // the DOM element(video) will be assigned to the ref after initial render
    const store = useStore();
    const videoCall = ref();
    const notesDetailVisible =ref(false)
    const documentDetailVisible=ref(false)
    const router = useRouter();
    // const session = inject('sipSession')
    // const session = localStorage.getItem('sipSession');
    const upcomingCallDetails = reactive({
      user:''
    })
    const simpleUserHangup = ref();
    const session = computed(() => {
      return store.state.authentication.simpleUser;
    });

    const authentication = computed(() => {
      return store.state.authentication;
    });
    console.log("sipSession", session.value);

    onMounted(() => {
      store.commit("loadingStatus", true);
      console.log(videoCall.value); // this is your $el
      if (session.value) {
        session.value.options.media.remote = {
          video: videoCall.value ? videoCall.value : <video></video>,
        };
        //getting upcoming call user details
        upcomingCallDetails.user=session.value.session.incomingInviteRequest.message.from.uri.raw.user;
        store.dispatch("acceptVideoCallDetails",upcomingCallDetails.user.substring(2))
        session.value.answer();
        
        setTimeout(() => {
          store.commit("loadingStatus", false);
        }, 5000);
      } else {
        setTimeout(() => {
            store.commit("loadingStatus", false);
          }, 5000);
        if (conferenceId.value) {
          let callNotification = 0;
          const key = `open${Date.now()}`;
          console.log(
            "loginDetails=>",
            authentication.value.loggedInUser.user.sipId
          );
          authentication.value.options = Web.SimpleUserOptions = {
            aor: `sip:${authentication.value.loggedInUser.user.sipId}@dev.icc-heaalth.com`,
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
                  successSwal("Call Ended! Thank You");
                  router.push("/dashboard");
                }
              },
            },
            userAgentOptions: {
              // logLevel: "debug",
              displayName: authentication.value.loggedInUser.user.sipId,
              authorizationPassword: "123456",
              authorizationUsername:
                authentication.value.loggedInUser.user.sipId,
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
              // console.log("hello");
              simpleUser.register().then(() => {
                simpleUser.call(
                  `sip:${conferenceId.value}@dev.icc-heaalth.com`
                );
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
      }
    });
    // Answer call
    function hangUp() {
      if (conferenceId.value) {
        simpleUserHangup.value.hangup().then(() => {
          router.push("/dashboard");
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
      notesDetailVisible.value = true;
    }
    const showDocumentsModal = () => {
      documentDetailVisible.value = true;
    }

    return {
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
    };
  },
};
</script>
<style lang="scss">
</style>
