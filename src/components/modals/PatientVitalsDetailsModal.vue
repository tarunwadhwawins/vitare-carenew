<template>
  <a-modal width="1000px" :title="$t('patientSummary.bloodPressureDetails.bloodPressureDetail')" centered>
    <PatientVitalsGrid :patientId="patientDetails.id" />
    <Loader />
  </a-modal>
</template>

<script>
import { computed, defineComponent } from "vue";
import PatientVitalsGrid from "@/components/patients/patientSummary/views/PatientVitalsGrid";
import Loader from "@/components/loader/Loader";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    PatientVitalsGrid,
    Loader,
  },
  setup() {
    const store = useStore()
    const patientDetails = computed(() => {
      return store.state.patients.patientDetails;
    })
    return {
      patientDetails
    };
  },
});
</script>
