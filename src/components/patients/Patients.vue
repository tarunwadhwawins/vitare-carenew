
<template>
<a-row v-if="arrayToObjact(screensPermissions,62)" >
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
    <a-col :span="12" v-if="arrayToObjact(screensPermissions, 65)">
      <SearchField  endPoint="patient"/>
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(screensPermissions,66)">
        <div class="text-right mb-24">
          <ExportToExcel @click="exportExcel('patient_report')" />
        </div>
    </a-col>
    <a-col :span="24" v-if="arrayToObjact(screensPermissions, 65)">
        <DataTable />
     <Loader />
    </a-col>
</a-row>

<!--modal-->
<PatientsModal v-model:visible="PatientsModal" @saveModal="handleOk($event)" />
<!--end-->
</template>
<script>
import {  ref, watchEffect,computed ,onUnmounted} from "vue";
import { useStore } from "vuex";
import PatientsModal from "@/components/modals/PatientsModal";
import CounterCard from "./counter-card/CounterCard";
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";
import Loader from "@/components/loader/Loader"
import { arrayToObjact,exportExcel } from "@/commonMethods/commonMethod";
import DataTable from "./data-table/DataTable"
import SearchField from "@/components/common/input/SearchField";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
export default {
  name: "Patients",
  components: {
    PatientsModal,
    CounterCard,
    ShowModalButton,
    DataTable,
    Loader,
    SearchField,
    ExportToExcel
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

    watchEffect(() => {
      store.getters.patientsRecord.patientList=""
      store.dispatch("programList");
      store.dispatch("patients");
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
    });

  

    const totalPatients = computed(() => {
        return store.state.counterCards.totalPatientcount
      })
      onUnmounted(()=>{
            store.dispatch("searchTable",'')
        })
    return {
      exportExcel,
      totalPatients,
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      PatientsModal,
      showModal,
      handleOk,
      handleChange,
      searchoptions,
      size: ref(),
      value2: ref(),
      //patients:store.getters.patientsRecord,
     
    };
  },
};
</script>
