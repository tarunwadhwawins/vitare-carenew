<template>
  <div class="patientInfo" v-if="patientDetails">
    <div class="patientImg" @click="showModalCustom">
      <img v-if="patientDetails.profilePhoto" :src="patientDetails.profilePhoto" alt="image"/>
      <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
      <div class="info">
        <p v-if="patientDetails.patientFullName">Name: {{ patientDetails.patientFullName }}</p>
        <p v-if="patientDetails.dob">DOB : {{ patientDetails.dob }}</p>
        <p v-if="patientDetails.medicalRecordNumber">MRN : {{ patientDetails.medicalRecordNumber }}</p>
        <p v-if="patientDetails.email"><a href="mailto:{{patientDetails.email}}"><MailOutlined /> {{ patientDetails.email }}</a></p>
        <p v-if="patientDetails.phoneNumber"><a href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a></p>
        <p v-if="patientDetails.address">{{ patientDetails.address }}</p>
      </div>
      <EditOutlined class="editIcon" @click="editPatient({udid: patientDetails.id, id: patientDetails.id})" />
    </div>

    <div class="pat-profile">
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Flags <PlusOutlined @click="showAddFlagModal"/><br />
        </div>
        <div class="thumb-desc" v-if="latestFlag">
          <Flags :flag="latestFlag.color" />
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Family Members <PlusOutlined @click="showAddFamilyMemberModal"/><br />
        </div>
        <div v-if="familyMembersList" class="thumb-desc">
          <a href="javascript:void(0)" @click="showFamilyMembersModal" >{{familyMembersList[0].fullName}}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" @click="showCriticalModal">Critical Note
          <PlusOutlined />
        </div>
        <div v-if="criticalNotesList" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCriticalNotesDetails" >{{ criticalNotesList[0]?criticalNotesList[0].criticalNote.substring(0,20)+'...':'' }}</a>
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
        <div v-if="latestAppointment != null" class="thumb-desc">
          <router-link :to="'/appointment-calendar/'+patientDetails.id">
          {{ latestAppointment[0].staff.fullName+' '+latestAppointment[0].date }}
          </router-link>
        </div>
      </div>

      <div class="pat-profile-inner">
        <div class="thumb-head">
          Task <PlusOutlined @click="addTaskModal" /><br />
        </div>
        <div v-if="latestTask != null" class="thumb-desc">
          <router-link to="/tasks">{{ latestTask[0].title }}</router-link>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Vital Summary
          <!-- <PlusOutlined @click="addVitalsModel" /> -->
        </div>
        <div v-if="latestVital != null" class="thumb-desc">
          <a href="javascript:void(0)">
            <span @click="showVitalssModal">{{ latestVital.deviceType }} {{ latestVital.value }} {{ latestVital.takeTime }}</span>
          </a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Notes <PlusOutlined @click="addNotesModal" />
        </div>
        <div v-if="latestNotes != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showNotesModal" >{{ latestNotes[0].note }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Documents <PlusOutlined @click="addDocumentsModal" />
        </div>
        <div v-if="latestDocument != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDocumentsModal" >{{ latestDocument[0].name }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Care Team <PlusOutlined @click="addCateTeamModal" />
        </div>
        <div v-if="latestCareTeam != null" class="thumb-desc">
          <router-link :to="{ name: 'CoordinatorSummary', params: { udid: latestCareTeam.staffId  }}">{{ latestCareTeam.staff }}</router-link>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          TimeLogs <PlusOutlined @click="addTimelogModal" />
        </div>
        <div v-if="latestTimeLog != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showTimelogModal" >{{ latestTimeLog[0].category+' '+latestTimeLog[0].date }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Devices <PlusOutlined @click="addDeviceModal" />
        </div>
        <div v-if="latestDevice != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDeviceModal" >{{ latestDevice[0].deviceType+'('+latestDevice[0].modelNumber+')' }}</a>
        </div>
      </div>
    </div>
  </div>
  
  <AddFamilyMemberModal v-if="addFamilyMembersModalVisible" v-model:visible="addFamilyMembersModalVisible"  :patientId="patientDetails.id" @closeModal="handleOk" :isFamilyMemberEdit="isFamilyMemberEdit" />
  <FamilyMembersDetailsModal v-if="familyMembersModalVisible" v-model:visible="familyMembersModalVisible" :familyMembersList="familyMembersList" :patientId="patientDetails.id" @isFamilyMemberEdit="editFamilyMember" />
  <PatientFlagsModal v-if="flagsModalVisible" v-model:visible="flagsModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
  <AddCriticalNote v-model:visible="criticalModalVisible" @closeModal="handleOk" @saveModal="handleCriticalNote($event)"/>
  <CriticalNotesDetailModal v-model:visible="criticalNotesDetailVisible" @closeModal="handleOk"/>
  <PatientsModal v-if="patientsModalVisible == true && patientDetails" v-model:visible="patientsModalVisible" :patientId="patientDetails.id" :isEditPatient="isEditPatient" @closeModal="handleOk" @saveModal="handleOk($event)" />
  <AddAppointmentModal v-if="addAppointmentVisible == true" v-model:visible="addAppointmentVisible" :patientId="patientDetails.id" :patientName="patientDetails.patientFullName" @closeModal="handleOk" />
  <AddTasksModal v-if="taskModalVisible == true" v-model:visible="taskModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
  <PatientVitalsDetailsModal v-if="patientVitalsVisible == true" v-model:visible="patientVitalsVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
  <AddNotesModal v-if="addNoteVisible == true" v-model:visible="addNoteVisible" @closeModal="handleOk" />
  <NotesDetailModal v-if="notesDetailVisible == true" v-model:visible="notesDetailVisible" @closeModal="handleOk" />
  <AddDocumentModal v-if="addDocumentVisible == true" v-model:visible="addDocumentVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
  <DocumentDetailModal v-if="documentDetailVisible == true" v-model:visible="documentDetailVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
  <AddCareTeamModal v-if="careCoordinatorsVisible == true" v-model:visible="careCoordinatorsVisible" @closeModal="handleOk" />
  <AddTimeLogsModal v-if="addTimeLogsVisible" v-model:visible="addTimeLogsVisible" :timeLogDetails="timeLogDetails" :isEditTimeLog="isEditTimeLog" @closeModal="handleOk" />
  <TimeLogsDetailModal v-if="timeLogsDetailVisible == true" v-model:visible="timeLogsDetailVisible" @editTimeLog="editTimeLog($event)" />
  <AddDeviceModal v-if="addDeviceVisible == true" v-model:visible="addDeviceVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
  <DeviceDetailModal v-if="deviceDetailVisible == true" v-model:visible="deviceDetailVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
</template>

<script>
import {
  WarningOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
import {
  ref,
  // reactive,
  watchEffect,
  computed,
  defineComponent,
  defineAsyncComponent
} from 'vue-demi';
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import AddFamilyMemberModal from "@/components/modals/AddFamilyMemberModal";
import FamilyMembersDetailsModal from "@/components/modals/FamilyMembersDetailsModal";
import PatientFlagsModal from "@/components/modals/PatientFlagsModal";
// import AddCriticalNote from "@/components/modals/CriticalNote"
// import CriticalNotesDetailModal from "@/components/modals/CriticalNotesDetail";
import PatientsModal from "@/components/modals/PatientsModal";
import AddAppointmentModal from "@/components/modals/AddAppointment";
import AddTasksModal from "@/components/modals/TasksModal";
import AddNotesModal from "@/components/modals/AddNote";
import NotesDetailModal from "@/components/modals/NotesDetail";
import AddDocumentModal from "@/components/modals/AddDocument";
import DocumentDetailModal from "@/components/modals/DocumentDetail";
import AddCareTeamModal from "@/components/modals/CareCoordinators";
import AddTimeLogsModal from "@/components/modals/AddTimeLogs";
import TimeLogsDetailModal from "@/components/modals/TimeLogsDetail";
import AddDeviceModal from "@/components/modals/AddDevice";
import DeviceDetailModal from "@/components/modals/DeviceDetail";
import PatientVitalsDetailsModal from "@/components/modals/PatientVitalsDetailsModal";
import Flags from "@/components/common/flags/Flags";

export default defineComponent({
  components: {
    WarningOutlined,
    MailOutlined,
    PlusOutlined,
    EditOutlined,
    PhoneOutlined,
    PatientFlagsModal,
    PatientsModal,
    AddAppointmentModal,
    AddTasksModal,
    AddNotesModal,
    NotesDetailModal,
    AddDocumentModal,
    DocumentDetailModal,
    AddCareTeamModal,
    AddTimeLogsModal,
    TimeLogsDetailModal,
    AddDeviceModal,
    DeviceDetailModal,
    PatientVitalsDetailsModal,
    Flags,
    AddCriticalNote :defineAsyncComponent(()=>import("@/components/modals/CriticalNote")),
    CriticalNotesDetailModal:defineAsyncComponent(()=>import("@/components/modals/CriticalNotesDetail")),
    AddFamilyMemberModal,
    FamilyMembersDetailsModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const custom = ref(false);
    const isEditPatient = ref(false);
    const isEditTimeLog = ref(false);
    const isFamilyMemberEdit = ref(false);
    const criticalNotesDetailVisible =ref(false)
    const flagsModalVisible = ref(false);
    const addFamilyMembersModalVisible =ref(false)
    const familyMembersModalVisible =ref(false)
    const criticalModalVisible =ref(false)
    const patientsModalVisible = ref(false);
    const addAppointmentVisible = ref(false);
    const taskModalVisible = ref(false);
    const addVitalsVisible = ref(false);
    const patientVitalsVisible = ref(false);
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
      if(route.name == 'PatientSummary') {
        store.dispatch('patientDetails', route.params.udid)
        store.dispatch('latestAppointment', route.params.udid)
        store.dispatch('latestTask', route.params.udid)
        store.dispatch('latestVital', route.params.udid)
        store.dispatch('latestNotes', route.params.udid)
        store.dispatch('latestDocument', route.params.udid)
        store.dispatch('careTeamList', route.params.udid)
        store.dispatch('latestTimeLog', route.params.udid)
        store.dispatch('latestDevice', route.params.udid)
        store.dispatch('criticalNotesList', route.params.udid)
      }
    })

    const criticalNotesList = computed(() => {
      return store.state.patients.criticalNotesList
    })

    const familyMembersList = computed(() => {
      return store.state.patients.familyMembersList
    })

    // const contactTypes = []
    // familyMembersList.value.contactType.forEach(contactType => {
      console.log('contactType', familyMembersList.value)
    // });

    const patientDetails = computed(() => {
      return store.state.patients.patientDetails
    })
    
    const latestFlag = computed(() => {
      return store.state.flags.latestFlag
    })
    
    const latestVital = computed(() => {
      return store.state.patients.latestVital
    })
    
    const latestNotes = computed(() => {
      return store.state.notes.latestNotes
    })
    const latestAppointment = computed(() => {
      return store.state.appointment.latestAppointment
    })
    const latestTask = computed(() => {
      return store.state.tasks.latestTask
    })
    const latestDocument = computed(() => {
      return store.state.patients.latestDocument
    })
    const latestCareTeam = computed(() => {
      return store.state.careTeam.latestCareTeam
    })
    const latestTimeLog = computed(() => {
      return store.state.timeLogs.latestTimeLog
    })
    const latestDevice = computed(() => {
      return store.state.patients.latestDevice
    })
    const getFamilyMemberDetails = computed(() => {
      return store.state.patients.getFamilyMemberDetails
    })
    
    const handleOk = (value) => {
      addFamilyMembersModalVisible.value = false;
      flagsModalVisible.value = false;
      notesDetailVisible.value = false;
      patientsModalVisible.value = value ? value : false;
      addAppointmentVisible.value = false;
      taskModalVisible.value = false;
      addVitalsVisible.value = false;
      patientVitalsVisible.value = false;
      addNoteVisible.value = false;
      notesDetailVisible.value = false;
      addDocumentVisible.value = false;
      documentDetailVisible.value = false;
      careCoordinatorsVisible.value = false;
      addTimeLogsVisible.value = false;
      timeLogsDetailVisible.value = false;
      addDeviceVisible.value = false;
      deviceDetailVisible.value = false;
    };

    const showAddFamilyMemberModal = () => {
      addFamilyMembersModalVisible.value = true
      isFamilyMemberEdit.value = false
    }

    const editFamilyMember = () => {
      addFamilyMembersModalVisible.value=true
      isFamilyMemberEdit.value=true
    }

    const showFamilyMembersModal = ()=>{
      familyMembersModalVisible.value=true
    }

    const showCriticalModal = ()=>{
      criticalModalVisible.value=true
    }

    const showCriticalNotesDetails = ()=>{
      criticalNotesDetailVisible.value=true
    }
    const handleCriticalNote = (value) =>{
      criticalModalVisible.value=value
    }
    
    const showModalCustom = () => {
      custom.value = true;
    };

    const editPatient = ({udid, id}) => {
      console.log('udid', udid)
      store.dispatch('patientConditions', id)
      store.dispatch("programList");
      store.dispatch("patientInsurance", id);
      // store.dispatch('patientDetails', value)
      isEditPatient.value = true;
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

    const showAddFlagModal = () => {
      flagsModalVisible.value = true;
    }

    const showVitalssModal = () => {
      patientVitalsVisible.value = true;
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
      isEditTimeLog.value = false;
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

    const timeLogDetails = ref(null);
    const editTimeLog = (value) => {
      timeLogDetails.value = value;
      isEditTimeLog.value = true;
      // addTimeLogsVisible.value = true;
    }


    return {
      criticalNotesList,
      showCriticalNotesDetails,
      handleCriticalNote,
      handleOk,
      editTimeLog,
      showAddAppointmentModal,
      editPatient,
      showModalCustom,
      custom,
      value10: ref([]),

      criticalNotesDetailVisible,
      flagsModalVisible,
      editFamilyMember,
      showAddFamilyMemberModal,
      showFamilyMembersModal,
      addFamilyMembersModalVisible,
      familyMembersModalVisible,
      showCriticalModal,
      criticalModalVisible,
      patientsModalVisible,
      addAppointmentVisible,
      taskModalVisible,
      addVitalsVisible,
      patientVitalsVisible,
      addNoteVisible,
      notesDetailVisible,
      addDocumentVisible,
      documentDetailVisible,
      careCoordinatorsVisible,
      addTimeLogsVisible,
      timeLogsDetailVisible,
      addDeviceVisible,
      deviceDetailVisible,

      showAddFlagModal,
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

      getFamilyMemberDetails,
      familyMembersList,
      patientDetails,
      timeLogDetails,
      isFamilyMemberEdit,
      isEditTimeLog,
      isEditPatient,

      latestFlag,
      latestAppointment,
      latestTask,
      latestVital,
      latestNotes,
      latestDocument,
      latestCareTeam,
      latestTimeLog,
      latestDevice,
    }
  }
})
</script>
