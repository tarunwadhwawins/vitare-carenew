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
                <a-row>
                    <a-col :span="24">
                        <h2 class="pageTittle">Care Coordinator Summary</h2>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :sm="7" :xs="24">
                        <div class="patientInfo">
                            <EditOutlined class="editIcon" style="float:right;padding:10px" @click="editStaff()"/>
                            <div class="patientImg">
                                <!-- <img v-if="getstaffSummary.profilePhoto" :src="getstaffSummary.profilePhoto" alt="image"/> -->
                                <img  src="@/assets/images/userAvatar.png" alt="image"/>
                                <!-- <img src="../../assets/images/profile-4.jpg" alt="image" /> -->
                                <div class="info">
                                    <p>Name: {{getstaffSummary?getstaffSummary.fullName:''}}</p>
                                    <p>Designation : {{getstaffSummary?getstaffSummary.designation:''}}</p>
                                    <!-- <p>Phone : {{getstaffSummary?getstaffSummary.phoneNumber:''}}</p>
                                    <p>Email : {{getstaffSummary?getstaffSummary.email:''}}</p> -->
                                    <p :title="getstaffSummary?getstaffSummary.email:''"><a href="mailto:{{getstaffSummary?getstaffSummary.email:''}}"><MailOutlined /> {{ getstaffSummary?getstaffSummary.email.length>25?getstaffSummary.email.substring(0,25)+'...':getstaffSummary.email:'' }}</a></p>
                                    <p ><a href="tel:{{getstaffSummary?getstaffSummary.phoneNumber:''}}"><PhoneOutlined :rotate="90" /> {{ getstaffSummary?getstaffSummary.phoneNumber:'' }}</a></p>
                                </div>
                            </div>
                            <div class="pat-profile">
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Gender</div>
                                    <div class="thumb-desc">{{getstaffSummary?getstaffSummary.gender:''}}</div>
                                </div>
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Specialization</div>
                                    <div class="thumb-desc">{{getstaffSummary?getstaffSummary.specialization:''}}</div>
                                </div>
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Network</div>
                                    <div class="thumb-desc">{{getstaffSummary?getstaffSummary.network:''}}</div>
                                </div>
                                 <div class="pat-profile-inner">
                                    <div class="thumb-head">Status</div>
                                    <div class="thumb-desc">{{getstaffSummary?getstaffSummary.isActive==true?'Active':'Inactive':''}}</div>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :sm="17" :xs="24">
                        <div class="summary-tabs">
                            <a-tabs v-model:activeKey="activeKey1">
                                <a-tab-pane key="1" tab="Appointments">
                                    <!-- AppointmentTable Table -->
                                    <AppointmentTable />
                                    <Loader />
                                </a-tab-pane>
                                <a-tab-pane key="2" tab="Patients">
                                    <!-- PatientTable Table -->
                                    <PatientTable />
                                    <Loader />
                                </a-tab-pane>
                                <a-tab-pane key="3" tab="Availability">
                                    <a-row :gutter="24">
                                        <a-col :sm="24" :xs="24">
                                            <div class="common-btn mb-24" v-if="arrayToObjact(screensPermissions,51)">
                                                <a-button class="btn blackBtn" @click="showModalvailability">
                                                    <PlusOutlined />
                                                </a-button>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <!--Availability Table -->
                                            <AvailabilityTable />
                                            <Loader />
                                        </a-col>
                                    </a-row>
                                </a-tab-pane>
                                <a-tab-pane key="4" tab="Contacts">
                                    <a-row :gutter="24">
                                        <a-col :span="24">
                                            <div class="common-btn mb-24" v-if="arrayToObjact(screensPermissions,47)">
                                                <a-button class="btn blackBtn" @click="showModalContact" >
                                                    <PlusOutlined />
                                                </a-button>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <!-- Contacts Table -->
                                            <ContactTable />
                                            <Loader />
                                        </a-col>
                                    </a-row>
                                </a-tab-pane>
                                <a-tab-pane key="5" tab="Roles">
                                    <a-row :gutter="24">
                                        <a-col :sm="24" :xs="24">
                                            <div class="common-btn mb-24" v-if="arrayToObjact(screensPermissions,55)">
                                                <a-button class="btn blackBtn" @click="showModalRole">
                                                    <PlusOutlined />
                                                </a-button>
                                            </div>
                                        </a-col>
                                        <a-col :span="24">
                                            <!-- Roles Table -->
                                            <RoleTable />
                                            <Loader />
                                        </a-col>
                                    </a-row>
                                </a-tab-pane>
                                <a-tab-pane key="6" tab="Documents">
                                    <a-col :sm="24" :xs="24">
                                        <div class="common-btn mb-24">
                                            <a-button class="btn blackBtn" @click="showDocModal" v-if="arrayToObjact(screensPermissions,59)">
                                                <PlusOutlined />
                                            </a-button>
                                        </div>
                                    </a-col>
                                    <a-row :gutter="24">
                                        <a-col :sm="24" :xs="24">
                                            <!-- Documents Table -->
                                            <DocumentTable />
                                            <Loader />
                                        </a-col>
                                    </a-row>
                                </a-tab-pane>
                            </a-tabs>
                        </div>
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <!--modals-->
    <a-modal width="50%" v-model:visible="visibleStaffDoc" title="Add Documents" :maskClosable="false" centered  @cancel="closeModal('visibleStaffDoc')">
        <StaffDocumentForm :clearData="clearData" ref="StaffDocumentForm" entity="staff" :paramId="paramId" @saveModal="staffDocCloseModal($event)"/>
    </a-modal>
    <!---->
    <a-modal width="50%" v-model:visible="visibleRole" title="Add Roles" :maskClosable="false" centered  @cancel="closeModal('visibleRole')">
        <RoleForm  :clearData="clearData" :paramId="paramId" @saveModal="roleCloseModal($event)"/>
    </a-modal>
    <!------>
    <a-modal width="50%" v-model:visible="visibleAvailability" title="Add Availability"  :maskClosable="false" centered  @cancel="closeModal('visibleAvailability')">
        <AvailabilityForm  :clearData="clearData" :paramId="paramId"  @saveModal="AvailabilityCloseModal($event)" />
    </a-modal>
    <!---->
    <a-modal width="60%" v-model:visible="visibleContact" title="Add Contacts" :maskClosable="false" centered  @cancel="closeModal('visibleContact')">
        <ContactForm :clearData="clearData" :paramId="paramId" @saveModal="contactCloseModal($event)"/>
    </a-modal>
    <!---->
