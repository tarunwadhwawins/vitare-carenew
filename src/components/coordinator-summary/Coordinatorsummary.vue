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
                            <EditOutlined class="editIcon" style="float:right" @click="editStaff()"/>
                            <div class="patientImg">
                                <img src="../../assets/images/profile-4.jpg" alt="image" />
                                <div class="info">
                                    <p>Name: {{getstaffSummary?getstaffSummary.fullName:''}}</p>
                                    <p>Designation : {{getstaffSummary?getstaffSummary.designation:''}}</p>
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
                                            <div class="common-btn mb-24" v-if="arrayToObjact(staffPermissions,51)">
                                                <a-button class="btn blackBtn" @click="showModal2">
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
                                            <div class="common-btn mb-24" v-if="arrayToObjact(staffPermissions,47)">
                                                <a-button class="btn blackBtn" @click="showModal3" >
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
                                            <div class="common-btn mb-24" v-if="arrayToObjact(staffPermissions,55)">
                                                <a-button class="btn blackBtn" @click="showModal1">
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
                                            <a-button class="btn blackBtn" @click="showModal" v-if="arrayToObjact(staffPermissions,59)">
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
    <a-modal width="50%" v-model:visible="visible" title="Add Documents" :maskClosable="false" centered @ok="handleOk">
        <StaffDocumentForm entity="staff" :paramId="paramId" />
    </a-modal>
    <!---->
    <a-modal width="50%" v-model:visible="visible1" title="Add Roles" :maskClosable="false" centered @ok="handleOk">
        <RoleForm :paramId="paramId" />
    </a-modal>
    <!------>
    <a-modal width="50%" v-model:visible="visible2" title="Add Availability" :maskClosable="false" centered @ok="handleOk">
        <AvailabilityForm :paramId="paramId" />
    </a-modal>
    <!---->
    <a-modal width="60%" v-model:visible="visible3" title="Add Contacts" :maskClosable="false" centered @ok="handleOk">
        <ContactForm :paramId="paramId" />
    </a-modal>
    <!---->
</div>
<PersonalInformation v-model:visible="visibleEditStaff" @saveModal="editStaffCloseModal($event)"/>
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { ref, computed, onMounted } from "vue";
import {
  // DeleteOutlined,
  EditOutlined,
  PlusOutlined,
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
    PersonalInformation
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    console.log("id=>", router.params.udid);

    onMounted(() => {
      store.dispatch("staffSummary", router.params.udid);
      store.dispatch("availabilityList", router.params.udid);
      store.dispatch("staffContactList", router.params.udid);
      store.dispatch("roleList", router.params.udid);
      store.dispatch("staffDocuments", router.params.udid);
      store.dispatch("staffSummaryAppointment", router.params.udid);
      store.dispatch("staffSummaryPatient", router.params.udid);
    });

    const staffs = computed(() => {
      return store.state.careCoordinator;
    });

    const getstaffSummary = computed(() => {
      return store.state.careCoordinatorSummary.staffSummary;
    });

    const visible = ref(false);
    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    const visibleEditStaff =ref(false)
    const editStaff = () => {
      visibleEditStaff.value = true;
    };

    const editStaffCloseModal = (value) => {
      visibleEditStaff.value = value;
    };

    const showModal = () => {
      visible.value = true;
    };
    const showModal1 = () => {
      visible1.value = true;
    };
    const showModal2 = () => {
      visible2.value = true;
    };
    const showModal3 = () => {
      visible3.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const staffPermissions = computed(()=>{
            return store.state.screenPermissions.staffPermissions
        })
    return {
      editStaffCloseModal,
      editStaff,
      visibleEditStaff,
      staffPermissions,
      arrayToObjact,
      paramId: router.params.udid,
      staffs,
      getstaffSummary,
      activeKey: ref("1"),
      activeKey1: ref("1"),
      visible,
      visible1,
      visible2,
      visible3,
      showModal,
      showModal1,
      showModal2,
      showModal3,
      handleOk,
    };
  },
};
</script>
