<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24">
        <PatientInfoLeft :patientDetails="patientDetails"/>
      </a-col>
      <a-col :xl="16" :lg="24">
        <PatientTimeline className="thumbDesc patientTimeline" :patientDetails="patientDetails"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PatientInfoLeft from "@/components/patients/patientSummary/PatientInfoLeft";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
export default {
  components: {
    PatientInfoLeft,
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