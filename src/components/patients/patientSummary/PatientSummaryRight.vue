<template>
  <TimelineView v-if="buttonId == 1" className="thumbDesc patientTimeline"/>
  <CarePlanView v-if="buttonId == 2"/>
  <PatientVitalsView v-if="buttonId == 3"/>
  <EscalationView :patientId="patientId" v-if="buttonId == 4"/>
  <TableLoader/>
  <Loader/>
  <TimelineLoader/>
</template>

<script>
import TimelineView from "@/components/patients/patientSummary/PatientTimeline";
import CarePlanView from "@/components/patients/patientSummary/views/CarePlanView";
import PatientVitalsView from "@/components/patients/patientSummary/views/PatientVitalsView";
import EscalationView from "@/components/escalations/Escalation"
import TableLoader from "@/components/loader/TableLoader"
import Loader from "@/components/loader/Loader"
import TimelineLoader from "@/components/loader/TimelineLoader"
import { onMounted } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  components: {
    TimelineView,
    CarePlanView,
    PatientVitalsView,
    EscalationView,
    TableLoader,
    Loader,
    TimelineLoader,
  },
  props: {
    buttonId: Number,
    patientId: String,
  },
  setup() {
    const store = useStore()
    onMounted(() => {
      store.commit('loadingTimelineStatus', true)
    })
  }
}
</script>