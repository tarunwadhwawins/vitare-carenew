<template>
<div>
    <div class="header-wrapper">
        <div class="logo">
            <div class="logoInner">
                <router-link to="/dashboard">
                    <img src="../../../assets/images/logo.svg" alt="image" />
                </router-link>
            </div>
            <div class="icon" @click="barMenu">
                <MenuOutlined />
            </div>
        </div>
        <div class="header-control">
            <div class="header-inner">
                <div class="location d-flex align-items-center">
                    <!-- <a-dropdown v-if="accessPermission != 0">
              <a class="ant-dropdown-link" @click.prevent>
                {{ $t("header.organisationLocation") }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-sub-menu
                    key="test1"
                    :title="$t('header.organisation') + ' 1'"
                  >
                    <a-menu-item>{{ $t("header.location") }} 1</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 2</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 3</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 4</a-menu-item>
                  </a-sub-menu>
                  <a-sub-menu
                    key="test2"
                    :title="$t('header.organisation') + ' 2'"
                  >
                    <a-menu-item>{{ $t("header.location") }} 5</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 6</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 7</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 8</a-menu-item>
                  </a-sub-menu>
                  <a-sub-menu
                    key="test3"
                    :title="$t('header.organisation') + ' 3'"
                  >
                    <a-menu-item>{{ $t("header.location") }} 1</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 2</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 3</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 4</a-menu-item>
                  </a-sub-menu>
                  <a-sub-menu
                    key="test4"
                    :title="$t('header.organisation') + ' 4'"
                  >
                    <a-menu-item>{{ $t("header.location") }} 5</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 6</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 7</a-menu-item>
                    <a-menu-item>{{ $t("header.location") }} 8</a-menu-item>
                  </a-sub-menu>
                </a-menu>
              </template>
            </a-dropdown> -->

                    <!-- <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                <div class="name">Location <DownOutlined /></div>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <a href="javascript:void(0)">Organisation 1</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a href="javascript:void(0)">Organisation 2</a>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a href="javascript:void(0)">Organisation 3</a></a-menu-item
                  >
                  <a-menu-item key="4">
                    <a href="javascript:void(0)">Organisation 4</a></a-menu-item
                  >
                </a-menu>
              </template>
            </a-dropdown> -->
                </div>
                <div class="bar-menu">
                    <div class="search-icon" @click="toggle = !toggle">
                        <SearchOutlined />
                    </div>
                    <div class="ellipse-icon" @click="ellipse = !ellipse">
                        <MoreOutlined />
                    </div>
                </div>
                <div class="search" v-if="arrayToObjact(screensPermissions, 38)">
                    <HeaderSearch v-model:value="value" @handleChange="handleChange($event)" />
                </div>
                <div class="profile" :class="ellipse ? 'show' : ''">
                    <div class="quick-actions d-flex align-items-center">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>
                                <div class="name">
                                    {{ $t("header.quickAction") }}
                                    <DownOutlined />
                                </div>
                            </a>
                            <template #overlay>
                                <a-menu class="headerDropdown">
                                    <a-menu-item key="0" v-if="arrayToObjact(screensPermissions, 112)">
                                        <a href="javascript:void(0)" @click="addAppt">{{
                                      $t("header.addAppointment")
                                    }}</a>
                                                  </a-menu-item>
                                                  <a-menu-item key="1" v-if="arrayToObjact(screensPermissions, 62) && route.name != 'PatientSummary'">
                                                      <a href="javascript:void(0)" @click="addPatient">{{
                                      $t("header.addPatient")
                                    }}</a>
                                                  </a-menu-item>
                                                  <a-menu-item key="4" v-if="arrayToObjact(screensPermissions, 113)">
                                                      <a href="javascript:void(0)" @click="addTask">{{
                                      $t("header.addTask")
                                    }}</a>
                                    </a-menu-item>
                                    <a-menu-item key="4" v-if="arrayToObjact(screensPermissions, 107)">
                                        <a href="javascript:void(0)" @click="showStartCallModal(true)">{{ $t("header.startCall") }}</a>
                                    </a-menu-item>
                                    <a-menu-item key="5" >
                                        <a href="javascript:void(0)" @click="showEscalationModal(true)">{{ 'Add Escalation' }}</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                    <div class="notifications">
                        <a-dropdown :trigger="['click']" overlayClassName="notifications">
                            <a class="ant-dropdown-link" @click.prevent>
                                <div class="icon">
                                    <a-badge :count="count ? count : ''" :number-style="{ backgroundColor: '#267dff' }">
                                        <NotificationOutlined />
                                    </a-badge>
                                </div>
                            </a>
                            <template #overlay>
                                <a-menu class="headerDropdown" style="max-height: 400px; overflow: auto">
                                    <li class="title">{{ $t("header.notification") }}</li>
                                    <li class="listing" v-for="(notification, index) in notifications" :key="index">
                                        <router-link :to="notification.type == 'Appointment' ? '': '/communications'" @click=" isReadNotification(notification.id, notification.type,notification.type_id)">
                                            <a class="d-flex align-items-center" href="#">
                                                <div class="flex-grow-1 ms-3 summary">
                                                    <h3>{{ notification.title }}</h3>
                                                    <p>{{ notification.body }}</p>
                                                    <br />
                                                    <strong class="" v-if="notification.time">{{
                                                    dateOnlyFormat(date) === dateOnlyFormat(notification.time)
                                                      ? 'Today'
                                                      : dateOnlyFormat(notification.time)
                                                  }}</strong>&nbsp;
                                                                          <strong class="" v-if="notification.time">{{
                                                    meridiemFormatFromTimestamp(notification.time)
                                                  }} </strong>
                                                </div>
                                            </a>
                                        </router-link>
                                    </li>
                                    <li class="allNotication">
                                        <router-link to="/notifications">{{$t('header.checkAllNotifications')}}</router-link>
                                    </li>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                    <div class="profile-menu">
                        <a-dropdown :trigger="['click']">
                            <a class="ant-dropdown-link" @click.prevent>
                                <div class="name">{{ userName.user.name }}</div>
                                <div class="image">
                                    <img src="../../../assets/images/userAvatar.png" alt="image" />
                                </div>
                            </a>
                            <template #overlay>
                                <a-menu class="headerDropdown">
                                    <a-menu-item key="0">
                                        <router-link :to="{
                                            name: 'CoordinatorSummary',
                                            params: { udid: userName.user.staffUdid },
                                          }">
                                            {{ $t("header.myProfile") }}
                                        </router-link>
                                    </a-menu-item>

                                    <a-menu-item key="3">
                                        <router-link :to="{ name: 'ResetPassword' }">
                                            Reset Password
                                        </router-link>
                                    </a-menu-item>

                                    <a-menu-item key="3" @click="logoutUser">
                                        <a href="javascript:void(0)">Logout</a>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!---->
    <AddAppointment v-model:visible="appointmentModal" @is-visible="showModal($event)" />
    <TasksModal v-model:visible="tasksModal" @saveTaskModal="handleTaskOk($event)" />
    <PatientsModal v-model:visible="PatientsModal" @saveModal="closeAppointModal($event)" />
    <!-- <CoordinatorsModal v-model:visible="CoordinatorsModal" @ok="handleOk" /> -->
    <AddStartCall v-model:visible="AddStartCall" @ok="closeStartCallModal" @is-visibale="showStartCallModal($event)" />
    <SendMessage v-model:visible="SendMessage" @ok="startOk" />
    <!---->
    <AppointmentDetails v-if="isAppointment" v-model:visible="isAppointment" @closeModal="closeModal(event)" />
    <EscaltionModal v-model:visible="escalationVisible" @saveModal="saveModal($event)" />
