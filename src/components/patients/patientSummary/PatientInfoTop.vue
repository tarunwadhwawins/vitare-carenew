<template>
  <div class="patientInfo" v-if="patientDetails">
    <ProfileImage :patientDetails="patientDetails" :isLeft="false" :drawer="drawer" />
  </div>
  <PatientsModal v-model:visible="PatientsModal" @ok="handleOk" />
</template>

<script>
import PatientsModal from "@/components/modals/PatientsModal";
import { ref, computed, defineAsyncComponent } from 'vue-demi';
import { useStore } from "vuex";
export default {
  components: {
    PatientsModal,
    ProfileImage: defineAsyncComponent(()=>import("@/components/common/ProfileImage")),
  },
  props:{
    drawer:Boolean
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