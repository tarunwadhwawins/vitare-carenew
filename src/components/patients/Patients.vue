<template>
<a-row>
    <a-col :span="24">
        <ShowModalButton @isVisible="showModal($event)" :headingText="$t('patient.patients')" :buttonText="$t('patient.addNewPatients')" v-if="arrayToObjact(screensPermissions,62)" />
    </a-col>
</a-row>
<a-row>
    <a-col :span="24" v-if="arrayToObjact(screensPermissions,65)">
        <a-row :gutter="24">
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox red" :count="5" :text="$t('patient.critical')" @click="filter('Critical')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox orangeBg" :count="10" :text="$t('patient.trending')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox greenBg" :count="15" :text="$t('patient.WNL')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox yellowBg" :count="8" :text="$t('patient.watchList')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox blue" :count="6" :text="$t('patient.messages')" />
            </a-col>
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox whiteBg" :count="12" :text="$t('patient.escalations')" />
            </a-col>
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
import {  ref,  onMounted,  computed,  onUnmounted} from "vue";
import { useStore} from "vuex";
import PatientsModal from "@/components/modals/PatientsModal";
import CounterCard from "./counter-card/CounterCard";
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";
import TableLoader from "@/components/loader/TableLoader"
import {arrayToObjact,exportExcel,timeStampFormate,globalDateFormat} from "@/commonMethods/commonMethod";
import DataTable from "./data-table/DataTable"
import SearchField from "@/components/common/input/SearchField";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import { useRoute, useRouter } from 'vue-router';
export default {
    name: "Patients",
    components: {
        PatientsModal,
        CounterCard,
        ShowModalButton,
        DataTable,
        TableLoader,
        SearchField,
        ExportToExcel
    },

    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter()
        const searchoptions = ref([]);
        const PatientsModal = ref(false);
        const showModal = (value) => {
            store.state.patients.addDemographic = null
            store.state.patients.patientDetails = null
            store.state.patients.emergencyContact = null
            store.state.patients.patientReferralSource = null
              store.state.patients.emergencyContact = null
            PatientsModal.value = value;
        };
        const handleOk = (status) => {
            PatientsModal.value = status;
        };
        const handleChange = () => {};

        onMounted(() => {
            store.getters.patientsRecord.patientList = ""
            store.dispatch("programList");
            if (route.query.filter || route.query.fromDate) {
                let filter = route.query.filter ? route.query.filter : ''
                let date = route.query.fromDate && route.query.toDate ? "&fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate : "&fromDate=&toDate="
                store.dispatch("patients", "?filter=" + filter + date)
            } else {
                store.dispatch("patients");
            }

            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        });

        const totalPatients = computed(() => {
            return store.state.counterCards.totalPatientcount
        })
        onUnmounted(() => {
            store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter", '')
            store.commit("dateFilter", '')
        })

        function filter(event) {
            store.dispatch("patients", "?filter=" + event)
        }

        function remove(event) {
            if (event == "filter") {
                if (route.query.fromDate && route.query.toDate) {

                    store.dispatch("patients", "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
                    setTimeout(() => {
                        router.replace({
                            query: {

                                fromDate: route.query.fromDate,
                                toDate: route.query.toDate,

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
        return {
            exportExcel,
            totalPatients,
            screensPermissions: store.getters.screensPermissions,
            arrayToObjact,
            PatientsModal,
            showModal,
            handleOk,
            handleChange,
            searchoptions,
            search: store.getters.searchTable,
            filter,
            route,
            remove,
            timeStampFormate,
            globalDateFormat

        };
    },
};
</script>
