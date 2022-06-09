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
              
                    <!-- <a-row :gutter="24">
                        <a-col :xl="24" :xs="24" style="padding:20px;">
                            <div class="pageTittle">
                                <DateFilter :Buttons="Buttons" @clickButtons="showButton($event);checkChangeInput()" :custom="true" commit="timelineSuccess" />
                            </div>
                        </a-col>
                      </a-row> -->
                    <a-row >
                        <a-col :span="12" style="padding-bottom:15px">
                            <SearchField endPoint="cptCodes" />
                             <!-- <PatientDropDown mode="multiple" placeholder="Enter patient name"  v-model:value="patient" @handlePatientChange="handlePatientChange($event)" :close="closeValue" /> -->
                        </a-col>
                        
                        <a-col :span="12">
                            <div class="text-right mb-24" >
                                <ExportToExcel @click="exportExcel('','?fromDate=&toDate='+search)" disabled />
                            </div>
                        </a-col>
                        <a-col :span="24">
                            <DataTable  />
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
import { onMounted, ref } from "vue";
import TableLoader from "@/components/loader/TableLoader";
// import {arrayToObjact,exportExcel,timeStampFormate,globalDateFormat,dayWeekMonthdate} from "@/commonMethods/commonMethod";
import DataTable from "./data-table/DataTable";
import SearchField from "@/components/common/input/SearchField";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
// import PatientDropDown from "@/components/modals/search/PatientDropdownSearch.vue";
// import DateFilter from "@/components/common/DateFilter.vue";
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
    DataTable,
    ExportToExcel,
    SearchField,
    TableLoader,
    // PatientDropDown,
    // DateFilter
  },

  setup() {
    const store = useStore()
    const patient = ref([])
    onMounted(()=>{
      store.dispatch("cptCodes")
    })
    const handlePatientChange = (val) => {
        patient.value = val;
    };
    return {
      handlePatientChange,
      patient,
      Buttons: store.getters.dashboardTimeLineButton,
      size: ref("large"),
    };
  },
};
</script>

<style lang="scss">
</style>
