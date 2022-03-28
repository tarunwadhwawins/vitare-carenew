<template>
  <div class="patientSummary" v-if="patientDetails">
      <img v-if="patientDetails.profilePhoto" :src="patientDetails.profilePhoto" alt="image"/>
      <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
    <div class="info">
      <h2 v-if="patientDetails.patientFullName">{{ patientDetails.patientFullName }}</h2>
      <p v-if="patientDetails.medicalRecordNumber">Patient Id : #{{ patientDetails.medicalRecordNumber }}</p>
      <p v-if="patientDetails.dob">DOB : {{ patientDetails.dob }}</p>
      <p v-if="patientDetails.email"><a href="mailto:{{patientDetails.email}}"><MailOutlined /> {{ patientDetails.email }}</a></p>
      <p v-if="patientDetails.phoneNumber"><a href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a></p>
      <p v-if="patientDetails.address">{{ patientDetails.address }}</p>
    </div>
    <!-- <EditOutlined @click="addPatient" /> -->
  </div>
  <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
</template>

<script>
import {
  MailOutlined,
  PhoneOutlined,
  // EditOutlined,
} from "@ant-design/icons-vue";
import PatientsModal from "@/components/modals/PatientsModal";
import { ref, computed } from 'vue-demi';
import { useStore } from "vuex";
export default {
  components: {
    MailOutlined,
    PhoneOutlined,
    // EditOutlined,
    PatientsModal,
  },
  setup() {
    const store = useStore();
    const PatientsModal = ref(false);
    
    const addPatient = () => {
      PatientsModal.value = true;
    };

    const patientDetails = computed(() => {
      return store.state.patients.patientDetails
    })
    
    return {
      addPatient,
      PatientsModal,
      patientDetails,
    }
  }
}
</script>

<style lang="scss">
.patientSummary img {
  height: 150px;
  width: 150px;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>