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
                            <h2 class="pageTittle">{{$t('global.reports')}}</h2>
                        </a-col>
                    </a-row>

                    <a-row :gutter="24">
                        <a-col :xl="24" :xs="24" style="padding:20px;">
                            <div class="pageTittle">
                                <DateFilter :Buttons="Buttons" @clickButtons="showButton($event);checkChangeInput()" :custom="true" commit="timelineReport" />
                            </div>
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
                    <!-- <a-row >
                        <a-col :span="12" style="padding-bottom:15px">
                            <SearchField endPoint="cptCodes" />
                        </a-col>
                        
                        <a-col :span="12">
                            <div class="text-right mb-24" >
                                <ExportToExcel @click="exportExcel('','?fromDate=&toDate='+search)" disabled />
                            </div>
                        </a-col>
                    </a-row> -->

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
import { onMounted, ref, onUnmounted } from "vue";
import moment from "moment";
import TableLoader from "@/components/loader/TableLoader";
import { timeStampFormate } from "@/commonMethods/commonMethod";
import DataTable from "./data-table/DataTable";
// import SearchField from "@/components/common/input/SearchField";
// import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
// import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
import DateFilter from "@/components/common/DateFilter.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
    DataTable,
    // ExportToExcel,
    // SearchField,
    TableLoader,
    // PatientDropDown,
    DateFilter,
  },

  setup() {
    const store = useStore();
    const patient = ref([]);
    const route = useRoute();
    const router = useRouter();

    const timeLineButton = store.getters.timelineReport;
    const customDateShow = ref(false);

    onMounted(() => {
      //   store.dispatch("cptCodes")
      if (route.query.filter || route.query.fromDate) {
        let filter = route.query.filter ? route.query.filter : "";
        let date =
          route.query.fromDate && route.query.toDate
            ? "?fromDate=" +
              timeStampFormate(route.query.fromDate, "YYYY-MM-DD") +
              "&toDate=" +
              timeStampFormate(route.query.toDate, "YYYY-MM-DD")
            : "?fromDate=&toDate=";
        //store.dispatch('cptCodeFilterDates', "?fromDate=" + route.query.fromDate + "&toDate=" + route.query.toDate)
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

    return {
      customDateShow,
      route,
      remove,
      showButton,
      patient,
      Buttons: store.getters.dashboardTimeLineButton,
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
