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
          <!-- <div
            class="search"
            :class="toggle ? 'show' : ''"
            v-if="accessPermission != 0"
          >
            <a-input
              v-model:value="value"
              size="large"
              placeholder="Enter search"
            />
          </div> -->
          <div class="profile" :class="ellipse ? 'show' : ''">
            <div class="quick-actions d-flex align-items-center">
              <a-dropdown :trigger="['click']" v-if="accessPermission != 0">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="name">
                    {{ $t("header.quickAction") }}
                    <DownOutlined />
                  </div>
                </a>
                <template #overlay>
                  <a-menu class="headerDropdown">
                    <a-menu-item key="0">
                      <a href="javascript:void(0)" @click="addAppt">{{
                        $t("header.addAppointment")
                      }}</a>
                    </a-menu-item>
                    <a-menu-item
                      key="1"
                      v-if="arrayToObjact(patientsPermissions, 62)"
                    >
                      <a href="javascript:void(0)" @click="addPatient">{{
                        $t("header.addPatient")
                      }}</a>
                    </a-menu-item>
                    <!-- <a-menu-item key="3">
                      <a href="javascript:void(0)" @click="addCare"
                        >Add Care Coordinator</a
                      ></a-menu-item
                    > -->
                    <a-menu-item key="4">
                      <a href="javascript:void(0)" @click="addTask">{{
                        $t("header.addTask")
                      }}</a>
                    </a-menu-item>
                    <a-menu-item
                      key="4"
                      v-if="arrayToObjact(communicationPermissions, 107)"
                    >
                      <a
                        href="javascript:void(0)"
                        @click="showStartCallModal"
                        >{{ $t("header.startCall") }}</a
                      >
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div class="notifications">
              <a-dropdown :trigger="['click']" overlayClassName="notifications">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="icon">
                    <a-badge count="" :number-style="{ backgroundColor: '#267dff' }"> <NotificationOutlined /></a-badge>
                  </div>
                </a>
                <template #overlay>
                  <a-menu class="headerDropdown">
                    <li class="title">{{ $t("header.notification") }}</li>
                    <li
                      class="listing"
                      v-for="(notification, index) in notifications"
                      :key="index"
                    >
                      <div
                        v-for="(notify, index) in notification.value"
                        :key="index"
                      >
                        <a class="d-flex align-items-center" href="#">
                          <!-- <div class="flex-shrink-0 imgProfile">
                            <img src="@/assets/images/userAvatar.png" alt="image" width="50" />
                          </div> -->
                          <div class="flex-grow-1 ms-3 summary">
                            <h3>{{ notify.title }}</h3>
                            <p>{{ notify.body }}</p>
                            <br />
                            <strong class="" v-if="notification.date">{{
                              dobFormat(notification.date)
                            }}</strong
                            >&nbsp;
                            <strong class="" v-if="notify.time">{{
                              meridiemFormatFromTimestamp(notify.time)
                            }}</strong>
                          </div>
                        </a>
                      </div>
                    </li>
                    <!-- <li class="listing">
                      <a class="d-flex align-items-center" href="#">
                        <div class="flex-shrink-0 imgProfile">
                          <img src="../../../assets/images/user-1.jpg" alt="image" width="50" />
                        </div>
                        <div class="flex-grow-1 ms-3 summary">
                          <p>Just a reminder that you have appoinment</p>
                          <span class="date">20 minutes ago</span>
                        </div>
                      </a>
                    </li> -->
                    <!-- <li class="allNotication">
                      <a href="#">{{$t('header.checkAllNotifications')}}</a>
                    </li> -->
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div class="profile-menu">
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click.prevent>
                  <div class="name">{{ userName }}</div>
                  <div class="image">
                    <img
                      src="../../../assets/images/userAvatar.png"
                      alt="image"
                    />
                  </div>
                </a>
                <template #overlay>
                  <a-menu class="headerDropdown">
                    <a-menu-item key="0">
                      <a href="javascript:void(0)">{{
                        $t("header.myProfile")
                      }}</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:void(0)">{{
                        $t("header.settings")
                      }}</a>
                    </a-menu-item>
                    <a-menu-item key="3">
                      <router-link to="reset-password"
                        >Reset Password</router-link
                      >
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
    <AddAppointment
      v-model:visible="appointmentModal"
      @is-visible="showModal($event)"
      @ok="apptOk"
    />
    <TasksModal
      v-model:visible="tasksModal"
      @saveTaskModal="handleTaskOk($event)"
    />
    <PatientsModal
      v-model:visible="PatientsModal"
      @saveModal="closeAppointModal($event)"
    />
    <CoordinatorsModal v-model:visible="CoordinatorsModal" @ok="handleOk" />
    <AddStartCall v-model:visible="AddStartCall" @ok="closeStartCallModal" />
    <SendMessage v-model:visible="SendMessage" @ok="startOk" />
    <!---->
  </div>
