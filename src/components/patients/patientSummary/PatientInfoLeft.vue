<template>
  <div class="patientInfo" v-if="patientDetails">
    <div class="patientImg" @click="showModalCustom">
      <img v-if="patientDetails.profilePhoto" :src="patientDetails.profilePhoto" alt="image"/>
      <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
      <div class="info">
        <p>{{ patientDetails.fullName }}</p>
        <p>DOB : {{ patientDetails.dob }}</p>
        <p><a :href="patientDetails.email"><MailOutlined /> {{ patientDetails.email }}</a>
        </p>
        <p><a href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a>
        </p>
        <p>{{ patientDetails.address }}</p>
      </div>
      <EditOutlined class="editIcon" @click="addPatient" />
    </div>

    <div class="pat-profile">
      <div class="pat-profile-inner">
        <div class="thumb-head">Flag</div>
        <div class="thumb-desc" v-for="flag in patientDetails.patientFlags" :key="flag.id">
          <span class="box" v-bind:class="flag.color"></span>
          <span class="box redBgColor"></span>
          <span class="box yellowBgColor"></span>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">Non Compliance</div>
        <div class="thumb-desc">
          <WarningOutlined />
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Appointments
          <PlusOutlined @click="showAddAppointmentModal"/><br />
        </div>
        <div class="thumb-desc">
          <router-link to="/appointment-calendar">
            John Deer 20th 2021 (+1 more)
          </router-link>
        </div>
      </div>

      <div class="pat-profile-inner">
        <div class="thumb-head">
          Task <PlusOutlined @click="addTaskModal" /><br />
        </div>
        <div class="thumb-desc">
          <router-link to="/tasks"> Task 1 </router-link>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Vital Summary <PlusOutlined @click="addVitalsModel" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)">
            <span @click="showVitalssModal">BP 120 / 78 Dec 15 6 PM</span>
          </a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Notes <PlusOutlined @click="addNotesModal" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showNotesModal" >John Clinical Dec 15 2021</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Documents <PlusOutlined @click="addDocumentsModal" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showDocumentsModal" >Program 1</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Care Team <PlusOutlined @click="addCateTeamModal" />
        </div>
        <div class="thumb-desc">
          <router-link to="/coordinator-summary">John Smith (P) HT </router-link><br />
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          TimeLogs <PlusOutlined @click="addTimelogModal" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showTimelogModal" >Daily monitoring of vitals (Oct 25, 2021)</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Devices <PlusOutlined @click="addDeviceModal" />
        </div>
        <div class="thumb-desc">
          <a href="javascript:void(0)" @click="showDeviceModal" >Blood Pressure(M-101)</a>
        </div>
      </div>
    </div>
  </div>
  <PatientsModal v-model:visible="patientsModalVisible" @ok="handleOk" />
  <AddAppointmentModal v-model:visible="addAppointmentVisible" @ok="handleOk" />
  <AddTasksModal v-model:visible="taskModalVisible" @ok="handleOk" />
  <AddVitalsModal v-model:visible="addVitalsVisible" @ok="handleOk" />
  <BloodPressureDetail v-model:visible="bloodPressureVisible" @ok="handleOk" />
  <AddNotesModal v-model:visible="addNoteVisible" @ok="handleOk" />
  <NotesDetailModal v-model:visible="notesDetailVisible" @ok="handleOk" />
  <AddDocumentModal v-if="addDocumentVisible" v-model:visible="addDocumentVisible" @ok="handleOk" />
  <DocumentDetailModal v-model:visible="documentDetailVisible" @ok="handleOk" />
  <AddCareTeamModal v-model:visible="careCoordinatorsVisible" @ok="handleOk" />
  <AddTimeLogsModal v-model:visible="addTimeLogsVisible" @ok="handleOk" />
  <TimeLogsDetailModal v-model:visible="timeLogsDetailVisible" @ok="handleOk" />
  <AddDeviceModal v-model:visible="addDeviceVisible" @ok="handleOk" />
  <DeviceDetailModal v-model:visible="deviceDetailVisible" @ok="handleOk" />
</template>

