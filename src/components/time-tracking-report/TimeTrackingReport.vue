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
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.reportName')}}</label>
                                <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                    <a-select-option value="lucy">Choose Report</a-select-option>
                                    <a-select-option value="lucy">Report 1</a-select-option>
                                    <a-select-option value="Yiminghe">Report 2</a-select-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.startDate')}}</label>
                                <a-date-picker v-model:value="value1" :size="size" style="width: 100%" format="MM/DD/YYYY" />
                            </div>
                        </a-col>
                        <a-col :sm="8" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.endDate')}}</label>
                                <a-date-picker v-model:value="value1" :size="size" style="width: 100%" format="MM/DD/YYYY" />
                            </div>
                        </a-col>
                        
                    </a-row> -->
                    <a-row>
                        <a-col :span="12">
                            <SearchField endPoint="patient"  />
                        </a-col>
                        <a-col :span="12">
                            <div class="text-right mb-24">
                                <ExportToExcel @click="exportExcel('','?fromDate=&toDate='+search)" />
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
import { useStore } from "vuex";
export default {
  components: {
    Header,
    Sidebar,
    DataTable,
    ExportToExcel,
    SearchField,
    TableLoader
  },

  setup() {
    const store = useStore()
    const checked = ref([false]);
    onMounted(()=>{
      store.dispatch("reportList")
    })
    return {
      checked,
      value1: ref(),
      size: ref("large"),
    };
  },
};
</script>

<style lang="scss">
</style>
