<template>
  <a-row>
    <a-col :sm="24" :xs="24">
      <PatientInfoTop :patientDetails="patientDetails"/>
    </a-col>
    <a-col :span="24">
      <CarePlanTable/>
    </a-col>
  </a-row>
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import CarePlanTable from "@/components/patients/patientSummary/CarePlanTable";
export default {
  components: {
    PatientInfoTop,
    CarePlanTable,
  },
  props: {
    patientDetails:{
      type: Array
    }
  },
  setup() {

    return {
      
    }
  }
}
</script>