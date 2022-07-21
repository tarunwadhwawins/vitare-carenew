<template>
  <div>
    <a-row :gutter="10">
      <a-col :xl="8" :lg="24">
        <PatientSummaryLeft/>
      </a-col>
      <a-col :xl="16" :lg="24">
        <PatientTimeline className="thumbDesc patientTimeline"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PatientSummaryLeft from "@/components/patients/patientSummary/PatientSummaryLeft";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
export default {
  components: {
    PatientSummaryLeft,
    PatientTimeline,
  },
  setup() {
    return {
    }
  }
}
</script>