<template>
<a-row>
    <a-col :span="24">
        <!-- <ShowModalButton @isVisible="showModal($event)" :headingText="$t('patient.patients')" :buttonText="$t('patient.addNewPatients')" v-if="arrayToObjact(screensPermissions,62)" :isEdit="false" />-->
        <h2 class="pageTittle titleWrapper">
            {{$t('patient.patients')}}
         <div class="commonBtn"> 
            <a-button class="btn primaryBtn" @click="showModal" :isEdit="isEdit" v-if="arrayToObjact(screensPermissions,62)">{{$t('patient.addNewPatients')}}</a-button>
            <!-- <DateFilter :Buttons="Buttons" @clickButtons="showButton($event)" :custom="false" commit="timelineSuccess" /> -->
        </div>
        </h2>
    </a-col>
</a-row>
<a-row>
    <a-col :span="24">
        <h2 class="pageTittle">
            
        </h2>
    </a-col>
</a-row>
<a-row>
    <a-col :span="24">
        <a-row class="patientBox" :gutter="24" v-if="arrayToObjact(screensPermissions, 65) && grid">
            <PatientCounterCards :isPatient="true" />
        </a-row>
    </a-col>
</a-row>
<a-row>
    <div class="commonTags">
        <a-tag v-if="route.query.filter" closable @close="remove('filter')">{{$t(('dashboard')+'.'+route.query.filter)}}</a-tag>
        <a-tag v-if="route.query.toDate && route.query.fromDate" closable @close="remove('date')">
            {{timeStampFormate(route.query.fromDate,globalDateFormat) }} To {{timeStampFormate(route.query.toDate,globalDateFormat)}}
        </a-tag>
    </div>
</a-row>
<a-row>

    <a-col :span="12">
        <SearchField endPoint="patient" v-if="arrayToObjact(screensPermissions, 65)" />
    </a-col>
    <a-col :span="12">
        <div class="text-right mb-24">
            <ExportToExcel @click="exportExcel('patient_report','?fromDate=&toDate='+search)" v-if="arrayToObjact(screensPermissions,66)" />
        </div>
    </a-col>
    <a-col :span="24">
        <DataTable v-if="arrayToObjact(screensPermissions, 65)" />
        <TableLoader />
    </a-col>
</a-row>

<!--modal-->
<PatientsModal v-model:visible="PatientsModal" @saveModal="handleOk($event)" />
<!--end-->
</template>

<script>
import {  ref,  onUnmounted, watchEffect } from "vue";
import { useStore} from "vuex";
import PatientsModal from "@/components/modals/PatientsModal";
import PatientCounterCards from "@/components/common/cards/PatientCounterCards"
//import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";
import TableLoader from "@/components/loader/TableLoader"
import {arrayToObjact,exportExcel,timeStampFormate,globalDateFormat,dayWeekMonthdate} from "@/commonMethods/commonMethod";
import DataTable from "./data-table/DataTable"
import SearchField from "@/components/common/input/SearchField";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import { useRoute, useRouter } from 'vue-router';
 //import DateFilter from "@/components/common/DateFilter.vue"
export default {
    name: "Patients",
    components: {
        PatientsModal,
        PatientCounterCards,
        //ShowModalButton,
        DataTable,
        TableLoader,
        SearchField,
        ExportToExcel,
       // DateFilter
    },

    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter()
        const searchoptions = ref([]);
        const PatientsModal = ref(false);
        const timeLineButton = store.getters.dashboardTimeLineButton
        const showModal = (value) => {
            store.state.patients.addDemographic = null
            store.state.patients.patientDetails = null
            store.state.patients.emergencyContact = null
            store.state.patients.patientReferralSource = null
            store.state.patients.responsiblePerson = null
            PatientsModal.value = value;
        };
        const handleOk = (status) => {
            PatientsModal.value = status;
        };
        const handleChange = () => {};

        let dateFormat = {
            fromDate: '',
            toDate: ''
        }

        watchEffect(() => {
            store.dispatch("patientFlags", dateFormat)
            store.getters.patientsRecord.patientList = ""

            store.dispatch("programList");
            //if (route.query.timelineId) {
                // store.dispatch("timeLine", {
                //     id: route.query.timelineId,
                //     commit: 'timelineSuccess'
                // }).then(() => {
                //     apiCall(timeLineButton.value)
                // })
            ///} else {
                if (timeLineButton.value == null) {

                    store.dispatch("timeLine", {
                        id: 122,
                        commit: 'timelineSuccess'
                    }).then(() => {
                        apiCall(timeLineButton.value)
                    })

                } else {
                    apiCall(timeLineButton.value)
                }
           // }

            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        });

        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter", '')
            store.commit("dateFilter", '')
            store.state.patients.patientMeta = ''

        })

        function showButton() {

            apiCall(timeLineButton.value)

        }
        // function filterPatients() {
        //     if (route.query.filter || route.query.fromDate) {
        //         let filter = route.query.filter ? route.query.filter : ''
        //         let date = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
        //         store.dispatch("patients", "?filter=" + filter + date)
        //     } else {
        //         store.dispatch("patients");
        //     }
        // }

        function remove(event) {
            if (event == "filter") {
                if (route.query.fromDate && route.query.toDate) {

                    store.dispatch("patients", "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
                    setTimeout(() => {
                        router.replace({
                            query: {

                                fromDate: route.query.fromDate,
                                toDate: route.query.toDate,
                                timelineId:route.query.timelineId

                            }
                        })
                    }, 1000)
                } else {
                    router.replace({
                        query: {}
                    })
                    store.dispatch("patients")
                }

            } else {

                if (route.query.filter) {
                    router.replace({
                        query: {
                            filter: route.query.filter
                        }
                    })
                    store.dispatch("patients", "?filter=" + route.query.filter)
                } else {
                    router.replace({
                        query: {}
                    })
                    store.dispatch("patients")
                }
            }

        }

        function apiCall(data) {
            let dateFormate = dayWeekMonthdate(data)
            store.dispatch("patientFlags", dateFormate)
            //store.dispatch("counterCard", dateFormate)

            store.commit("dateFilter", dateFormate)
            let filter = route.query.filter ? route.query.filter : ''
            let date = route.query.fromDate && route.query.toDate ? "&fromDate=" + dateFormate.fromDate + "&toDate=" + dateFormate.toDate : "&fromDate=&toDate="
            store.dispatch("patients", "?filter=" + filter + date)

        }
        return {
            exportExcel,
            screensPermissions: store.getters.screensPermissions,
            grid: store.getters.grids,
            arrayToObjact,
            PatientsModal,
            showModal,
            handleOk,
            handleChange,
            searchoptions,
            search: store.getters.searchTable,
            route,
            remove,
            timeStampFormate,
            globalDateFormat,
            Buttons: store.getters.dashboardTimeLineButton,
            showButton

        };
    },
};
</script>
