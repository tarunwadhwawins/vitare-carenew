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
                            <h2 class="pageTittle">{{'Audit Timelog Approval'}}

                                <DateFilter :Buttons="Buttons" @clickButtons="showButton($event)" :custom="true" commit="timelineReport" />
                            </h2>
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
                    <a-row>
                        <a-col :sm="20" :xs="24">
                            <a-form :model="auditTimeLog" name="auditTimeLog" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="updateAuditTime" v-if="customDateShow">
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
                                    
                                </a-row>
                            </a-form>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <SearchField endPoint="timeLog" v-if="arrayToObjact(screensPermissions, 65)" mode="tags" />
                        </a-col>
                        <a-col :span="12">
                            <div class="text-right mb-24">
                                <ExportToExcel @click="exportExcel('patientTimelog_report',filtterDates)" v-if="arrayToObjact(screensPermissions, 333)" disabled/>
                            </div>
                        </a-col>
                    </a-row>

                    <a-row>
                        <TimeLogApprovalTable @scrolller="scrolller" v-if="arrayToObjact(screensPermissions, 332)" />
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
import DateFilter from "@/components/common/DateFilter.vue";
import {
  exportExcel,
  arrayToObjact,
  timeStampFormate,
  globalDateFormat,
} from "@/commonMethods/commonMethod";
import { ref, reactive, onUnmounted, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import TimeLogApprovalTable from "./TimeLogApprovalTable";
import moment from "moment";
import SearchField from "@/components/common/input/SearchField";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Header,
    Sidebar,
    TimeLogApprovalTable,
    ExportToExcel,
    DateFilter,
    SearchField,
  },
  setup() {
    const store = useStore();
    const checked = ref([false]);
    const linkTo = "patients-summary";
    const auditTimeLog = reactive({
      startDate: "",
      endDate: "",
    });
    const dateSelect = ref(null);
    const startDate = ref(null);
    const endDate = ref(null);
    const route = useRoute();
    const router = useRouter();
    const timeLineButton = store.getters.timelineReport;
    const customDateShow = ref(false);

    function dateChange() {
      dateSelect.value = moment(auditTimeLog.endDate).add(1, "day");
    }
    //const timeLineCustomButton = ref([])
    watchEffect(() => {
      //   if(store.getters.timeline.value){
      //         timeLineCustomButton.value = store.getters.timeline.value
      //         let findIndex = timeLineCustomButton.value.findIndex(a => a.id === 126)
      //         if(findIndex==-1){
      //       timeLineCustomButton.value.push({ "id": 126, "globalCodeCategoryId": 46, "globalCodeCategory": "Timeline", "name": "Custom", "description": "Timeline", "isActive": 1, "predefined": 1, "usedCount": 0 })
      //         }
      //     }
    });
    onMounted(() => {
      if (route.query.filter || route.query.fromDate) {
        let filter = route.query.filter ? route.query.filter : "";
        let date =
          route.query.fromDate && route.query.toDate
            ? "?fromDate=" +
              timeStampFormate(route.query.fromDate, "YYYY-MM-DD") +
              "&toDate=" +
              timeStampFormate(route.query.toDate, "YYYY-MM-DD")
            : "?fromDate=&toDate=";
        //store.dispatch('auditTimeLogFilterDates', "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
        store.dispatch("timeLogApprovalList", date + "&filter=" + filter);
      } else {
        store.commit("dateFilter", "");
        if (timeLineButton.value == null) {
          store
            .dispatch("timeLine", {
              id: 123,
              commit: "timelineReport",
            })
            .then(() => {
              apiCall(timeLineButton.value);
            });
        } else {
          apiCall(timeLineButton.value);
        }
      }

      store.dispatch("auditTimeLogFilterDates", "?fromDate=&toDate=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });

    function clearData() {
      auditTimeLog.startDate = "";
      auditTimeLog.endDate = "";
      store.dispatch("timeLogApprovalList", "?fromDate=&toDate=&page=");
    }

    function scrolller() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }

    function updateAuditTime() {
      if (auditTimeLog.startDate && auditTimeLog.endDate) {
        //store.getters.timeLogReports.value.timeLog = ""
        store.getters.timeLogReports.value.timeLogeMeta = "";
        startDate.value = auditTimeLog.startDate
          ? moment(auditTimeLog.startDate).format("YYYY-MM-DD")
          : "";
        endDate.value = auditTimeLog.endDate
          ? moment(auditTimeLog.endDate).format("YYYY-MM-DD")
          : "";
        store.dispatch(
          "auditTimeLogFilterDates",
          "?fromDate=" + startDate.value + "&toDate=" + endDate.value
        );
        store.dispatch(
          "timeLogApprovalList",
          "?fromDate=" + startDate.value + "&toDate=" + endDate.value + "&page="
        );
      }
    }
    onUnmounted(() => {
      store.dispatch("auditTimeLogFilterDates", "?fromDate=&toDate=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
      store.commit("filter", "");
      store.commit("dateFilter", "");
    });

    function remove(event) {
      if (event == "filter") {
        if (route.query.fromDate && route.query.toDate) {
          store.dispatch(
            "timeLogApprovalList",
            "?fromDate=" +
              timeStampFormate(route.query.fromDate, "YYYY-MM-DD") +
              "&toDate=" +
              timeStampFormate(route.query.toDate, "YYYY-MM-DD")
          );
          setTimeout(() => {
            router.replace({
              query: {
                fromDate: route.query.fromDate,
                toDate: route.query.toDate,
              },
            });
          }, 1000);
        } else {
          router.replace({
            query: {},
          });
          store.dispatch("timeLogApprovalList");
        }
      } else {
        if (route.query.filter) {
          router.replace({
            query: {
              filter: route.query.filter,
            },
          });
          store.dispatch("timeLogApprovalList", "?filter=" + route.query.filter);
        } else {
          router.replace({
            query: {},
          });
          store.dispatch("timeLogApprovalList");
        }
      }
    }

    function showButton(id) {
      if (id == 126) {
        customDateShow.value = true;
      } else {
        customDateShow.value = false;
        apiCall(timeLineButton.value);
      }
    }

    function apiCall(data) {
      let from = moment();
      let to = moment();
      if (data.globalCodeId == 122) {
        from = moment();
        to = moment().subtract(data.number, data.intervalType);
      } else if (data.globalCodeId == 123) {
        from = moment();

        to = moment().subtract(data.number, data.intervalType);
      } else if (data.globalCodeId == 124) {
        from = moment();
        to = moment().subtract(data.number, data.intervalType);
      } else {
        from = moment();
        to = moment().subtract(data.number, data.intervalType);
      }

      store.dispatch(
        "auditTimeLogFilterDates",
        "?fromDate=" +
          to.format("YYYY-MM-DD") +
          "&toDate=" +
          from.format("YYYY-MM-DD")
      );
      store.dispatch(
        "timeLogApprovalList",
        "?fromDate=" +
          to.format("YYYY-MM-DD") +
          "&toDate=" +
          from.format("YYYY-MM-DD") +
          "&page="
      );
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
      timeLogReports: store.getters.timeLogReports,
      scrolller,
      clearData,
      remove,
      timeStampFormate,
      globalDateFormat,
      route,
      Buttons: store.getters.timelineReport,
      showButton,
      customDateShow,
    };
  },
};
</script>

<style lang="scss">
</style>
