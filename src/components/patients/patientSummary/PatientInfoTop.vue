<template>
  <div class="patientSummary" v-if="patientDetails">
      <img v-if="patientDetails.profilePhoto" :src="patientDetails.profilePhoto" alt="image"/>
      <img v-else src="@/assets/images/userAvatar.png" alt="image"/>
    <div class="info">
      <h2>{{ patientDetails.fullName }}</h2>
      <p v-if="patientDetails.medicalRecordNumber">Patient Id : #{{ patientDetails.medicalRecordNumber }}</p>
      <p>DOB : {{ patientDetails.dob }}</p>
      <p><a href="mailto:{{patientDetails.email}}"><MailOutlined /> {{ patientDetails.email }}</a></p>
      <p><a href="tel:{{patientDetails.phoneNumber}}"><PhoneOutlined :rotate="90" /> {{ patientDetails.phoneNumber }}</a></p>
      <p>{{ patientDetails.address }}</p>
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
import { ref, watchEffect, computed } from 'vue-demi';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {
    MailOutlined,
    PhoneOutlined,
    EditOutlined,
    PatientsModal,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const PatientsModal = ref(false);
    
    const addPatient = () => {
      PatientsModal.value = true;
    };

    watchEffect(() => {
      store.dispatch('patientDetails', route.params.udid)
    })
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