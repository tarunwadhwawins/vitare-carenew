<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <PatientInfoTop/>
      </a-col>
      <a-col :sm="24" :xs="24">
        <PatientTimeline className="thumbDesc patientTimeline mt-28"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue-demi';
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
export default {
  components: {
    PatientInfoTop,
    PatientTimeline,
  },
  setup() {
    return {
      value10: ref([]),
    }
  }
}
</script>