</div>
<PersonalInformation v-model:visible="visibleEditStaff" @saveModal="editStaffCloseModal($event)"/>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { ref, computed, watchEffect, onUnmounted } from "vue";
import {
  // DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
// import { warningSwal } from "@/commonMethods/commonMethod";
// import { messages } from "@/config/messages";
import AppointmentTable from ".././care-coordinator/tables/AppointmentTable";
import PatientTable from ".././care-coordinator/tables/PatientTable";
import AvailabilityTable from ".././care-coordinator/tables/AvailabilityTable";
import AvailabilityForm from ".././modals/forms/Availability";
import ContactTable from ".././care-coordinator/tables/ContactTable";
import ContactForm from ".././modals/forms/Contacts";
import RoleTable from ".././care-coordinator/tables/RoleTable";
import RoleForm from ".././modals/forms/Roles";
import DocumentTable from ".././care-coordinator/tables/DocumentTable";
import StaffDocumentForm from ".././modals/forms/StaffDocuments";
import Loader from "../loader/Loader"
import {arrayToObjact} from "@/commonMethods/commonMethod"
import PersonalInformation from ".././modals/forms/StaffPersonalInfo"
import {warningSwal} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
export default {
  components: {
    Header,
    Sidebar,
    // DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    AppointmentTable,
    PatientTable,
    AvailabilityForm,
    AvailabilityTable,
    ContactTable,
    ContactForm,
    DocumentTable,
    StaffDocumentForm,
    RoleTable,
    RoleForm,
    Loader,
    PersonalInformation,
    MailOutlined,
    PhoneOutlined
  },
  setup(props,{emit}) {
    const store = useStore();
    const router = useRoute();
    const clearData = ref(false)

    watchEffect(() => {
        if(router.params.udid&&  router.name == 'CoordinatorSummary'){
      store.dispatch("staffSummary", router.params.udid);
      store.dispatch("availabilityList", router.params.udid);
      store.dispatch("staffContactList", router.params.udid);
      store.dispatch("roleList", router.params.udid);
      store.dispatch("staffDocuments", router.params.udid);
      store.dispatch("staffSummaryAppointment", router.params.udid);
      store.dispatch("staffSummaryPatient", router.params.udid);
        }
    });

    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    const getstaffSummary = computed(() => {
      return store.state.careCoordinatorSummary.staffSummary;
    });

    const visibleStaffDoc = ref(false);
    const visibleRole = ref(false);
    const visibleAvailability = ref(false);
    const visibleContact = ref(false);

    const visibleEditStaff =ref(false)
    const editStaff = () => {
      visibleEditStaff.value = true;
    };

    const editStaffCloseModal = (value) => {
      visibleEditStaff.value = value;
    };

    const staffDocCloseModal = (value) => {
      visibleStaffDoc.value = value;
    };

    
    const roleCloseModal = (value) => {
      visibleRole.value = value;
    };
    
    const AvailabilityCloseModal = (value) => {
      visibleAvailability.value = value;
    };

    
    const contactCloseModal = (value) => {
      visibleContact.value = value;
    };

    const showDocModal = () => {
      visibleStaffDoc.value = true;
      clearData.value=false
      store.commit('clearStaffFormValidation',false)
    };
    const showModalRole = () => {
      visibleRole.value = true;
      clearData.value=false
      store.commit('clearStaffFormValidation',false)
    };
    const showModalvailability = () => {
      visibleAvailability.value = true;
      clearData.value=false
       store.commit('clearStaffFormValidation',false)
    };
    const showModalContact = () => {
      visibleContact.value = true;
      clearData.value=false
      store.commit('clearStaffFormValidation',false)
    };

    const handleOk = (e) => {
      console.log(e);
      visibleStaffDoc.value = false;
    };
    

    const checkFieldsData = computed(()=>{
      return store.state.common.checkChangeInput;
    })


    function closeModal(value) {
      if(checkFieldsData.value){
      warningSwal(messages.modalWarning).then((response) => {
        if (response == true) {
          emit("saveModal", false)
          clearData.value=true
        //   emit("reset")
        //   Object.assign();
          store.dispatch("allStaffList")
          store.commit('checkChangeInput',false)
          store.state.careCoordinator.addStaff =null
         
        } else {
          emit("saveModal", true);
          if(value=='visibleAvailability'){
              visibleAvailability.value=true
              clearData.value=false
          }else if(value=='visibleContact'){
              visibleContact.value = true
          }else if(value=='visibleStaffDoc'){
              visibleStaffDoc.value =true
          }else{
              visibleRole.value=true
          }
        }
      });
      }else{
          store.commit('clearStaffFormValidation',true)
      }    
        
    }
    onUnmounted(()=>{
        store.commit('clearStaffFormValidation',false)
    })
    return {
      clearData,
      roleCloseModal,
      contactCloseModal,
      AvailabilityCloseModal,
      staffDocCloseModal,
      closeModal,
      editStaffCloseModal,
      editStaff,
      visibleEditStaff,
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      paramId: router.params.udid,
      staffs,
      getstaffSummary,
      activeKey: ref("1"),
      activeKey1: ref("1"),
      visibleStaffDoc,
      visibleRole,
      visibleAvailability,
      visibleContact,
      showDocModal,
      showModalRole,
      showModalvailability,
      showModalContact,
      handleOk,
    };
  },
};
</script>
