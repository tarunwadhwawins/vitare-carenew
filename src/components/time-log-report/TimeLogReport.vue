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
                    <a-row>
                        <div class="commonTags">
                            <a-tag v-if="route.query.filter" closable @close="remove('filter')">{{route.query.filter}}</a-tag>
                            <a-tag v-if="route.query.toDate && route.query.fromDate" closable @close="remove('date')">
                                {{timeStampFormate(route.query.fromDate,globalDateFormat) }} To {{timeStampFormate(route.query.toDate,globalDateFormat)}}
                            </a-tag>
                        </div>
                    </a-row>
                    <a-form :model="auditTimeLog" name="auditTimeLog" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="updateAuditTime">
                        <a-row :gutter="24">
                            <a-col :sm="8" :xs="24">
                                <div class="form-group" v-if="arrayToObjact(screensPermissions, 332)">
                                    <label>{{$t('global.startDate')}}</label>
                                    <a-date-picker :format="globalDateFormat" value-format="YYYY-MM-DD" :disabledDate="d => !d || d.isSameOrAfter(dateSelect)" v-model:value="auditTimeLog.startDate" :size="size" style="width: 100%" />
                                </div>
                            </a-col>
                            <a-col :sm="8" :xs="24">
                                <div class="form-group" v-if="arrayToObjact(screensPermissions, 332)">
                                    <label>{{$t('global.endDate')}}</label>
                                    <a-date-picker :format="globalDateFormat" :disabledDate="d => !d || d.isSameOrBefore(auditTimeLog.startDate)" value-format="YYYY-MM-DD" v-model:value="auditTimeLog.endDate" :size="size" style="width: 100%" @change="dateChange" />
                                </div>
                            </a-col>

                            <a-col :sm="2" :xs="24">
                                <div class="text-right mt-28" v-if="arrayToObjact(screensPermissions, 332)">
                                    <a-button class="btn primaryBtn" html-type="submit">{{$t('timeLogReport.view')}}</a-button>
                                </div>
                            </a-col>
                            <a-col :sm="2" :xs="24">
                                <div class="text-right mt-28">
                                    <a-button class="btn primaryBtn" @click="clearData">{{$t('global.clear')}}</a-button>
                                </div>
                            </a-col>
                            <a-col :sm="4" :xs="24">
                                <div class="text-right mb-24">
                                    <ExportToExcel @click="exportExcel('patientTimelog_report',filtterDates)" v-if="arrayToObjact(screensPermissions, 333)" />
                                </div>
                            </a-col>
                        </a-row>
                    </a-form>
                    <a-row>
                        <TimeLogTable @scrolller="scrolller" v-if="arrayToObjact(screensPermissions, 332)" />
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
    exportExcel,
    arrayToObjact,timeStampFormate,globalDateFormat
} from "@/commonMethods/commonMethod";
import {
    ref,

    reactive,
    onUnmounted,
    onMounted,
} from "vue";
import {
    useStore
} from "vuex";
import TimeLogTable from "./TimeLogTable"
import moment from "moment"
import { useRoute, useRouter } from 'vue-router';
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
        const route = useRoute()
        const router = useRouter()

        function dateChange() {
            dateSelect.value = moment(auditTimeLog.endDate).add(1, 'day')
        }

        onMounted(() => {
            if (route.query.filter || route.query.fromDate) {
                let filter = route.query.filter ? route.query.filter : ''
                let date = route.query.fromDate && route.query.toDate ? "?fromDate=" + timeStampFormate(route.query.fromDate,'YYYY-MM-DD') + "&toDate=" + timeStampFormate(route.query.toDate,'YYYY-MM-DD') : "?fromDate=&toDate="
                //store.dispatch('auditTimeLogFilterDates', "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
                store.dispatch("timeLogReportList", date+"&filter=" +filter);
            } else {
                store.commit("dateFilter", '')
                store.dispatch("timeLogReportList")
            }

            store.dispatch('auditTimeLogFilterDates', "?fromDate=&toDate=")
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
        })

        function clearData() {
            auditTimeLog.startDate = ''
            auditTimeLog.endDate = ''
            store.dispatch("timeLogReportList", "?fromDate=&toDate=&page=")
        }

        function scrolller() {
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 100)

        }

        function updateAuditTime() {
            if (auditTimeLog.startDate && auditTimeLog.endDate) {

                //store.getters.timeLogReports.value.timeLogReportList = ""
                store.getters.timeLogReports.value.timeLogeMeta = ''
                startDate.value = auditTimeLog.startDate ? (moment(auditTimeLog.startDate)).format("YYYY-MM-DD") : ''
                endDate.value = auditTimeLog.endDate ? (moment(auditTimeLog.endDate)).format("YYYY-MM-DD") : ''
                store.dispatch('auditTimeLogFilterDates', "?fromDate=" + startDate.value + "&toDate=" + endDate.value)
                store.dispatch("timeLogReportList", "?fromDate=" + startDate.value + "&toDate=" + endDate.value + "&page=")
            }
        }
        onUnmounted(() => {
            store.dispatch('auditTimeLogFilterDates', "?fromDate=&toDate=")
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter", '')
            store.commit("dateFilter", '')
        })

        function remove(event) {
            if (event == "filter") {
                if (route.query.fromDate && route.query.toDate) {

                    store.dispatch("timeLogReportList", "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
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
                    store.dispatch("timeLogReportList")
                }

            } else {

                if (route.query.filter) {
                    router.replace({
                        query: {
                            filter: route.query.filter
                        }
                    })
                    store.dispatch("timeLogReportList", "?filter=" + route.query.filter)
                } else {
                    router.replace({
                        query: {}
                    })
                    store.dispatch("timeLogReportList")
                }
            }

        }
        return {
            arrayToObjact,
            screensPermissions: store.getters.screensPermissions,
            exportExcel,
            linkTo,
            updateAuditTime,
            checked,
            dateSelect,
            auditTimeLog,
            dateChange,
            filtterDates: store.getters.auditTimeLogFilterDates,
            value1: ref(),
            size: ref("large"),
            timeLogReports: store.getters.timeLogReports.value,
            scrolller,
            clearData,
            remove,
            timeStampFormate,
            globalDateFormat,
            route
        };
    },
};
</script>

<style lang="scss">
</style>
