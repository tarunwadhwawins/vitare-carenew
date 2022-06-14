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
                <div class="common-bg">
                    <a-row>
                        <a-col :span="24">
                            <h2 class="pageTittle">{{$t('global.reports')}}
                                <DateFilter :Buttons="Buttons" @clickButtons="showButton($event);" :custom="true" commit="timelineReport" />
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
                        <a-col :sm="24" :xs="24">
                            <a-form :model="customFilter" name="auditTimeLog" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" layout="vertical" @finish="updateFilter" v-if="customDateShow">
                                <a-row :gutter="24">
                                    <a-col :sm="10" :xs="24">
                                        <div class="form-group">
                                            <label>{{$t('global.startDate')}}</label>
                                            <a-date-picker :format="globalDateFormat" value-format="YYYY-MM-DD" :disabledDate="d => !d || d.isSameOrAfter(dateSelect)" v-model:value="customFilter.startDate" :size="size" style="width: 100%" />
                                        </div>
                                    </a-col>
                                    <a-col :sm="10" :xs="24">
                                        <div class="form-group">
                                            <label>{{$t('global.endDate')}}</label>
                                            <a-date-picker :format="globalDateFormat" :disabledDate="d => !d || d.isSameOrBefore(customFilter.startDate)" value-format="YYYY-MM-DD" v-model:value="customFilter.endDate" :size="size" style="width: 100%" @change="dateChange" />
                                        </div>
                                    </a-col>

                                    <a-col :sm="2" :xs="24">
                                        <div class="text-right mt-28">
                                            <a-button class="btn primaryBtn" html-type="submit">{{$t('timeLogReport.view')}}</a-button>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-form>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="24">
                            <DataTable />
                            <TableLoader />
                        </a-col>
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
import { onMounted, ref, onUnmounted, reactive } from "vue";
import moment from "moment";
import TableLoader from "@/components/loader/TableLoader";
import { timeStampFormate } from "@/commonMethods/commonMethod";
import DataTable from "./data-table/DataTable";
import DateFilter from "@/components/common/DateFilter.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
    DataTable,
    TableLoader,
    DateFilter,
  },

  setup() {
    const store = useStore();
    const patient = ref([]);
    const route = useRoute();
    const router = useRouter();
    const startDate = ref(null);
    const endDate = ref(null);

    const customFilter = reactive({
      startDate: "",
      endDate: "",
    });

    const timeLineButton = store.getters.timelineReport;
    const customDateShow = ref(false);

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
        store.dispatch("cptCodes", date + "&filter=" + filter);
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

      store.dispatch("cptCodeFilterDates", "?fromDate=&toDate=");
      store.dispatch("orderTable", {
        data: "&orderField=&orderBy=",
      });
    });

    onUnmounted(() => {
      store.dispatch("cptCodeFilterDates", "?fromDate=&toDate=");
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
            "cptCodes",
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
          store.dispatch("cptCodes");
        }
      } else {
        if (route.query.filter) {
          router.replace({
            query: {
              filter: route.query.filter,
            },
          });
          store.dispatch("cptCodes", "?filter=" + route.query.filter);
        } else {
          router.replace({
            query: {},
          });
          store.dispatch("cptCodes");
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
        "cptCodeFilterDates",
        "?fromDate=" +
          to.format("YYYY-MM-DD") +
          "&toDate=" +
          from.format("YYYY-MM-DD")
      );
      store.dispatch(
        "cptCodes",
        "?fromDate=" +
          to.format("YYYY-MM-DD") +
          "&toDate=" +
          from.format("YYYY-MM-DD") +
          "&page="
      );
    }

    function updateFilter() {
      if (customFilter.startDate && customFilter.endDate) {
        //store.getters.timeLogReports.value.timeLog = ""
        // store.getters.timeLogReports.value.timeLogeMeta = ''
        startDate.value = customFilter.startDate
          ? moment(customFilter.startDate).format("YYYY-MM-DD")
          : "";
        endDate.value = customFilter.endDate
          ? moment(customFilter.endDate).format("YYYY-MM-DD")
          : "";
        store.dispatch(
          "cptCodeFilterDates",
          "?fromDate=" + startDate.value + "&toDate=" + endDate.value
        );
        store.dispatch(
          "cptCodes",
          "?fromDate=" + startDate.value + "&toDate=" + endDate.value + "&page="
        );
      }
    }

    return {
      startDate,
      endDate,
      updateFilter,
      customFilter,
      customDateShow,
      route,
      remove,
      showButton,
      patient,
      Buttons: store.getters.timelineReport,
      size: ref("large"),
    };
  },
};
</script>

<style lang="scss">
.button-left {
  padding-left: 15px;
}
</style>
