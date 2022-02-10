<template>
  <a-row>
    <a-col :sm="24" :xs="24">
      <PatientInfoTop/>
    </a-col>
    <a-col :span="24">
      <CarePlanTable/>
    </a-col>
  </a-row>
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import CarePlanTable from "@/components/patients/patientSummary/CarePlanTable";
import { ref } from 'vue-demi';
export default {
  components: {
    PatientInfoTop,
    CarePlanTable,
  },
  setup() {

    return {
      
    }
  }
}
</script>