</div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  onUnmounted,
  defineAsyncComponent,
  onMounted,
} from "vue";


import SendMessage from "@/components/modals/SendMessage";
import { useStore } from "vuex";
import HeaderSearch from "./HeaderSearch";
import AppointmentDetails from "../../modals/AppointmentDetails";
import {
  arrayToObjact,
  meridiemFormatFromTimestamp,
  dobFormat,
  dateOnlyFormat,
} from "@/commonMethods/commonMethod";
import { useRoute, useRouter } from "vue-router";
import {
  NotificationOutlined,
  DownOutlined,
  MenuOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    AppointmentDetails,
    NotificationOutlined,
    DownOutlined,
    MenuOutlined,
    SearchOutlined,
    MoreOutlined,
    AddAppointment: defineAsyncComponent(() =>
      import("@/components/modals/AddAppointment")
    ),
    TasksModal: defineAsyncComponent(() =>
      import("@/components/modals/TasksModal")
    ),
    PatientsModal: defineAsyncComponent(() =>
      import("@/components/modals/PatientsModal")
    ),
    EscaltionModal:defineAsyncComponent(() =>import("@/components/escalations/EscalationModal")),
    AddStartCall: defineAsyncComponent(() =>
      import("@/components/modals/AddStartCall")
    ),
    SendMessage,
    HeaderSearch,
  },
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const toggle = ref(false);
    const ellipse = ref(false);
    const tasksModal = ref(false);
    const escalationVisible = ref(false)
    const isAppointment = ref();
    const date = Math.round(+new Date() / 1000);
    const userName = JSON.parse(localStorage.getItem("auth"));
