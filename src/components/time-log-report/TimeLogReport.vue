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
                            <h2 class="pageTittle">{{$t('timeLogReport.auditTimeLog')}}</h2>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :sm="10" :xs="24">
                            <div class="form-group">
                                <label>{{$t('timeLogReport.filterBy')}}</label>
                                <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                                    <a-select-option value="lucy">Patient</a-select-option>
                                    <a-select-option value="lucy">Staff</a-select-option>
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :sm="10" :xs="24">
                            <div class="form-group">
                                <label>{{$t('global.name')}}</label>
                                <a-input v-model="value" size="large" />
                            </div>
                        </a-col>
                        <a-col :sm="4" :xs="24">
                            <div class="text-right mt-28">
                                <a-button class="btn primaryBtn" @click="showModal">{{$t('timeLogReport.view')}}</a-button>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row>
                        
                        <TimeLogTable v-if="timeLogReports.timeLogReportList" :columns="timeLogReports.timeLogReportColumns" :timeLogRecords="timeLogReports.timeLogReportList" ></TimeLogTable>
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

import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
import TimeLogTable from "./TimeLogTable"
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
    

    watchEffect(() => {
        store.getters.timeLogReports.value.timeLogReportList=""
      store.dispatch("timeLogReportList")
    })


    // const timeLogReports = computed(() => {
    //   return store.state.timeLogReport;
    // });

   


    return {
      
      linkTo,
      checked,
      value1: ref(),
      size: ref("large"),
      timeLogReports:store.getters.timeLogReports,
    };
  },
};
</script>

<style lang="scss">
</style>
