<template>
  <div>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24">
        <PatientInfoLeft/>
      </a-col>
      <a-col :xl="16" :lg="24">
        <PatientTimeline/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue-demi';
import PatientInfoLeft from "@/components/patients/patientSummary/PatientInfoLeft";
import PatientTimeline from "@/components/patients/patientSummary/PatientTimeline";
export default {
  components: {
    PatientInfoLeft,
    PatientTimeline,
  },
  setup() {
    const custom = ref(false);
    
    const showModalCustom = () => {
      custom.value = true;
    };

    return {
      showModalCustom,
      custom,
      selectedTimeline: ref([]),
      value10: ref([]),
    }
  }
}
</script>

<style lang="scss">
.timer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 1199px) {
    margin: 0 0 20px;
  }
  h3 {
    margin: 0 10px 0 0;
  }
}
.dangerValue {
  padding: 5px;
  background-color: #f03131f3;
  color: #fff;
}
.ant-alert-error {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  .ant-alert-message {
    color: #842029;
  }
}
</style>