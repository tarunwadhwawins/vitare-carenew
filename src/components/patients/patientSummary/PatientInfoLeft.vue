<template>
  <div class="patientInfo" v-if="patientDetails">
      <ProfileImage :isLeft="true" @onEditPatient="editPatient(patientDetails.id)" />

    <div class="pat-profile">
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 289)">
          Flags <PlusOutlined @click="showAddFlagModal(); actionTrack(paramsId,289,'patient')" /><br />
        </div>
        <div class="thumb-desc" v-if="latestFlag">
          <Flags :data="latestFlag.flags.data" :flag="latestFlag.color" />
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">
          Vital Summary
          <!-- <PlusOutlined @click="addVitalsModel" /> -->
        </div>
        <div v-if="bloodPressure != null || bloodGlucose != null || bloodOxygen != null || latestVital != null" class="thumb-desc">
          <a href="javascript:void(0)" v-if="arrayToObjact(screensPermissions, 287)">
            <span @click="showVitalsModal();actionTrack(paramsId,287,'patient')">{{ latestVital.deviceType }} {{ latestVital.value }} {{ latestVital.takeTime }}</span>
          </a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 296)">
          Notes <PlusOutlined @click="addNotesModal();actionTrack(paramsId,296,'patient')" />
        </div>
        <div v-if="latestNotes != null && arrayToObjact(screensPermissions, 324)" class="thumb-desc" >
          <a href="javascript:void(0)" @click="showNotesModal();actionTrack(paramsId,324,'patient')" >{{ latestNotes[0].note }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head">Non Compliance</div>
        <div class="thumb-desc">
          <WarningOutlined />
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 294)">
          Appointments
          <PlusOutlined @click="showAddAppointmentModal();actionTrack(paramsId,294,'patient')"/><br />
        </div>
        <div v-if="latestAppointment != null" class="thumb-desc">
          <router-link target="_blank" :to="'/appointment-calendar/'+patientDetails.id">
          {{ latestAppointment[0].staff.fullName+' '+latestAppointment[0].date }}
          </router-link>
        </div>
      </div>
      <div class="pat-profile-inner" >
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 290)">
          {{ $t('global.familyMembers') }} <PlusOutlined @click="showAddFamilyMemberModal();actionTrack(paramsId,290,'patient')"/><br />
        </div>
        <div v-if="familyMembersList && familyMembersList.length > 0 && arrayToObjact(screensPermissions, 302)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showFamilyMembersModal();actionTrack(paramsId,302,'patient')" >
            {{ familyMembersList[0].fullName }}
            <!-- {{ familyMembersList[0].firstName+' '+familyMembersList[0].middleName+' '+familyMembersList[0].lastName }} -->
          </a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 291)">
          {{ $t('global.physicians') }} <PlusOutlined @click="showAddPhysicianModal(1);actionTrack(paramsId,291,'patient')"/><br />
        </div>
        <div v-if="latestPhysician != null && arrayToObjact(screensPermissions, 305)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCoordinatorsListingModal(1);actionTrack(paramsId,305,'patient')" >{{ latestPhysician.staff }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 292)">
          Emergency Contacts <PlusOutlined @click="showAddEmergencyContactModal();actionTrack(paramsId,292,'patient')"/><br />
        </div>
        <div v-if="emergencyContactsList && emergencyContactsList.length > 0 && arrayToObjact(screensPermissions, 308)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showEmergencyContactDetailsModal();actionTrack(paramsId,308,'patient')" >{{ emergencyContactsList[0].firstName || emergencyContactsList[0].middleName || emergencyContactsList[0].lastName ?   emergencyContactsList[0].firstName+' '+emergencyContactsList[0].middleName+' '+emergencyContactsList[0].lastName  : emergencyContactsList[0].email}}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" @click="showCriticalModal(); actionTrack(paramsId,293,'patient')" v-if="arrayToObjact(screensPermissions, 293)">Pin
          <PlusOutlined />
        </div>
        <div v-if="latestCriticalNote != null && arrayToObjact(screensPermissions, 311)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCriticalNotesDetails();actionTrack(paramsId,311,'patient')" >{{ latestCriticalNote ? latestCriticalNote.criticalNote : '' }}</a>
        </div>
      </div>
      

      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 295)">
          Task <PlusOutlined @click="addTaskModal();actionTrack(paramsId,295,'patient')" /><br />
        </div>
        <div v-if="latestTask != null && arrayToObjact(screensPermissions, 295)" class="thumb-desc">
          <router-link target="_blank" :to="{ name: 'Tasks', query: {view: 'dashboard'} }" @click="actionTrack(paramsId,314,'patient')">{{ latestTask[0].title }}</router-link>
        </div>
      </div>
      
      <!-- <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 296)">
          Notes <PlusOutlined @click="addNotesModal();actionTrack(paramsId,296,'patient')" />
        </div>
        <div v-if="latestNotes != null && arrayToObjact(screensPermissions, 324)" class="thumb-desc" >
          <a href="javascript:void(0)" @click="showNotesModal();actionTrack(paramsId,324,'patient')" >{{ latestNotes[0].note }}</a>
        </div>
      </div> -->
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 297)">
          Documents <PlusOutlined @click="addDocumentsModal('true');actionTrack(paramsId,297,'patient')" />
        </div>
        <div v-if="latestDocument != null && arrayToObjact(screensPermissions, 317)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDocumentsModal();actionTrack(paramsId,317,'patient')" >{{ latestDocument[0].name }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 298)">
          Health Team <PlusOutlined @click="showAddPhysicianModal(0);actionTrack(paramsId,298,'patient')" />
        </div>
        <div v-if="latestCareTeam != null && arrayToObjact(screensPermissions, 305)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCoordinatorsListingModal(0);actionTrack(paramsId,305,'patient')" >{{ latestCareTeam.staff }}</a>
          <!-- <router-link target="_blank" :to="{ name: 'CoordinatorSummary', params: { udid: latestCareTeam.staffId  }}" >
            {{ latestCareTeam.staff }}
          </router-link> -->
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 299)">
          TimeLogs <PlusOutlined @click="addTimelogModal();actionTrack(paramsId,299,'patient')" />
        </div>
        <div v-if="latestTimeLog != null && arrayToObjact(screensPermissions, 325)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showTimelogModal();actionTrack(paramsId,325,'patient')" >{{ latestTimeLog[0].category+' '+latestTimeLog[0].date }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 300)">
          Devices <PlusOutlined @click="addDeviceModal();actionTrack(paramsId,300,'patient')" />
        </div>
        <div v-if="latestDevice != null && arrayToObjact(screensPermissions, 326)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDeviceModal();actionTrack(paramsId,326,'patient')" >{{ latestDevice[0].deviceType+'('+latestDevice[0].modelNumber+')' }}</a>
        </div>
      </div>
    
    <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 300)">
          Referral 
        </div>
        <div v-if="referralDetail != null && arrayToObjact(screensPermissions, 326)" class="thumb-desc">
          <a href="javascript:void(0)" @click="referral" v-if="referralDetail">{{ referralDetail.name }}</a>
        </div>
        <div v-else class="thumb-desc">
          <a href="javascript:void(0)" >N/A</a>
        </div>
      </div>
    </div>
  <ReferralViewModal v-if="referralDetail" v-model:visible="referralView" :referralDetail="referralDetail"/>
    <AddFamilyMemberModal v-model:visible="addfamilyMembersVisible" :patientId="patientDetails.id" @closeModal="handleOk" :isResponsiblePersonEdit="isResponsiblePersonEdit" />
    <!-- <AddPhysicianModal v-if="addPhysicianModalVisible" v-model:visible="addPhysicianModalVisible" @closeModal="handleOk" :isPhysicianEdit="isPhysicianEdit" :staffType="1" /> -->
    <AddEmergencyContacts v-model:visible="addEmergencyContactModalVisible" @closeModal="handleOk" :isEmergencyContactEdit="isEmergencyContactEdit" />
    <AddCriticalNote v-model:visible="criticalModalVisible" @closeModal="handleOk" @saveModal="handleCriticalNote($event)"/>
    <AddAppointmentModal v-model:visible="addAppointmentVisible" :patientId="patientDetails.id" :patientName="patientDetails.patientFullName" @closeModal="handleOk" @is-visible="handleOk" />
    <AddTasksModal v-model:visible="addTaskModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <AddNotesModal v-model:visible="addNoteVisible" @closeModal="handleOk" />
    <a-modal width="70%" v-model:visible="addDocumentVisible" title="Add Documents" :maskClosable="false" centered  @cancel="closeModal()" :footer="false">
    <Documents  :paramId="paramsId" :idPatient="patientDetails.id"  entity="patient" @document="addDocumentsModal($event)" />
    </a-modal>
    <AddCoordinatorsModal v-if="careCoordinatorsVisible" v-model:visible="careCoordinatorsVisible" @closeModal="handleOk" :staffType="staffType" :title="title" :isEditCareCoordinator="false" />
    <AddTimeLogsModal v-model:visible="addTimeLogsVisible" :isEditTimeLog="isEditTimeLog" :isAutomatic="isAutomatic" @closeModal="addTimeLogsClose($event)" />
    <AddDeviceModal v-model:visible="addDeviceVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <PatientFlagsModal v-model:visible="flagsModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <PatientsModal v-model:visible="patientsModalVisible" :isEdit="true" @closeModal="handleOk" @saveModal="handleOk($event)" />

    <ResponsiblePersonsDetailsModal v-model:visible="familyMembersModalVisible" :patientId="patientDetails.id" @isResponsiblePersonEdit="editResponsiblePerson" @closeModal="handleOk" />
    <!-- <PhysiciansDetailsModal v-if="physiciansModalVisible" v-model:visible="physiciansModalVisible" @isPhysicianEdit="editPhysician" @closeModal="handleOk" :staffType="staffType" /> -->
    <EmergencyContactsDetailsModal v-model:visible="emergencyContactsModalVisible" @isEmergencyContactEdit="editEmergencyContact" @closeModal="handleOk" />
    <CoordinatorsListingModal v-if="coordinatorsListingModalVisible" v-model:visible="coordinatorsListingModalVisible" :staffType="staffType" :title="title" @closeModal="handleOk" />
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
  PlusOutlined,
} from "@ant-design/icons-vue";