const route = useRoute()
    const logoutUser = () => {
      store.state.authentication.errorMsg = "";
       store.dispatch("logoutUser").then(()=>{
             router.push("/logout");
       })
      
    };
    const value = ref();

    function barMenu() {
      var barMenu = JSON.parse(localStorage.getItem("barmenu"));
      if (barMenu == true) {
        localStorage.setItem("barmenu", JSON.stringify(false));
      } else {
        localStorage.setItem("barmenu", JSON.stringify(true));
      }

      document.body.classList.toggle("show");
    }

    watchEffect(() => {
      store.dispatch("notificationList");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });

      if (JSON.parse(localStorage.getItem("barmenu")) == true) {
        document.body.classList.add("show");
      }
      //document.body.classList.remove("show");
    });
    onMounted(() => {
      store.dispatch("newRequests");
      if (JSON.parse(localStorage.getItem("barmenu")) == true) {
        document.body.classList.add("show");
      }
    });
    onUnmounted(() => {});
    const appointmentModal = ref(false);
    const addAppt = () => {
      appointmentModal.value = true;
    };

    function showModal(event) {
      if (event.date) {
        appointmentModal.value = event.check;
        emit("is-heardeVisible", event);
      } else {
        appointmentModal.value = event;
      }
    }

    const addTask = () => {
      tasksModal.value = true;
    };

    const showEscalationModal =()=>{
      escalationVisible.value = true
    }

    const PatientsModal = ref(false);

    const addPatient = () => {
if(route.name != 'PatientSummary') {
            store.state.patients.addDemographic = null
            store.state.patients.patientDetails = null
            store.state.patients.emergencyContact = null
            store.state.patients.patientReferralSource = null
           store.state.patients.responsiblePerson = null
            
}
      PatientsModal.value = true;
    };
    const closeAppointModal = (status) => {
      PatientsModal.value = status;
    };

    const CoordinatorsModal = ref(false);
    const addCare = () => {
      CoordinatorsModal.value = true;
    };
    const handleOk = () => {
      CoordinatorsModal.value = false;
    };

    const handleTaskOk = (e) => {
      tasksModal.value = e;
    };

    const AddStartCall = ref(false);
    const showStartCallModal = (e) => {
      AddStartCall.value = e;
    };
    const SendMessage = ref(false);
    const addsendMessage = () => {
      SendMessage.value = true;
    };
    const startOk = () => {
      SendMessage.value = false;
    };
    const closeStartCallModal = () => {
      AddStartCall.value = false;
    };

    const notifications = computed(() => {
      return store.state.common.getNotificationsList;
    });
    const handleChange = (val) => {
      // console.log('object',val.split('=>'));
      let checkData = val.split("=>");
      if (checkData[1] === "Patient") {
        value.value = val;
        router.push({
          name: "PatientSummary",
          params: {
            udid: checkData[0],
          },
        });
      } else {
        value.value = val;
        router.push({
          name: "CoordinatorSummary",
          params: {
            udid: checkData[0],
          },
        });
      }
    };

    const isReadNotification = (id, type, typeId) => {
      if (type == "Appointment") {
        store.dispatch("isReadUpdateNotification", id);
        store.dispatch("appointmentDetails", typeId);
        store.dispatch("notificationList");
        isAppointment.value = true;
      } else {
        store.dispatch("isReadUpdateNotification", id);
        store.dispatch("notificationList");
      }
    };
    const bitrixFormCheck = computed(() => {
      return store.state.patients.bitrixFormCheck;
    });

    function closeModal(status) {
      isAppointment.value = status;
    }
    const saveModal = (value) =>{
      escalationVisible.value = value
    }
    return {
      saveModal,
      escalationVisible,
      showEscalationModal,
      closeModal,
      isAppointment,
      screensPermissions: store.getters.screensPermissions,
      bitrixFormCheck,
      dateOnlyFormat,
      isReadNotification,
      count: store.getters.notificationCount,
      date,
      handleChange,
      dobFormat,
      meridiemFormatFromTimestamp,
      notifications,
      handleTaskOk,
      userName,
      logoutUser,
      value,
      barMenu,
      toggle,
      ellipse,
      SendMessage,
      addsendMessage,
      appointmentModal,

      addAppt,
      tasksModal,
      addTask,
      arrayToObjact,
      PatientsModal,
      addPatient,
      closeAppointModal,
      CoordinatorsModal,
      addCare,
      AddStartCall,
      showStartCallModal,
      closeStartCallModal,
      startOk,
      handleOk,
      showModal,
      route,
    };
  },
});
</script>
