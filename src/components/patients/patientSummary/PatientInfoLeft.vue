<template>
  <div class="patientInfo" v-if="patientDetails">
    <div class="patientImg" @click="showModalCustom()">
      <img v-if="patientDetails.profilePhoto" :src="patientDetails.profilePhoto" alt="image"/>
      <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
      <div class="info">
        <p v-if="patientDetails.patientFullName">Name: {{ patientDetails.patientFullName }}</p>
        <p v-if="patientDetails.patientDob">DOB : {{ patientDetails.patientDob }}</p>
        <p v-if="patientDetails.medicalRecordNumber">MRN : {{ patientDetails.medicalRecordNumber }}</p>
        <p v-if="patientDetails.email"><a @click="actionTrack(paramsId,321,'patient')" href="mailto:{{patientDetails.email}}"><MailOutlined /> {{ patientDetails.email }}</a></p>
        <p v-if="patientDetails.phoneNumber"><a @click="actionTrack(paramsId,322,'patient')" href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a></p>
        <p v-if="patientDetails.address"><HomeOutlined/> <span class="address-text">{{ patientDetails.address }}</span></p>
      </div>
      <EditOutlined class="editIcon" @click="editPatient({udid: patientDetails.id, id: patientDetails.id});;actionTrack(paramsId,301,'patient')" />
    </div>

    <div class="pat-profile">
      <div class="pat-profile-inner">
        <div class="thumb-head" >
          Flags <PlusOutlined @click="showAddFlagModal(); actionTrack(paramsId,289,'patient')"/><br />
        </div>
        <div class="thumb-desc" v-if="latestFlag">
          <Flags :data="latestFlag.flags.data" :flag="latestFlag.color" />
        </div>
      </div>
      <div class="pat-profile-inner" >
        <div class="thumb-head">
          {{ $t('global.familyMembers') }} <PlusOutlined @click="showAddFamilyMemberModal();actionTrack(paramsId,290,'patient')"/><br />
        </div>
        <div v-if="familyMembersList && familyMembersList.length > 0" class="thumb-desc">
          <a href="javascript:void(0)" @click="showFamilyMembersModal();actionTrack(paramsId,302,'patient')" >{{familyMembersList[0].fullName}}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          {{ $t('global.physicians') }} <PlusOutlined @click="showAddPhysicianModal();actionTrack(paramsId,291,'patient')"/><br />
        </div>
        <div v-if="physiciansList && physiciansList.length > 0" class="thumb-desc">
          <a href="javascript:void(0)" @click="showPhysiciansModal();actionTrack(paramsId,305,'patient')" >{{ physiciansList[0].name }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Emergency Contacts <PlusOutlined @click="showAddEmergencyContactModal();actionTrack(paramsId,292,'patient')"/><br />
        </div>
        <div v-if="emergencyContactsList && emergencyContactsList.length > 0" class="thumb-desc">
          <a href="javascript:void(0)" @click="showEmergencyContactDetailsModal();actionTrack(paramsId,308,'patient')" >{{ emergencyContactsList[0].fullName }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" @click="showCriticalModal(); actionTrack(paramsId,293,'patient')">Critical Note
          <PlusOutlined />
        </div>
        <div v-if="criticalNotesList" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCriticalNotesDetails();actionTrack(paramsId,311,'patient')" >{{ criticalNotesList[0]?criticalNotesList[0].criticalNote.substring(0,20)+'...':'' }}</a>
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
          <PlusOutlined @click="showAddAppointmentModal();actionTrack(paramsId,294,'patient')"/><br />
        </div>
        <div v-if="latestAppointment != null" class="thumb-desc">
          <router-link :to="'/appointment-calendar/'+patientDetails.id">
          {{ latestAppointment[0].staff.fullName+' '+latestAppointment[0].date }}
          </router-link>
        </div>
      </div>

      <div class="pat-profile-inner">
        <div class="thumb-head">
          Task <PlusOutlined @click="addTaskModal();actionTrack(paramsId,295,'patient')" /><br />
        </div>
        <div v-if="latestTask != null" class="thumb-desc">
          <router-link target="_blank" to="/tasks" @click="actionTrack(paramsId,314,'patient')">{{ latestTask[0].title }}</router-link>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Vital Summary
          <!-- <PlusOutlined @click="addVitalsModel" /> -->
        </div>
        <div v-if="bloodPressure != null || bloodGlucose != null || bloodOxygen != null || latestVital != null" class="thumb-desc">
          <a href="javascript:void(0)">
            <span @click="showVitalsModal">{{ latestVital.deviceType }} {{ latestVital.value }} {{ latestVital.takeTime }}</span>
          </a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Notes <PlusOutlined @click="addNotesModal();actionTrack(paramsId,296,'patient')" />
        </div>
        <div v-if="latestNotes != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showNotesModal();actionTrack(paramsId,324,'patient')" >{{ latestNotes[0].note }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Documents <PlusOutlined @click="addDocumentsModal();actionTrack(paramsId,297,'patient')" />
        </div>
        <div v-if="latestDocument != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDocumentsModal();actionTrack(paramsId,317,'patient')" >{{ latestDocument[0].name }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          {{ $t('global.careTeam') }} <PlusOutlined @click="addCareTeamModal();actionTrack(paramsId,298,'patient')" />
        </div>
        <div v-if="latestCareTeam != null" class="thumb-desc">
          <router-link target="_blank" :to="{ name: 'CoordinatorSummary', params: { udid: latestCareTeam.staffId  }}" >
            {{ latestCareTeam.staff }}
          </router-link>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          TimeLogs <PlusOutlined @click="addTimelogModal();actionTrack(paramsId,299,'patient')" />
        </div>
        <div v-if="latestTimeLog != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showTimelogModal();actionTrack(paramsId,325,'patient')" >{{ latestTimeLog[0].category+' '+latestTimeLog[0].date }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Devices <PlusOutlined @click="addDeviceModal();actionTrack(paramsId,300,'patient')" />
        </div>
        <div v-if="latestDevice != null" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDeviceModal();actionTrack(paramsId,326,'patient')" >{{ latestDevice[0].deviceType+'('+latestDevice[0].modelNumber+')' }}</a>
        </div>
      </div>
    </div>
  
    <AddFamilyMemberModal v-model:visible="addFamilyMembersModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" :isFamilyMemberEdit="isFamilyMemberEdit" />
    <AddPhysicianModal v-model:visible="addPhysicianModalVisible" @closeModal="handleOk" :isPhysicianEdit="isPhysicianEdit" />
    <AddEmergencyContacts v-model:visible="addEmergencyContactModalVisible" @closeModal="handleOk" :isEmergencyContactEdit="isEmergencyContactEdit" />
    <AddCriticalNote v-model:visible="criticalModalVisible" @closeModal="handleOk" @saveModal="handleCriticalNote($event)"/>
    <AddAppointmentModal v-model:visible="addAppointmentVisible" :patientId="patientDetails.id" :patientName="patientDetails.patientFullName" @closeModal="handleOk" @is-visible="handleOk" />
    <AddTasksModal v-model:visible="addTaskModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <AddNotesModal v-model:visible="addNoteVisible" @closeModal="handleOk" />
    <AddDocumentModal v-model:visible="addDocumentVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <AddCareTeamModal v-model:visible="careCoordinatorsVisible" @closeModal="handleOk" />
    <AddTimeLogsModal v-model:visible="addTimeLogsVisible" :isEditTimeLog="isEditTimeLog" :isAutomatic="isAutomatic" @closeModal="handleOk" />
    <AddDeviceModal v-model:visible="addDeviceVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <PatientFlagsModal v-model:visible="flagsModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <PatientsModal v-model:visible="patientsModalVisible" :patientId="patientDetails.id" :isEditPatient="isEditPatient" @closeModal="handleOk" @saveModal="handleOk($event)" />

    <FamilyMembersDetailsModal v-model:visible="familyMembersModalVisible" :patientId="patientDetails.id" @isFamilyMemberEdit="editFamilyMember" @closeModal="handleOk" />
    <PhysiciansDetailsModal v-model:visible="physiciansModalVisible" @isPhysicianEdit="editPhysician" @closeModal="handleOk" />
    <EmergencyContactsDetailsModal v-model:visible="emergencyContactsModalVisible" @isEmergencyContactEdit="editEmergencyContact" @closeModal="handleOk" />
    <CriticalNotesDetailModal v-model:visible="criticalNotesDetailVisible" @closeModal="handleOk"/>
    <PatientVitalsDetailsModal v-model:visible="patientVitalsVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <NotesDetailModal v-model:visible="notesDetailVisible" @closeModal="handleOk" />
    <DocumentDetailModal v-model:visible="documentDetailVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <TimeLogsDetailModal v-model:visible="timeLogsDetailVisible" @editTimeLog="editTimeLog($event)" />
    <DeviceDetailModal v-model:visible="deviceDetailVisible" :patientDetails="patientDetails" @closeModal="handleOk" />

  </div>
</template>

<script>
import {
  WarningOutlined,
  MailOutlined,
  PlusOutlined,
  EditOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";

// import Flags from "@/components/common/flags/Flags";
/* import PatientsModal from "@/components/modals/PatientsModal"
import AddFamilyMemberModal from "@/components/modals/AddFamilyMemberModal"
import AddPhysicianModal from "@/components/modals/AddPhysicianModal"
import AddEmergencyContacts from "@/components/modals/AddEmergencyContacts"
import DocumentDetailModal from "@/components/modals/DocumentDetail"
import AddDocumentModal from "@/components/modals/AddDocument" */

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
import {
  actionTrack
} from '@/commonMethods/commonMethod';


export default defineComponent({
  components: {
    WarningOutlined,
    MailOutlined,
    PlusOutlined,
    EditOutlined,
    PhoneOutlined,
    HomeOutlined,
    PatientFlagsModal: defineAsyncComponent(()=>import("@/components/modals/PatientFlagsModal")),
    PatientsModal: defineAsyncComponent(()=>import("@/components/modals/PatientsModal")),
    AddAppointmentModal: defineAsyncComponent(()=>import("@/components/modals/AddAppointment")),
    AddTasksModal: defineAsyncComponent(()=>import("@/components/modals/TasksModal")),
    AddNotesModal: defineAsyncComponent(()=>import("@/components/modals/AddNote")),
    NotesDetailModal: defineAsyncComponent(()=>import("@/components/modals/NotesDetail")),
    AddDocumentModal: defineAsyncComponent(()=>import("@/components/modals/AddDocument")),
    DocumentDetailModal: defineAsyncComponent(()=>import("@/components/modals/DocumentDetail")),
    AddCareTeamModal: defineAsyncComponent(()=>import("@/components/modals/CareCoordinators")),
    AddTimeLogsModal: defineAsyncComponent(()=>import("@/components/modals/AddTimeLogs")),
    TimeLogsDetailModal: defineAsyncComponent(()=>import("@/components/modals/TimeLogsDetail")),
    AddDeviceModal: defineAsyncComponent(()=>import("@/components/modals/AddDevice")),
    DeviceDetailModal: defineAsyncComponent(()=>import("@/components/modals/DeviceDetail")),
    PatientVitalsDetailsModal: defineAsyncComponent(()=>import("@/components/modals/PatientVitalsDetailsModal")),
    Flags: defineAsyncComponent(()=>import("@/components/common/flags/Flags")),
    AddCriticalNote: defineAsyncComponent(()=>import("@/components/modals/CriticalNote")),
    CriticalNotesDetailModal: defineAsyncComponent(()=>import("@/components/modals/CriticalNotesDetail")),
    AddFamilyMemberModal: defineAsyncComponent(()=>import("@/components/modals/AddFamilyMemberModal")),
    FamilyMembersDetailsModal: defineAsyncComponent(()=>import("@/components/modals/FamilyMembersDetailsModal")),
    AddPhysicianModal: defineAsyncComponent(()=>import("@/components/modals/AddPhysicianModal")),
    PhysiciansDetailsModal: defineAsyncComponent(()=>import("@/components/modals/PhysiciansDetailsModal")),
    AddEmergencyContacts: defineAsyncComponent(()=>import("@/components/modals/AddEmergencyContacts")),
    EmergencyContactsDetailsModal: defineAsyncComponent(()=>import("@/components/modals/EmergencyContactsDetailsModal")),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const custom = ref(false);
    const isEditPatient = ref(false);
    const isEditTimeLog = ref(false);
    const isFamilyMemberEdit = ref(false);
    const isPhysicianEdit = ref(false);
    const criticalNotesDetailVisible =ref(false)
    const flagsModalVisible = ref(false);
    const addFamilyMembersModalVisible =ref(false)
    const familyMembersModalVisible =ref(false)
    const criticalModalVisible =ref(false)
    const patientsModalVisible = ref(false);
    const addAppointmentVisible = ref(false);
    const addTaskModalVisible = ref(false);
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
    const addPhysicianModalVisible = ref(false);
    const physiciansModalVisible = ref(false);
    const addEmergencyContactModalVisible = ref(false);
    const isEmergencyContactEdit = ref(false);
    const emergencyContactsModalVisible = ref(false);
    const isAutomatic = ref(false);

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

    const physiciansList = computed(() => {
      return store.state.patients.physiciansList
    })

    const emergencyContactsList = computed(() => {
      return store.state.patients.emergencyContactsList
    })

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
    
    const handleOk = ({modal, value}) => {
      if(value) {
        addEmergencyContactModalVisible.value = modal == 'addEmergencyContact' ? value : false;
        addPhysicianModalVisible.value = modal == 'addPhysician' ? value : false;
        addFamilyMembersModalVisible.value = modal == 'addFamilyMember' ? value : false;
        patientsModalVisible.value = modal == 'editPatient' ? value : false;
        addDocumentVisible.value = modal == 'addDocument' ? value : false;
        documentDetailVisible.value = modal == 'documentDetails' ? value : false;
        addTimeLogsVisible.value = modal == 'addTimeLog' ? value : false;
        flagsModalVisible.value = modal == 'addFlag' ? value : false;
        criticalNotesDetailVisible.value = modal == 'criticalNotesDetails' ? value : false;
        addAppointmentVisible.value = modal == 'addAppointment' ? value : false;
        addTaskModalVisible.value = modal == 'addTask' ? value : false;
        addNoteVisible.value = modal == 'addNote' ? value : false;
        careCoordinatorsVisible.value = modal == 'addCareTeam' ? value : false;
        addDeviceVisible.value = modal == 'addInventory' ? value : false;
        familyMembersModalVisible.value = modal == 'familyMembersList' ? value : false;
        physiciansModalVisible.value = modal == 'physiciansList' ? value : false;
        emergencyContactsModalVisible.value = modal == 'emergencyContactsList' ? value : false;
        deviceDetailVisible.value = modal == 'devicesListing' ? value : false;
      }
      else {
        flagsModalVisible.value = false;
        notesDetailVisible.value = false;
        addAppointmentVisible.value = false;
        addTaskModalVisible.value = false;
        addVitalsVisible.value = false;
        patientVitalsVisible.value = false;
        addNoteVisible.value = false;
        careCoordinatorsVisible.value = false;
        timeLogsDetailVisible.value = false;
        addDeviceVisible.value = false;
        deviceDetailVisible.value = false;
        addEmergencyContactModalVisible.value = false;
        addPhysicianModalVisible.value = false;
        addFamilyMembersModalVisible.value = false;
        patientsModalVisible.value = false;
        addDocumentVisible.value = false;
        documentDetailVisible.value = false;
        addTimeLogsVisible.value = false;
        criticalNotesDetailVisible.value = false;
        familyMembersModalVisible.value = false;
        physiciansModalVisible.value = false;
        emergencyContactsModalVisible.value = false;
      }
    };

    const showAddEmergencyContactModal = () => {
      addEmergencyContactModalVisible.value = true
      isEmergencyContactEdit.value = false
    }

    const showEmergencyContactDetailsModal = () => {
      emergencyContactsModalVisible.value = true
    }

    const showAddFamilyMemberModal = () => {
      addFamilyMembersModalVisible.value = true
      isFamilyMemberEdit.value = false
    }

    const showFamilyMembersModal = ()=>{
      familyMembersModalVisible.value=true
    }

    const editFamilyMember = () => {
      isFamilyMemberEdit.value=true
      addFamilyMembersModalVisible.value=true
    }

    const editEmergencyContact = () => {
      isEmergencyContactEdit.value = true
      addEmergencyContactModalVisible.value = true
    }

    const showAddPhysicianModal = () => {
      addPhysicianModalVisible.value = true
      isPhysicianEdit.value = false
    }

    const showPhysiciansModal = () => {
      physiciansModalVisible.value = true
    }

    const editPhysician = () => {
      isPhysicianEdit.value = true
      addPhysicianModalVisible.value = true
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
      isEditPatient.value = true;
      console.log('udid', udid)
      store.dispatch('patientConditions', id)
      store.dispatch("programList");
      store.dispatch("patientInsurance", id);
      // store.dispatch('patientDetails', value)
      patientsModalVisible.value = true;
    };
    const showAddAppointmentModal = () => {
      addAppointmentVisible.value = true;
    };

    const addTaskModal = () => {
      addTaskModalVisible.value = true;
    }

    const addVitalsModel = () => {
      addVitalsVisible.value = true;
    }

    const showAddFlagModal = () => {
      flagsModalVisible.value = true;
    }

    const showVitalsModal = () => {
      patientVitalsVisible.value = true;
    }

    const addNotesModal = () => {
      addNoteVisible.value = true;
    }

    const showNotesModal = () => {
      store.dispatch('notesList', route.params.udid);
      notesDetailVisible.value = true;
    }

    const addDocumentsModal = () => {
      addDocumentVisible.value = true;
    }

    const showDocumentsModal = () => {
      documentDetailVisible.value = true;
    }

    const addCareTeamModal = () => {
      careCoordinatorsVisible.value = true;
    }

    const addTimelogModal = () => {
      addTimeLogsVisible.value = true;
      isEditTimeLog.value = false;
      isAutomatic.value = false;
    }

    const showTimelogModal = () => {
      store.dispatch('timeLogsList', {
        id: route.params.udid
      })
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
      isEditTimeLog.value = true;
      timeLogDetails.value = value;
    }


    return {
      actionTrack,
      paramsId:route.params.udid,
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
      editPhysician,
      editFamilyMember,
      showAddFamilyMemberModal,
      showFamilyMembersModal,
      addFamilyMembersModalVisible,
      familyMembersModalVisible,
      showCriticalModal,
      criticalModalVisible,
      patientsModalVisible,
      addAppointmentVisible,
      addTaskModalVisible,
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
      showVitalsModal,
      addNotesModal,
      showNotesModal,
      addDocumentsModal,
      showDocumentsModal,
      addCareTeamModal,
      addTimelogModal,
      showTimelogModal,
      addDeviceModal,
      showDeviceModal,

      getFamilyMemberDetails,
      familyMembersList,
      physiciansList,
      patientDetails,
      timeLogDetails,
      isPhysicianEdit,
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

      addPhysicianModalVisible,
      physiciansModalVisible,
      showAddPhysicianModal,
      showPhysiciansModal,

      emergencyContactsList,
      editEmergencyContact,
      showAddEmergencyContactModal,
      showEmergencyContactDetailsModal,
      addEmergencyContactModalVisible,
      isEmergencyContactEdit,
      emergencyContactsModalVisible,
    }
  }
})
</script>

<style scoped>
span.anticon.anticon-plus {
  position: relative;
  top: -2px;
}
</style>