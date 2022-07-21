<template>
  <div>
    <div class="patientsVitals">
      <PatientVitalsGrid />
    </div>
  </div>
</template>

<script>
import PatientVitalsGrid from "@/components/patients/patientSummary/views/PatientVitalsGrid";
import { computed } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  components: {
    PatientVitalsGrid,
  },
  setup() {
    const store = useStore();
    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    })
    return {
      patientDetails,
    }
  }
}
</script>

<style lang="scss">
/* .dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
} */
</style>