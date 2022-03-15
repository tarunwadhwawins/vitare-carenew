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
                                    <a-date-picker format="MM/DD/YYYY" value-format="YYYY-MM-DD" v-model:value="auditTimeLog.startDate" :size="size" style="width: 100%" />
                                </div>
                            </a-col>
                            <a-col :sm="8" :xs="24">
                                <div class="form-group">
                                    <label>{{$t('global.endDate')}}</label>
                                    <a-date-picker format="MM/DD/YYYY" value-format="YYYY-MM-DD" v-model:value="auditTimeLog.endDate" :size="size" style="width: 100%" />
                                </div>
                            </a-col>
                            <a-col :sm="4" :xs="24">
                                <div class="text-right mt-28">
                                    <a-button class="btn primaryBtn" html-type="submit">{{$t('timeLogReport.view')}}</a-button>
                                </div>
                            </a-col>
                            <a-col :sm="4" :xs="24">
                                <div class="text-right mt-28">
                                    <a-button class="btn primaryBtn" @click="reportExport()">{{$t('global.exportToExcel')}}</a-button>
                                </div>
                            </a-col>
                        </a-row>
                    </a-form>
                    <a-row>
                        <TimeLogTable  ></TimeLogTable>
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
import {
    ref,
    watchEffect,
    reactive,
} from "vue";
import {
    startimeAdd,
    endTimeAdd,
    timeStamp
} from '@/commonMethods/commonMethod'

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
    },
    setup() {
        const store = useStore();
        const checked = ref([false]);
        const linkTo = "patients-summary";
        const auditTimeLog = reactive({
            startDate: '',
            endDate: '',
        })
        const startDate =ref(null)
        const endDate = ref(null)
        watchEffect(() => {
            store.getters.timeLogReports.value.timeLogReportList = ""
            store.dispatch("timeLogReportList")
        })

        function updateAuditTime() {
            store.getters.timeLogReports.value.timeLogReportList = ""
            startDate.value =timeStamp(startimeAdd(moment(auditTimeLog.startDate)))
            endDate.value = timeStamp(endTimeAdd(moment(auditTimeLog.endDate)))
            store.dispatch("timeLogReportList", "?fromDate=" + timeStamp(startimeAdd(moment(auditTimeLog.startDate))) + "&toDate=" + timeStamp(endTimeAdd(moment(auditTimeLog.endDate))))
        }

        function reportExport() {
            store.dispatch("reportExport", {
                reportType: "patient_time_log_report"
            }).then(() => {
               
                const API_URL = process.env.VUE_APP_API_URL
               
              if(startDate.value && endDate.value){
                
                window.open(API_URL + 'timelog/report/export/' + store.state.timeLogReport.reportExport.data.udid + '?fromDate=' + timeStamp(startimeAdd(moment(startDate.value))) + '&toDate=' +  timeStamp(endTimeAdd(moment(endDate.value))), '_blank') 
            }else{
                window.open(API_URL + 'timelog/report/export/' + store.state.timeLogReport.reportExport.data.udid + '?fromDate=&toDate=', '_blank')
              }
               
            })
        }
        return {
            linkTo,
            updateAuditTime,
            checked,
            reportExport,
            auditTimeLog,
            value1: ref(),
            size: ref("large"),
            timeLogReports: store.getters.timeLogReports.value,
        };
    },
};
</script>

<style lang="scss">
</style>
