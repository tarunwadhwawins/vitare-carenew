<template>
<div>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />
        </a-layout-header>
        <a-layout>
            <Sidebar />
            <a-layout-content>
                <div class="common-bg">
                    <a-row>
                        <a-col :span="24">
                            <h2 class="pageTittle">{{$t('timeLogReport.auditTimeLog')}}</h2>
                        </a-col>
                    </a-row>
                    <a-form :model="auditTimeLog" name="auditTimeLog" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="updateAuditTime" @finishFailed="auditTimeLogFailed">
                        <a-row :gutter="24">
                            <a-col :sm="8" :xs="24">
                                <div class="form-group">
                                    <label>{{$t('global.startDate')}}</label>
                                    <a-date-picker format="MM/DD/YYYY" value-format="YYYY-MM-DD" :disabledDate="d => !d || d.isAfter(dateSelect)" v-model:value="auditTimeLog.startDate" :size="size" style="width: 100%" />
                                </div>
                            </a-col>
                            <a-col :sm="8" :xs="24">
                                <div class="form-group">
                                    <label>{{$t('global.endDate')}}</label>
                                    <a-date-picker format="MM/DD/YYYY" :disabledDate="d => !d || d.isSameOrBefore(auditTimeLog.startDate)" value-format="YYYY-MM-DD" v-model:value="auditTimeLog.endDate" :size="size" style="width: 100%" @change="dateChange" />
                                </div>
                            </a-col>
                            <a-col :sm="4" :xs="24">
                                <div class="text-right mt-28">
                                    <a-button class="btn primaryBtn" html-type="submit">{{$t('timeLogReport.view')}}</a-button>
                                </div>
                            </a-col>
                            <a-col :sm="4" :xs="24">
                                <div class="text-right mb-24">
                                    <ExportToExcel @click="exportExcel('careCoordinator_report')" />
                                </div>
                            </a-col>
                        </a-row>
                    </a-form>
                    <a-row>
                        <TimeLogTable></TimeLogTable>
                    </a-row>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</div>
</template>

<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import {
    exportExcel
} from "@/commonMethods/commonMethod";
import {
    ref,
    watchEffect,
    reactive,
    onUnmounted,
    onMounted
} from "vue";
// import {
//     startimeAdd,
//     endTimeAdd,
//     timeStamp
// } from '@/commonMethods/commonMethod'

import {
    useStore
} from "vuex";
import TimeLogTable from "./TimeLogTable"
import moment from "moment"

export default {
    components: {
        Header,
        Sidebar,
        TimeLogTable,
        ExportToExcel
    },
    setup() {
        const store = useStore();
        const checked = ref([false]);
        const linkTo = "patients-summary";
        const auditTimeLog = reactive({
            startDate: '',
            endDate: '',
        })
        const dateSelect = ref(null)
        const startDate = ref(null)
        const endDate = ref(null)

        function dateChange() {
            dateSelect.value = moment(auditTimeLog.endDate).add(1, 'day')
        }

        watchEffect(() => {

            store.getters.timeLogReports.value.timeLogReportList = ""
            store.dispatch("timeLogReportList")

        })
        onMounted(() => {
            store.dispatch('auditTimeLogFilterDates', "?fromDate=&toDate=")
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })

        function updateAuditTime() {
            if (auditTimeLog.startDate && auditTimeLog.endDate) {

                store.getters.timeLogReports.value.timeLogReportList = ""
                startDate.value = auditTimeLog.startDate ? (moment(auditTimeLog.startDate)).format("YYYY-MM-DD") : ''
                endDate.value = auditTimeLog.endDate ? (moment(auditTimeLog.endDate)).format("YYYY-MM-DD") : ''
                store.dispatch('auditTimeLogFilterDates', "?fromDate=" + startDate.value + "&toDate=" + endDate.value)
                store.dispatch("timeLogReportList", "?fromDate=" + startDate.value + "&toDate=" + endDate.value)
            }
        }
        onUnmounted(() => {
            store.dispatch('auditTimeLogFilterDates', "?fromDate=&toDate=")
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })

        return {
            exportExcel,
            linkTo,
            updateAuditTime,
            checked,
            dateSelect,
            // reportExport,
            auditTimeLog,
            dateChange,
            filtterDates: store.getters.auditTimeLogFilterDates,
            value1: ref(),
            size: ref("large"),
            timeLogReports: store.getters.timeLogReports.value,
        };
    },
};
</script>

<style lang="scss">
</style>
