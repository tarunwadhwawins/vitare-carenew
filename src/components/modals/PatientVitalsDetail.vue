<template>
  <a-modal width="1000px" :title="$t('patientSummary.bloodPressureDetails.bloodPressureDetail')" centered>
    <PatientVitalsGrid />
  </a-modal>
</template>

<script>
import { defineComponent } from "vue";
import PatientVitalsGrid from "@/components/patients/patientSummary/views/PatientVitalsGrid";

export default defineComponent({
  components: {
    PatientVitalsGrid,
  },
  setup() {
    
    return {
      
    };
  },
});
</script>
