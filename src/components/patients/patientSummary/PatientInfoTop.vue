<template>
  <div class="patientSummary">
    <img src="@/assets/images/profile-4.jpg" alt="image" />
    <div class="info">
      <h2>Jane Doe</h2>
      <p>Patient Id : #3432</p>
      <p>DOB : June 25, 1995</p>
      <p><a href="mailto:jane@gmail.com"><MailOutlined /> jane@gmail.com</a></p>
      <p><a href="tel:1234567890"><PhoneOutlined :rotate="90" /> +343-3563-767</a></p>
      <p>132, My Street, Kingston, New York 12401.</p>
    </div>
    <EditOutlined @click="addPatient" />
  </div>
  <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
</template>

<script>
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import PatientsModal from "@/components/modals/PatientsModal";
import { ref } from 'vue-demi';
export default {
  components: {
    MailOutlined,
    PhoneOutlined,
    EditOutlined,
    PatientsModal,
  },
  setup() {
    const PatientsModal = ref(false);
    const addPatient = () => {
      PatientsModal.value = true;
    };
    return {
      addPatient,
      PatientsModal,
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