
<template>
<a-row v-if="arrayToObjact(patients.patientsPermissions,1)">
    <a-col :span="24" >
        <ShowModalButton @isVisible="showModal($event)" :headingText="$t('patient.patients')" :buttonText="$t('patient.addNewPatients')" />
    </a-col>
</a-row>
<a-row v-if="arrayToObjact(patients.patientsPermissions,2)">
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
        <a-select v-model:value="value2" :size="size" mode="tags" style="width: 100%" placeholder="Search . . ." :options="searchoptions" @change="handleChange">
        </a-select>
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(patients.patientsPermissions,3)">
        <div class="text-right mb-24">
            <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
        </div>
    </a-col>
    <a-col :span="24" v-if="arrayToObjact(patients.patientsPermissions,4)">
        <DataTable v-if="patients.patientList" :columns="columns" :data-source="patients.patientList" :scroll="{ x: 1024 }" />
        <Loader />
    </a-col>
</a-row>

<!--modal-->
<PatientsModal v-model:visible="PatientsModal" @saveModal="handleOk($event)" />
<!--end-->
</template>
<script>
import { computed, ref, watchEffect, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import PatientsModal from "@/components/modals/PatientsModal";
import CounterCard from "./counter-card/CounterCard";
import ShowModalButton from "@/components/common/show-modal-button/ShowModalButton";
import Loader from "../loader/Loader";
import { arrayToObjact } from "../../commonMethods/commonMethod";
// import { messages } from "../../config/messages";

export default {
  name: "Patients",
  components: {
    PatientsModal,
    // UserOutlined,
    // WarningOutlined,
    CounterCard,
    ShowModalButton,
    Loader,
    DataTable: defineAsyncComponent(() => import("./data-table/DataTable")),
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
      store.dispatch("programList");
      store.dispatch("patients");
    });

    const columns = computed(() => {
      return store.state.patients.column;
    });

    const patients = computed(() => {
      return store.state.patients;
    });

    return {
      arrayToObjact,
      PatientsModal,
      showModal,
      handleOk,
      handleChange,
      searchoptions,
      size: ref(),
      value2: ref(),
      columns,
      patients,
    };
  },
};
</script>
