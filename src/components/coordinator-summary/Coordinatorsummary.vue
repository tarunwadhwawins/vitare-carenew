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
                            <a-tooltip placement="top" class="resetPass">
                                <template #title>
                                    <span>Reset Password</span>
                                </template>
                                <a >
                                    <!-- <KeyOutlined  @click="resetPasseord()" /> -->
                                    <KeyIcon height="16" width="16" alt="Reset Password" @click="resetPasseord()"/>
                                </a>
                            </a-tooltip>
                            <a-tooltip placement="top" class="editIcon">
                                <template #title>
                                    <span>Edit</span>
                                </template>
                                <a>
                                    <EditOutlined   @click="editStaff()" v-if="arrayToObjact(screensPermissions,38)" />
                                </a>
                            </a-tooltip>
                            <div class="patientImg">
                                <!-- <img v-if="getstaffSummary.profilePhoto" :src="getstaffSummary.profilePhoto" alt="image"/> -->
                                <img src="@/assets/images/userAvatar.png" alt="image" />
                                <!-- <img src="../../assets/images/profile-4.jpg" alt="image" /> -->
                                <div class="info" v-if="getstaffSummary">
                                    <p>Name: {{getstaffSummary.fullName}}</p>
                                    <p>Designation : {{getstaffSummary.designation}}</p>
                                    <p class="overflow-wrap" :title="getstaffSummary.email"><a href="mailto:{{getstaffSummary.email}}">
                                            <MailOutlined /> {{ getstaffSummary?getstaffSummary.email.length>15?getstaffSummary.email.substring(0,14)+'...':getstaffSummary.email:'' }}</a></p>
                                    <p>
                                        <a v-if="getstaffSummary.extension" :href="`tel:${getstaffSummary.phoneNumber+getstaffSummary.extension}`">
                                            <PhoneOutlined :rotate="90" /> {{ getstaffSummary.phoneNumber }} {{getstaffSummary?.extension?'('+getstaffSummary.extension+')':''}}
                                        </a>
                                        <a v-else :href="`tel:${getstaffSummary.phoneNumber}`">
                                            <PhoneOutlined :rotate="90" /> {{ getstaffSummary.phoneNumber }}
                                        </a>
                                    </p>
                                </div>
                                
                            </div>
                            <div class="pat-profile" v-if="getstaffSummary">
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Gender</div>
                                    <div class="thumb-desc">{{getstaffSummary.gender}}</div>
                                </div>
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Specialization</div>
                                    <div class="thumb-desc">{{getstaffSummary.specialization}}</div>
                                </div>
                                <div class="pat-profile-inner">
                                    <div class="thumb-head">Network</div>
                                    <div class="thumb-desc">{{getstaffSummary.network}}</div>
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
                                    <!-- <Loader /> -->
                                </a-tab-pane>
                                <a-tab-pane key="2" tab="Patients">
                                    <!-- PatientTable Table -->
                                    <PatientTable />
                                    <Loader />
                                </a-tab-pane>
                                <a-tab-pane key="3" tab="Availability">
                                    <a-row :gutter="24">
                                        <a-col :sm="24" :xs="24">
                                            <div class="common-btn mb-24">
                                                <a-button class="btn blackBtn" @click="showModalvailability" v-if="arrayToObjact(screensPermissions,51)">
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
                                <a-tab-pane key="4" tab="Emergency Contacts">
                                    <a-row :gutter="24">
                                        <a-col :span="24">
                                            <div class="common-btn mb-24" v-if="arrayToObjact(screensPermissions,47)">
                                                <a-button class="btn blackBtn" @click="showModalContact">
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
                                <a-tab-pane key="5" tab="Roles" v-if="role.user.staff.id!=paramId">
                                    <a-row :gutter="24">
                                        <a-col :sm="24" :xs="24">
                                            <div class="common-btn mb-24">
                                                <a-button class="btn blackBtn" @click="showModalRole" v-if="arrayToObjact(screensPermissions,55)">
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
    <a-modal width="50%" v-model:visible="visibleStaffDoc" title="Add Documents" :maskClosable="false" centered @cancel="staffDocCloseModal()" :footer="false">
        <StaffDocumentForm :clearData="clearData" ref="StaffDocumentForm" entity="staff" :paramId="paramId" @saveModal="staffDocCloseModal()" />
    </a-modal>
    <!---->
    <a-modal width="50%" v-model:visible="visibleRole" title="Add Roles" :maskClosable="false" centered @cancel="roleCloseModal('visibleRole')" :footer="false">
        <RoleForm :clearData="clearData" :paramId="paramId" @saveModal="roleCloseModal()" />
    </a-modal>
    <!------>
    <a-modal width="50%" v-model:visible="visibleAvailability" title="Add Availability" :maskClosable="false" centered @cancel="availabilityCloseModal()" :footer="false">
        <AvailabilityForm :clearData="clearData" :paramId="paramId" @saveModal="availabilityCloseModal()" />
    </a-modal>
    <!---->
    <a-modal width="60%" v-model:visible="visibleContact" title="Add Emergency Contact" :maskClosable="false" centered @cancel="contactCloseModal('visibleContact')" :footer="false">
        <ContactForm :clearData="clearData" :paramId="paramId" @saveModal="contactCloseModal()" />
    </a-modal>
    <!---->