</template>

<script>
import { defineComponent, ref, computed, watchEffect } from "vue";
import AddAppointment from "@/components/modals/AddAppointment";
import TasksModal from "@/components/modals/TasksModal";
import PatientsModal from "@/components/modals/PatientsModal";
import CoordinatorsModal from "@/components/modals/CoordinatorsModal";
import AddStartCall from "@/components/modals/AddStartCall";
import SendMessage from "@/components/modals/SendMessage";
import { useStore } from "vuex";
import {
  arrayToObjact,
  meridiemFormatFromTimestamp,
  dobFormat,
} from "@/commonMethods/commonMethod";
import {
  NotificationOutlined,
  DownOutlined,
  MenuOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    NotificationOutlined,
    DownOutlined,
    MenuOutlined,
    SearchOutlined,
    MoreOutlined,
    AddAppointment,
    TasksModal,
    PatientsModal,
    CoordinatorsModal,
    AddStartCall,
    SendMessage,
  },
  props: {},
  setup(props, { emit }) {
    const store = useStore();
    const toggle = ref(false);
    const ellipse = ref(false);
    const tasksModal = ref(false);
    const userName = computed(() => {
      return localStorage.getItem("user");
    });

    const logoutUser = () => {
      store.state.authentication.errorMsg = "";
      store.dispatch("logoutUser");
    };
    const value = ref();
    function barMenu() {
      document.body.classList.toggle("show");
    }

    // function collapsMenu(){
    //   toggle.value=!toggle.value
    //   emit('collapsMenu',toggle.value)
    // }

    watchEffect(() => {
      store.dispatch("getNotifications");
    });

    const appointmentModal = ref(false);
    const addAppt = () => {
      appointmentModal.value = true;
    };
    function showModal(event) {
      appointmentModal.value = event;
      emit("is-visible", event);
    }
    const apptOk = () => {
      appointmentModal.value = false;
    };

    const addTask = () => {
      tasksModal.value = true;
    };
    // const taskOk = () => {
    //   TasksModal.value = false;
    // };

    const PatientsModal = ref(false);

    const addPatient = () => {
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

    const handleTaskOk = (status) => {
      tasksModal.value = status;
    };

    const AddStartCall = ref(false);
    const showStartCallModal = () => {
      AddStartCall.value = true;
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

    const accessPermission = computed(() => {
      return store.state.authentication.accessPermission;
    });
    const patientsPermissions = computed(() => {
      return store.state.screenPermissions.patientsPermissions;
    });
    const communicationPermissions = computed(() => {
      return store.state.screenPermissions.communicationPermissions;
    });

    const notifications = computed(() => {
      return store.state.common.getNotifications;
    });
    return {
      dobFormat,
      meridiemFormatFromTimestamp,
      notifications,
      communicationPermissions,
      accessPermission,
      handleTaskOk,
      // collapsMenu,
      userName,
      logoutUser,
      value,
      barMenu,
      toggle,
      ellipse,
      SendMessage,
      addsendMessage,

      appointmentModal,
      apptOk,
      addAppt,

      tasksModal,
      addTask,
      arrayToObjact,
      // taskOk,

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
      patientsPermissions,
    };
  },
});
</script>