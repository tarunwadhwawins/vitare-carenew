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
.patientSummary img {
  height: 160px;
  width: 150px;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>