<script>
import {
  WarningOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import { ref, watchEffect, computed } from 'vue-demi';
import PatientsModal from "@/components/modals/PatientsModal";
import AddAppointmentModal from "@/components/modals/AddAppointment";
import AddTasksModal from "@/components/modals/TasksModal";
import AddVitalsModal from "@/components/modals/AddVitals";
import AddNotesModal from "@/components/modals/AddNote";
import NotesDetailModal from "@/components/modals/NotesDetail";
import AddDocumentModal from "@/components/modals/AddDocument";
import DocumentDetailModal from "@/components/modals/DocumentDetail";
import AddCareTeamModal from "@/components/modals/CareCoordinators";
import AddTimeLogsModal from "@/components/modals/AddTimeLogs";
import TimeLogsDetailModal from "@/components/modals/TimeLogsDetail";
import AddDeviceModal from "@/components/modals/AddDevice";
import DeviceDetailModal from "@/components/modals/DeviceDetail";
import BloodPressureDetail from "@/components/modals/BloodPressureDetail";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    WarningOutlined,
    MailOutlined,
    PlusOutlined,
    EditOutlined,
    PhoneOutlined,
    PatientsModal,
    AddAppointmentModal,
    AddTasksModal,
    AddVitalsModal,
    AddNotesModal,
    NotesDetailModal,
    AddDocumentModal,
    DocumentDetailModal,
    AddCareTeamModal,
    AddTimeLogsModal,
    TimeLogsDetailModal,
    AddDeviceModal,
    DeviceDetailModal,
    BloodPressureDetail,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const custom = ref(false);
    const patientsModalVisible = ref(false);
    const addAppointmentVisible = ref(false);
    const taskModalVisible = ref(false);
    const addVitalsVisible = ref(false);
    const bloodPressureVisible = ref(false);
    const addNoteVisible = ref(false);
    const notesDetailVisible = ref(false);
    const addDocumentVisible = ref(false);
    const documentDetailVisible = ref(false);
    const careCoordinatorsVisible = ref(false);
    const addTimeLogsVisible = ref(false);
    const timeLogsDetailVisible = ref(false);
    const addDeviceVisible = ref(false);
    const deviceDetailVisible = ref(false);

    watchEffect(() => {
      store.dispatch('patientDetails', route.params.udid)
    })
    const patientDetails = computed(() => {
      return store.state.patients.patientDetails
    })
    
    const showModalCustom = () => {
      custom.value = true;
    };

    const addPatient = () => {
      patientsModalVisible.value = true;
    };
    const showAddAppointmentModal = () => {
      addAppointmentVisible.value = true;
    };

    const addTaskModal = () => {
      taskModalVisible.value = true;
    }

    const addVitalsModel = () => {
      addVitalsVisible.value = true;
    }

    const showVitalssModal = () => {
      bloodPressureVisible.value = true;
    }

    const addNotesModal = () => {
      addNoteVisible.value = true;
    }

    const showNotesModal = () => {
      notesDetailVisible.value = true;
    }

    const addDocumentsModal = () => {
      addDocumentVisible.value = true;
    }

    const showDocumentsModal = () => {
      documentDetailVisible.value = true;
    }

    const addCateTeamModal = () => {
      careCoordinatorsVisible.value = true;
    }

    const addTimelogModal = () => {
      addTimeLogsVisible.value = true;
    }

    const showTimelogModal = () => {
      timeLogsDetailVisible.value = true;
    }

    const addDeviceModal = () => {
      addDeviceVisible.value = true;
    }

    const showDeviceModal = () => {
      deviceDetailVisible.value = true;
    }


    return {
      showAddAppointmentModal,
      addPatient,
      showModalCustom,
      custom,
      value10: ref([]),

      patientsModalVisible,
      addAppointmentVisible,
      taskModalVisible,
      addVitalsVisible,
      bloodPressureVisible,
      addNoteVisible,
      notesDetailVisible,
      addDocumentVisible,
      documentDetailVisible,
      careCoordinatorsVisible,
      addTimeLogsVisible,
      timeLogsDetailVisible,
      addDeviceVisible,
      deviceDetailVisible,

      addTaskModal,
      addVitalsModel,
      showVitalssModal,
      addNotesModal,
      showNotesModal,
      addDocumentsModal,
      showDocumentsModal,
      addCateTeamModal,
      addTimelogModal,
      showTimelogModal,
      addDeviceModal,
      showDeviceModal,

      patientDetails,
    }
  }
}
</script>
