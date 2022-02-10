<template>
  <div class="patientSummary">
    <img src="@/assets/images/profile-4.jpg" alt="image" />
    <div class="info">
      <h2>{{ patientDetail.name }}</h2>
      <p>Patient Id : #{{ patientDetail.udid }}</p>
      <p>DOB : {{ patientDetail.dob }}</p>
      <p><a href="mailto:{{patientDetail.email}}"><MailOutlined /> {{ patientDetail.email }}</a></p>
      <p><a href="tel:{{patientDetail.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetail.phoneNumber }}</a></p>
      <p>{{ patientDetail.address }}</p>
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
import { ref, reactive } from 'vue-demi';
export default {
  components: {
    MailOutlined,
    PhoneOutlined,
    EditOutlined,
    PatientsModal,
  },
  props: {
    patientDetails:{
      type: Object
    }
  },
  setup(props) {
    const PatientsModal = ref(false);
    const patientDetail = reactive(props.patientDetails);
    const addPatient = () => {
      PatientsModal.value = true;
    };
    return {
      addPatient,
      PatientsModal,
      patientDetail,
    }
  }
}
</script>

<style lang="scss">
.patientSummary img {
  height: 160px;
  width: 150px;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>