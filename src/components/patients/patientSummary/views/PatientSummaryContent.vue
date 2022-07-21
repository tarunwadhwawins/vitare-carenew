<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="9" :lg="24">
        <PatientSummaryLeft/>
      </a-col>
      <a-col :xl="15" :lg="24">
        <PatientSummaryRight :patientId="patientId" :buttonId="buttonId"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PatientSummaryLeft from "@/components/patients/patientSummary/PatientSummaryLeft";
import PatientSummaryRight from "@/components/patients/patientSummary/PatientSummaryRight";
export default {
  components: {
    PatientSummaryLeft,
    PatientSummaryRight,
  },
  props: {
    buttonId: Number,
    patientId: String,
  },
  setup() {
    return {
    }
  }
}
</script>