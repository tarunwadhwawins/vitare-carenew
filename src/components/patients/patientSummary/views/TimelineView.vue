<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <PatientInfoTop :patientDetails="patientDetails"/>
      </a-col>
      <a-col :sm="24" :xs="24">
        <PatientTimeline className="thumbDesc patientTimeline mt-28"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
export default {
  components: {
    PatientInfoTop,
    PatientTimeline,
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