import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
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
  actionTrack,
  arrayToObjact
} from '@/commonMethods/commonMethod';

import ReferralViewModal from "@/components/patients/patientSummary/modals/ReferralViewModal"
export default defineComponent({
  components: {
    WarningOutlined,
    PlusOutlined,
    PatientFlagsModal: defineAsyncComponent(()=>import("@/components/modals/PatientFlagsModal")),
    PatientsModal: defineAsyncComponent(()=>import("@/components/modals/PatientsModal")),
    AddAppointmentModal: defineAsyncComponent(()=>import("@/components/modals/AddAppointment")),
    AddTasksModal: defineAsyncComponent(()=>import("@/components/modals/TasksModal")),
    AddNotesModal: defineAsyncComponent(()=>import("@/components/modals/AddNote")),
    NotesDetailModal: defineAsyncComponent(()=>import("@/components/modals/NotesDetail")),
    Documents: defineAsyncComponent(()=>import("@/components/modals/forms/Documents")),
    DocumentDetailModal: defineAsyncComponent(()=>import("@/components/modals/DocumentDetail")),
    AddCoordinatorsModal: defineAsyncComponent(()=>import("@/components/modals/AddCoordinatorsModal")),
    AddTimeLogsModal: defineAsyncComponent(()=>import("@/components/modals/AddTimeLogs")),
    TimeLogsDetailModal: defineAsyncComponent(()=>import("@/components/modals/TimeLogsDetail")),
    AddDeviceModal: defineAsyncComponent(()=>import("@/components/modals/AddDevice")),
    DeviceDetailModal: defineAsyncComponent(()=>import("@/components/modals/DeviceDetail")),
    PatientVitalsDetailsModal: defineAsyncComponent(()=>import("@/components/modals/PatientVitalsDetailsModal")),
    Flags: defineAsyncComponent(()=>import("@/components/common/flags/Flags")),
    AddCriticalNote: defineAsyncComponent(()=>import("@/components/modals/CriticalNote")),
    CriticalNotesDetailModal: defineAsyncComponent(()=>import("@/components/modals/CriticalNotesDetail")),
    AddFamilyMemberModal: defineAsyncComponent(()=>import("@/components/modals/AddFamilyMemberModal")),
    ResponsiblePersonsDetailsModal: defineAsyncComponent(()=>import("@/components/modals/FamilyMembersDetailsModal")),
    // AddPhysicianModal: defineAsyncComponent(()=>import("@/components/modals/AddPhysicianModal")),
    // // PhysiciansDetailsModal: defineAsyncComponent(()=>import("@/components/modals/PhysiciansDetailsModal")),
    AddEmergencyContacts: defineAsyncComponent(()=>import("@/components/modals/AddEmergencyContacts")),
    EmergencyContactsDetailsModal: defineAsyncComponent(()=>import("@/components/modals/EmergencyContactsDetailsModal")),
    CoordinatorsListingModal: defineAsyncComponent(()=>import("@/components/modals/CoordinatorsListingModal")),
    ProfileImage: defineAsyncComponent(()=>import("@/components/common/ProfileImage")),
    ReferralViewModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const custom = ref(false);
    const isEditTimeLog = ref(false);
    const isResponsiblePersonEdit = ref(false);
    const isPhysicianEdit = ref(false);
    const criticalNotesDetailVisible =ref(false)
    const flagsModalVisible = ref(false);
    const addfamilyMembersVisible =ref(false)
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
    // const addPhysicianModalVisible = ref(false);
    // const physiciansModalVisible = ref(false);
    const coordinatorsListingModalVisible = ref(false);
    const addEmergencyContactModalVisible = ref(false);
    const isEmergencyContactEdit = ref(false);
    const emergencyContactsModalVisible = ref(false);
    const isAutomatic = ref(false);
    const staffType = ref(0);
    const title = ref(null);
   const referralView = ref(false)
 function referral(){
   referralView.value=true
 }
    watchEffect(() => {
      if(route.name == 'PatientSummary') {
        store.dispatch('responsiblePerson', route.params.udid)
        store.dispatch('emergencyContact', route.params.udid)
        store.dispatch('familyMembersList', route.params.udid)
        store.dispatch('latestAppointment', route.params.udid)
        store.dispatch('latestTask', route.params.udid)
        store.dispatch('latestVital', route.params.udid)
        store.dispatch('latestNotes', route.params.udid)
        store.dispatch('latestDocument', route.params.udid)
        store.dispatch('patientCareCoordinatorsList', {
          patientUdid: route.params.udid,
          type: 1
        })
        store.dispatch('patientCareCoordinatorsList', {
          patientUdid: route.params.udid,
          type: 0
        })
        store.dispatch('latestTimeLog', route.params.udid)
        store.dispatch('latestDevice', route.params.udid)
        store.dispatch('criticalNotesList', route.params.udid)
        store.dispatch("referralDetail", route.params.udid)
      }
    })

    const latestCriticalNote = computed(() => {
      return store.state.patients.latestCriticalNote
    })

    const familyMembersList = computed(() => {
      return store.state.patients.familyMembersList
    })

    const physiciansList = computed(() => {
      return store.state.careTeam.physiciansList
    })

    const latestPhysician = computed(() => {
      return store.state.careTeam.latestPhysician
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
    const getResponsiblePersonDetails = computed(() => {
      return store.state.patients.getResponsiblePersonDetails
    })
    
    const handleOk = ({modal, value}) => {
      if(modal && value) {
        addEmergencyContactModalVisible.value = modal == 'addEmergencyContact' ? value : false;
        // addPhysicianModalVisible.value = modal == 'addPhysician' ? value : false;
        addfamilyMembersVisible.value = modal == 'addResponsiblePerson' ? value : false;
        patientsModalVisible.value = modal == 'editPatient' ? value : false;
        //addDocumentVisible.value = modal == 'addDocument' ? value : false;
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
        // physiciansModalVisible.value = modal == 'physiciansList' ? value : false;
        emergencyContactsModalVisible.value = modal == 'emergencyContactsList' ? value : false;
        deviceDetailVisible.value = modal == 'devicesListing' ? value : false;
        coordinatorsListingModalVisible.value = modal == 'deleteCareTeam' ? value : false;
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
        // addPhysicianModalVisible.value = false;
        addfamilyMembersVisible.value = false;
        patientsModalVisible.value = false;
        addDocumentVisible.value = false;
        documentDetailVisible.value = false;
        addTimeLogsVisible.value = false;
        criticalNotesDetailVisible.value = false;
        familyMembersModalVisible.value = false;
        // physiciansModalVisible.value = false;
        emergencyContactsModalVisible.value = false;
        coordinatorsListingModalVisible.value = false;
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
      addfamilyMembersVisible.value = true
      isResponsiblePersonEdit.value = false
    }

    const showFamilyMembersModal = ()=>{
      familyMembersModalVisible.value=true
    }

    const editResponsiblePerson = () => {
      isResponsiblePersonEdit.value=true
      addfamilyMembersVisible.value=true
    }

    const editEmergencyContact = () => {
      isEmergencyContactEdit.value = true
      addEmergencyContactModalVisible.value = true
    }

    const showAddPhysicianModal = (val) => {
      // addPhysicianModalVisible.value = true
      careCoordinatorsVisible.value = true
      isPhysicianEdit.value = false
      staffType.value = val;
      title.value = val == 1 ? 'Add Care Coordinator' : 'Add Health Team'
    }

    // const showPhysiciansModal = (val) => {
    //   // physiciansModalVisible.value = true
    //   staffType.value = val
    // }

    const showCoordinatorsListingModal = (val) => {
      coordinatorsListingModalVisible.value = true
      staffType.value = val
      title.value = val == 1 ? 'Care Coordinators' : '  Health Team'
    }

    const editPhysician = () => {
      isPhysicianEdit.value = true
      // addPhysicianModalVisible.value = true
    }

    const showCriticalModal = ()=>{
      criticalModalVisible.value=true
    }

    const showCriticalNotesDetails = ()=>{
      store.dispatch('patientCriticalNotes', route.params.udid);
      criticalNotesDetailVisible.value=true
    }
    const handleCriticalNote = (value) =>{
      criticalModalVisible.value=value
    }
    
    const showModalCustom = () => {
      custom.value = true;
    };

    const editPatient = (patientUdid) => {
      store.dispatch('patientDetails', patientUdid)
      store.dispatch('responsiblePerson', patientUdid)
      store.dispatch('emergencyContact', patientUdid)
      store.dispatch('patientConditions', patientUdid)
      store.dispatch("patientInsurance", patientUdid)
      store.dispatch("programList")
      patientsModalVisible.value = true
      store.commit('isEditPatient', true)
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

    const addDocumentsModal = (event) => {
      
      store.commit('clearStaffFormValidation',false)
      addDocumentVisible.value = event;
    }

    const showDocumentsModal = () => {
      
      documentDetailVisible.value = true;
    }

    // const addCareTeamModal = () => {
    //   careCoordinatorsVisible.value = true;
    //   staffType = 0;
    // }

    const addTimelogModal = () => {
      addTimeLogsVisible.value = true;
      isEditTimeLog.value = false;
      isAutomatic.value = false;
    }
     const addTimeLogsClose = (event) => {
      addTimeLogsVisible.value = event.value;
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

const checkFieldsData = computed(()=>{
      return store.state.common.checkChangeInput;
    })


    function closeModal() {
      if(checkFieldsData.value){
      warningSwal(messages.modalWarning).then((response) => {
        if (response == true) {
         
           addDocumentVisible.value =false
           store.commit('clearStaffFormValidation',true)
          store.commit('checkChangeInput',false)
           
          store.state.careCoordinator.addStaff =null
         
        } else {
          store.commit('clearStaffFormValidation',false)
          
              addDocumentVisible.value =true
          
        }
      });
      }else{
          store.commit('clearStaffFormValidation',true)
      }    
        
    }
    return {
      
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      actionTrack,
      paramsId:route.params.udid,
      latestCriticalNote,
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
      editResponsiblePerson,
      showAddFamilyMemberModal,
      showFamilyMembersModal,
      addfamilyMembersVisible,
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
      // addCareTeamModal,
      addTimelogModal,
      showTimelogModal,
      addDeviceModal,
      showDeviceModal,
      showCoordinatorsListingModal,

      getResponsiblePersonDetails,
      familyMembersList,
      physiciansList,
      patientDetails,
      timeLogDetails,
      isPhysicianEdit,
      isResponsiblePersonEdit,
      isEditTimeLog,

      latestFlag,
      latestAppointment,
      latestTask,
      latestVital,
      latestNotes,
      latestDocument,
      latestCareTeam,
      latestPhysician,
      latestTimeLog,
      latestDevice,

      // addPhysicianModalVisible,
      // physiciansModalVisible,
      coordinatorsListingModalVisible,
      showAddPhysicianModal,
      // showPhysiciansModal,

      emergencyContactsList,
      editEmergencyContact,
      showAddEmergencyContactModal,
      showEmergencyContactDetailsModal,
      addEmergencyContactModalVisible,
      isEmergencyContactEdit,
      emergencyContactsModalVisible,
      
      staffType,
      title,
      closeModal,
      addTimeLogsClose,
      referralView,
      referral,
      referralDetail:store.getters.referralDetail
      
    }
  }
})
</script>
