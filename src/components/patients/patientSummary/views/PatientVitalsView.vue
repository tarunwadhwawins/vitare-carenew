<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <PatientInfoTop :patientDetails="patientDetails"/>
      </a-col>
    </a-row>
    <div class="patientsVitals">
      <PatientVitalsGrid />
    </div>
  </div>
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import PatientVitalsGrid from "@/components/patients/patientSummary/views/PatientVitalsGrid";
import { computed } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  components: {
    PatientInfoTop,
    PatientVitalsGrid,
  },
  setup() {
    const store = useStore();
    const patientSummaryColumns = [
      {
        title: "Date Recorded",
        dataIndex: "recorded",
      },
      {
        title: "Value",
        dataIndex: "value",
        slots: {
          customRender: "value",
        },
      },
    ];
    const patientSummaryData = [
      {
        key: "1",
        recorded: "Nov 05, 2021 10:00 AM",
        value: "120/80",
      },
      {
        key: "2",
        recorded: "Nov 06, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "3",
        recorded: "Nov 08, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "4",
        recorded: "Nov 09, 2021 10:00 AM",
        value: "122/80",
      },
      {
        key: "5",
        recorded: "Nov 11, 2021 10:00 AM",
        value: "122/80",
      },
    ];
    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    })
    return {
      patientSummaryColumns,
      patientSummaryData,
      patientDetails,
    }
  }
}
</script>

<style lang="scss">
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
</style>