
<template>
<a-row v-if="arrayToObjact(patientsPermissions,62)">
    <a-col :span="24" >
        <ShowModalButton @isVisible="showModal($event)" :headingText="$t('patient.patients')" :buttonText="$t('patient.addNewPatients')" />
    </a-col>
</a-row>
<a-row>
    <a-col :span="24">
        <a-row :gutter="24">
            <a-col :xl="4" :sm="8" :xs="24">
                <CounterCard colorBox="colorBox red" :count="5" :text="$t('patient.critical')" />
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
<a-row >
    <a-col :span="12">
        <SearchField @change="searchData" />
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(patientsPermissions,66)">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24" >

        <DataTable v-if="patients.column" :columns="patients.column" :patientRecords="patients.patientList"  />
     
    </a-col>
</a-row>

<!--modal-->
<PatientsModal v-model:visible="PatientsModal" @saveModal="handleOk($event)" />
<!--end-->
</template>
<script>
import {  ref, watchEffect,computed } from "vue";
import { useStore } from "vuex";
import PatientsModal from "@/components/modals/PatientsModal";
import CounterCard from "./counter-card/CounterCard";
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";

import { arrayToObjact } from "@/commonMethods/commonMethod";
// import { messages } from "../../config/messages";
import DataTable from "./data-table/DataTable"
import SearchField from "@/components/common/input/SearchField";
export default {
  name: "Patients",
  components: {
    PatientsModal,
    // UserOutlined,
    // WarningOutlined,
    CounterCard,
    ShowModalButton,
    DataTable,
    SearchField,
  },

  setup() {
    const store = useStore();
    const searchoptions = ref([]);
    const PatientsModal = ref(false);
    const showModal = (value) => {
      PatientsModal.value = value;
    };
    const handleOk = (status) => {
      PatientsModal.value = status;
    };
    const handleChange = () => {};

    const searchData = (value) => {
        console.log('searchPatients', value)
    };

    watchEffect(() => {
      store.getters.patientsRecord.patientList=""
      store.dispatch("programList");
      store.dispatch("patients");
    });

    const patientsPermissions=computed(()=>{
     return store.state.screenPermissions.patientsPermissions
    })
    return {
      patientsPermissions,
      arrayToObjact,
      PatientsModal,
      showModal,
      handleOk,
      handleChange,
      searchoptions,
      size: ref(),
      value2: ref(),
      patients:store.getters.patientsRecord,
      searchData,     
    };
  },
};
</script>