</div>
 <ResetPassword v-model:visible="resetPasswordVisible" @saveModal="saveModal($event)" endPoint="staff" :id="paramId"/>
<PersonalInformation v-if="visibleEditStaff" v-model:visible="visibleEditStaff" @saveModal="editStaffCloseModal($event)" />
<TableLoader />
</template>

<script>
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import {
    ref,
    computed,
    watchEffect,
    onUnmounted,defineAsyncComponent, defineComponent, onMounted
} from "vue";
import {
    // DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    MailOutlined,
    PhoneOutlined,
    // KeyOutlined
} from "@ant-design/icons-vue";
import {
    useStore
} from "vuex";
import {
    useRoute
} from "vue-router";

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
import TableLoader from "../loader/TableLoader"
import {
    arrayToObjact
} from "@/commonMethods/commonMethod"
import PersonalInformation from ".././modals/forms/StaffPersonalInfo"
import {
    warningSwal
} from "@/commonMethods/commonMethod";
import {
    messages
} from "@/config/messages";
import KeyIcon from "@/components/common/KeyIcon";
// import ResetPassword from "@/components/reset-password/modal/ResetPassword";
export default defineComponent({
    components: {
        ResetPassword:defineAsyncComponent(()=>import("@/components/reset-password/modal/ResetPassword")),
        // KeyOutlined,
        KeyIcon,
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
        PhoneOutlined,
        TableLoader
    },
    setup(props, {
        emit
    }) {
        const store = useStore();
        const router = useRoute();
        const clearData = ref(false)
        const resetPasswordVisible = ref(false)
        const role = JSON.parse(localStorage.getItem("auth"))
 onMounted(()=>{
      store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
 })
        watchEffect(() => {
            if (router.params.udid && router.name == 'CoordinatorSummary') {
                store.dispatch("staffSummary", router.params.udid);
                store.dispatch("availabilityList", router.params.udid);
                store.dispatch("staffContactList", router.params.udid);
                store.dispatch("roleList", router.params.udid);
                store.dispatch("staffDocuments", router.params.udid);
                store.dispatch("staffSummaryAppointment", router.params.udid);
                store.dispatch("staffSummaryPatient", {id:router.params.udid,data:"?page="});
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

        const visibleEditStaff = ref(false)
        const editStaff = () => {
            store.commit('errorMsg', null)
            visibleEditStaff.value = true;
        };

        const editStaffCloseModal = (value) => {
            visibleEditStaff.value = value;
        };

        const staffDocCloseModal = () => {
            store.commit('errorMsg', null)
            visibleStaffDoc.value = true
            if(checkChangedInput.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        visibleStaffDoc.value = false
                        store.commit('checkChangeInput', false)
                        clearData.value = true
                    }
                    else {
                        visibleStaffDoc.value = true
                    }
                });
            }
            else {
                visibleStaffDoc.value = false;
            }
        };

        const roleCloseModal = () => {
            visibleRole.value = true
            if(checkChangedInput.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        visibleRole.value = false
                        store.commit('checkChangeInput', false)
                        clearData.value = true
                    }
                    else {
                        visibleRole.value = true
                    }
                });
            }
            else {
                visibleRole.value = false;
            }
        };

        const checkChangedInput = computed(() => {
        return store.state.common.checkChangeInput
        })

        const availabilityCloseModal = () => {
            visibleAvailability.value = true
            if(checkChangedInput.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        visibleAvailability.value = false
                        store.commit('checkChangeInput', false)
                        clearData.value = true
                    }
                    else {
                        visibleAvailability.value = true
                    }
                });
            }
            else {
                visibleAvailability.value = false;
            }
        };

        const contactCloseModal = () => {
            visibleContact.value = true
            if(checkChangedInput.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        visibleContact.value = false
                        store.commit('checkChangeInput', false)
                        clearData.value = true
                    }
                    else {
                        visibleContact.value = true
                    }
                });
            }
            else {
                visibleContact.value = false;
            }
            store.commit('errorMsg', null)
        };

        const showDocModal = () => {
            store.commit('errorMsg', null)
            store.state.careCoordinator.documentStaffDetails = null
            visibleStaffDoc.value = true;
            clearData.value = false
            store.commit('clearStaffFormValidation', false)
        };

        const showModalRole = () => {
            store.commit('errorMsg', null)
            visibleRole.value = true;
            clearData.value = false
            store.commit('clearStaffFormValidation', false)
        };
        const showModalvailability = () => {
            store.commit('errorMsg', null)
            visibleAvailability.value = true;
            clearData.value = false
            store.commit('clearStaffFormValidation', false)
        };
        const showModalContact = () => {
            store.commit('errorMsg', null)
            visibleContact.value = true;
            clearData.value = false
            store.commit('clearStaffFormValidation', false)
        };

        const handleOk = (e) => {
            console.log(e);
            visibleStaffDoc.value = false;
        };

        const checkFieldsData = computed(() => {
            return store.state.common.checkChangeInput;
        })

        function closeModal(value) {
            if (checkFieldsData.value) {
                warningSwal(messages.modalWarning).then((response) => {
                    if (response == true) {
                        emit("saveModal", false)
                        clearData.value = true
                        //   emit("reset")
                        //   Object.assign();
                        store.dispatch("allStaffList")
                        store.commit('checkChangeInput', false)
                        store.commit('clearStaffFormValidation', true)
                        store.state.careCoordinator.addStaff = null

                    } else {
                        emit("saveModal", true);
                        if (value == 'visibleAvailability') {
                            visibleAvailability.value = true
                            clearData.value = false
                        } else if (value == 'visibleContact') {
                            visibleContact.value = true
                        } else if (value == 'visibleStaffDoc') {
                            visibleStaffDoc.value = true
                        } else {
                            visibleRole.value = true
                        }
                    }
                });
            } else {
                store.commit('clearStaffFormValidation', true)
            }

        }
        onUnmounted(() => {
            store.commit('clearStaffFormValidation', false)
             store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })

        const resetPasseord = () => {
      resetPasswordVisible.value = true;
    };

    const saveModal = (value) =>{
      resetPasswordVisible.value = value
    }
        return {
            resetPasseord,
            resetPasswordVisible,
            saveModal,
            clearData,
            roleCloseModal,
            contactCloseModal,
            availabilityCloseModal,
            staffDocCloseModal,
            closeModal,
            editStaffCloseModal,
            editStaff,
            visibleEditStaff,
            screensPermissions: store.getters.screensPermissions,
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
            role
        };
    },
});
</script>


<style lang="scss">
.resetPass {
    position: absolute;
    right: 40px;
    top: 13px;
    z-index: 1;
}
.editIcon {
    position: absolute;
    right: 10px;
    top: 13px;
    z-index: 1;
    span {
        svg {
            font-size: 22px;
        }
    }
}
</style>
