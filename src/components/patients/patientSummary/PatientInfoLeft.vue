<template>
  <div class="patientInfo" v-if="patientDetails">
    <div class="patientImg" @click="showModalCustom()">
      <a-upload class="content" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" >
        <div class="content-overlay"></div>
        <img v-if="patientDetails.profilePhoto" class="ant-upload-text" :src="patientDetails.profilePhoto" alt="image"/>
        <img v-else-if="imageUrl" :src="imageUrl" alt="avatar" class="ant-upload-text" />
        <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
        <div class="content-details fadeIn-bottom">
          <h3 class="content-title">Change Image</h3>
        </div>
      </a-upload>
      <div class="info">
        <p v-if="patientDetails.patientFullName">Name: {{ patientDetails.patientFullName }}</p>
        <p v-if="patientDetails.patientDob">DOB : {{ patientDetails.patientDob }}</p>
        <p v-if="patientDetails.medicalRecordNumber">MRN : {{ patientDetails.medicalRecordNumber }}</p>
        <p v-if="patientDetails.email"><a @click="actionTrack(paramsId,321,'patient')" v-if="arrayToObjact(screensPermissions, 321)" href="mailto:{{patientDetails.email}}"><MailOutlined /> {{ patientDetails.email }}</a></p>
        <p v-if="patientDetails.phoneNumber"><a @click="actionTrack(paramsId,322,'patient')" v-if="arrayToObjact(screensPermissions, 322)" href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a></p>
        <p v-if="patientDetails.address"><HomeOutlined/> <span class="address-text">{{ patientDetails.address }}</span></p>
      </div>
      <EditOutlined class="editIcon" @click="editPatient({udid: patientDetails.id, id: patientDetails.id});actionTrack(paramsId,301,'patient')" v-if="arrayToObjact(screensPermissions, 301)||arrayToObjact(screensPermissions, 63)"/>
    </div>

    <div class="pat-profile">
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 289)">
          Flags <PlusOutlined @click="showAddFlagModal(); actionTrack(paramsId,289,'patient')" /><br />
        </div>
        <div class="thumb-desc" v-if="latestFlag">
          <Flags :data="latestFlag.flags.data" :flag="latestFlag.color" />
        </div>
      </div>
      <div class="pat-profile-inner" >
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 290)">
          {{ $t('global.familyMembers') }} <PlusOutlined @click="showAddFamilyMemberModal();actionTrack(paramsId,290,'patient')"/><br />
        </div>
        <div v-if="familyMembersList && familyMembersList.length > 0 && arrayToObjact(screensPermissions, 302)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showFamilyMembersModal();actionTrack(paramsId,302,'patient')" >{{familyMembersList[0].fullName}}</a>
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
          <a href="javascript:void(0)" @click="showEmergencyContactDetailsModal();actionTrack(paramsId,308,'patient')" >{{ emergencyContactsList[0].fullName }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" @click="showCriticalModal(); actionTrack(paramsId,293,'patient')" v-if="arrayToObjact(screensPermissions, 293)">Critical Note
          <PlusOutlined />
        </div>
        <div v-if="criticalNotesList != null && arrayToObjact(screensPermissions, 311)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCriticalNotesDetails();actionTrack(paramsId,311,'patient')" >{{ criticalNotesList[0]?criticalNotesList[0].criticalNote:'' }}</a>
        </div>
        <!-- <div v-if="criticalNotesList" class="thumb-desc">
          <a href="javascript:void(0)" @click="showCriticalNotesDetails();actionTrack(paramsId,311,'patient')" >{{ criticalNotesList[0]?criticalNotesList[0].criticalNote.substring(0,20):'' }}</a>
        </div> -->
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

      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 295)">
          Task <PlusOutlined @click="addTaskModal();actionTrack(paramsId,295,'patient')" /><br />
        </div>
        <div v-if="latestTask != null && arrayToObjact(screensPermissions, 295)" class="thumb-desc">
          <router-link target="_blank" :to="{ name: 'Tasks', query: {view: 'dashboard'} }" @click="actionTrack(paramsId,314,'patient')">{{ latestTask[0].title }}</router-link>
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
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 297)">
          Documents <PlusOutlined @click="addDocumentsModal();actionTrack(paramsId,297,'patient')" />
        </div>
        <div v-if="latestDocument != null && arrayToObjact(screensPermissions, 317)" class="thumb-desc">
          <a href="javascript:void(0)" @click="showDocumentsModal();actionTrack(paramsId,317,'patient')" >{{ latestDocument[0].name }}</a>
        </div>
      </div>
      <div class="pat-profile-inner">
        <div class="thumb-head" v-if="arrayToObjact(screensPermissions, 298)">
          {{ $t('global.careTeam') }} <PlusOutlined @click="showAddPhysicianModal(0);actionTrack(paramsId,298,'patient')" />
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
    </div>
  
    <AddFamilyMemberModal v-model:visible="addFamilyMembersModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" :isFamilyMemberEdit="isFamilyMemberEdit" />
    <!-- <AddPhysicianModal v-if="addPhysicianModalVisible" v-model:visible="addPhysicianModalVisible" @closeModal="handleOk" :isPhysicianEdit="isPhysicianEdit" :staffType="1" /> -->
    <AddEmergencyContacts v-model:visible="addEmergencyContactModalVisible" @closeModal="handleOk" :isEmergencyContactEdit="isEmergencyContactEdit" />
    <AddCriticalNote v-model:visible="criticalModalVisible" @closeModal="handleOk" @saveModal="handleCriticalNote($event)"/>
    <AddAppointmentModal v-model:visible="addAppointmentVisible" :patientId="patientDetails.id" :patientName="patientDetails.patientFullName" @closeModal="handleOk" @is-visible="handleOk" />
    <AddTasksModal v-model:visible="addTaskModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <AddNotesModal v-model:visible="addNoteVisible" @closeModal="handleOk" />
    <AddDocumentModal v-model:visible="addDocumentVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <AddCoordinatorsModal v-if="careCoordinatorsVisible" v-model:visible="careCoordinatorsVisible" @closeModal="handleOk" :staffType="staffType" :title="title" :isEditCareCoordinator="false" />
    <AddTimeLogsModal v-model:visible="addTimeLogsVisible" :isEditTimeLog="isEditTimeLog" :isAutomatic="isAutomatic" @closeModal="handleOk" />
    <AddDeviceModal v-model:visible="addDeviceVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <PatientFlagsModal v-model:visible="flagsModalVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <PatientsModal v-model:visible="patientsModalVisible" @closeModal="handleOk" @saveModal="handleOk($event)" />

    <FamilyMembersDetailsModal v-model:visible="familyMembersModalVisible" :patientId="patientDetails.id" @isFamilyMemberEdit="editFamilyMember" @closeModal="handleOk" />
    <!-- <PhysiciansDetailsModal v-if="physiciansModalVisible" v-model:visible="physiciansModalVisible" @isPhysicianEdit="editPhysician" @closeModal="handleOk" :staffType="staffType" /> -->
    <EmergencyContactsDetailsModal v-model:visible="emergencyContactsModalVisible" @isEmergencyContactEdit="editEmergencyContact" @closeModal="handleOk" />
    <CoordinatorsListingModal v-if="coordinatorsListingModalVisible" v-model:visible="coordinatorsListingModalVisible" :staffType="staffType" :title="title" @closeModal="handleOk" />
    <CriticalNotesDetailModal v-model:visible="criticalNotesDetailVisible" @closeModal="handleOk"/>
    <PatientVitalsDetailsModal v-model:visible="patientVitalsVisible" :patientId="patientDetails.id" @closeModal="handleOk" />
    <NotesDetailModal v-model:visible="notesDetailVisible" @closeModal="handleOk" />
    <DocumentDetailModal v-model:visible="documentDetailVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <TimeLogsDetailModal v-model:visible="timeLogsDetailVisible" @editTimeLog="editTimeLog($event)" />
    <DeviceDetailModal v-model:visible="deviceDetailVisible" :patientDetails="patientDetails" @closeModal="handleOk" />
    <ImageCropper v-if="modalVisible" v-model:visible="modalVisible" :imageUrl="imageinCropper" @closeModal="closeImageModal" @crop="updateProfileImage" />

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
  actionTrack,
  arrayToObjact
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
    FamilyMembersDetailsModal: defineAsyncComponent(()=>import("@/components/modals/FamilyMembersDetailsModal")),
    // AddPhysicianModal: defineAsyncComponent(()=>import("@/components/modals/AddPhysicianModal")),
    // // PhysiciansDetailsModal: defineAsyncComponent(()=>import("@/components/modals/PhysiciansDetailsModal")),
    AddEmergencyContacts: defineAsyncComponent(()=>import("@/components/modals/AddEmergencyContacts")),
    EmergencyContactsDetailsModal: defineAsyncComponent(()=>import("@/components/modals/EmergencyContactsDetailsModal")),
    CoordinatorsListingModal: defineAsyncComponent(()=>import("@/components/modals/CoordinatorsListingModal")),
    ImageCropper: defineAsyncComponent(()=>import("@/components/common/ImageCropper")),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const custom = ref(false);
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
    // const addPhysicianModalVisible = ref(false);
    // const physiciansModalVisible = ref(false);
    const coordinatorsListingModalVisible = ref(false);
    const addEmergencyContactModalVisible = ref(false);
    const isEmergencyContactEdit = ref(false);
    const emergencyContactsModalVisible = ref(false);
    const isAutomatic = ref(false);
    const staffType = ref(0);
    const title = ref(null);

    const imageinCropper = ref('');
    const imageUrl = ref('');
    const modalVisible = ref(false);
    const fileName = ref('');

    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

    const handleChange = info => {
      store.commit('uploadFile', null)
      store.commit('errorMsg', null)
      fileName.value = info.file.name
      getBase64(info.file.originFileObj, base64Url => {
        imageinCropper.value = base64Url;
      });
      modalVisible.value = true;
    };

    const updateProfileImage = (dataURL) => {
      var file = dataURLtoFile(dataURL, fileName.value);
      let formData = new FormData();
      formData.append("file", file);

      store.dispatch("updateProfileImage", {
        formData: formData,
        patientUdid: route.params.udid,
      }).then(() => {
        store.dispatch("patientDetails", route.params.udid).then(() => {
          store.commit('uploadFile', null)
          store.commit('errorMsg', null)
        })
      })
    }

     function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
          
      while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }

    const closeImageModal = () => {
      modalVisible.value = false;
    }

    watchEffect(() => {
      if(route.name == 'PatientSummary') {
        store.dispatch('patientDetails', route.params.udid)
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
      }
    })

    const criticalNotesList = computed(() => {
      return store.state.patients.criticalNotesList
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
    const getFamilyMemberDetails = computed(() => {
      return store.state.patients.getFamilyMemberDetails
    })
    
    const handleOk = ({modal, value}) => {
      if(value) {
        addEmergencyContactModalVisible.value = modal == 'addEmergencyContact' ? value : false;
        // addPhysicianModalVisible.value = modal == 'addPhysician' ? value : false;
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
        addFamilyMembersModalVisible.value = false;
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
      criticalNotesDetailVisible.value=true
    }
    const handleCriticalNote = (value) =>{
      criticalModalVisible.value=value
    }
    
    const showModalCustom = () => {
      custom.value = true;
    };

    const editPatient = ({udid, id}) => {
      store.commit('isEditPatient', true)
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

    // const addCareTeamModal = () => {
    //   careCoordinatorsVisible.value = true;
    //   staffType = 0;
    // }

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
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
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
      // addCareTeamModal,
      addTimelogModal,
      showTimelogModal,
      addDeviceModal,
      showDeviceModal,
      showCoordinatorsListingModal,

      getFamilyMemberDetails,
      familyMembersList,
      physiciansList,
      patientDetails,
      timeLogDetails,
      isPhysicianEdit,
      isFamilyMemberEdit,
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

      imageinCropper,
      imageUrl,
      handleChange,
      modalVisible,
      updateProfileImage,
      closeImageModal,
    }
  }
})
</script>

<style scoped>
span.anticon.anticon-plus {
  position: relative;
  top: -2px;
}

.container {
  padding: 1em 0;
  float: left;
  width: 50%;
}
.container .title {
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 10px;
}

/* .content {
  margin: 0 auto;
  position: relative;
} */

.content {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  margin: 0 15px 0 0;
}

.content .content-overlay {
  background: rgba(0,0,0,0.7);
  position: absolute;
  /* height: 99%; */
  /* width: 30%; */
  left: 15px;
  top: 21px;
  bottom: 0;
  right: 0;
  opacity: 0;
  -webkit-transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;

  width: 130px;
  height: 130px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  margin: 0 15px 0 0;
}

.content:hover .content-overlay {
  opacity: 1;
}

.content:hover {
  cursor: pointer;
}

.content-details {
  position: relative;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.content:hover .content-details {
  top: 50%;
  left: 50%;
  opacity: 1;
}

.content-details h3 {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.15em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
  font-size: 12px;
}

.content-details p {
  color: #fff;
  font-size: 0.8em;
}

.fadeIn-bottom {
  top: -62px !important;
  position: relative;
  width: 200px;
  left: 66px !important;
}
</style>