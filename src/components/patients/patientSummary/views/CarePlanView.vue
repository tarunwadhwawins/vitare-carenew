<template>
  <a-row>
    <a-col :sm="24" :xs="24">
      <PatientInfoTop :patientDetails="patientDetails"/>
    </a-col>
    <a-col :span="24">
      <div class="text-right mb-24 mt-28">
        <a-button class="primaryBtn" @click="AddCarePlan">Add Goal</a-button>
      </div>
      <CarePlanTable/>
    </a-col>
  </a-row>
  <AddCarePlanModal v-if="visibleCarePlanmodal" v-model:visible="visibleCarePlanmodal" @closeModal="handleOk" @ok="handleOk" />
</template>

<script>
import PatientInfoTop from "@/components/patients/patientSummary/PatientInfoTop";
import CarePlanTable from "@/components/patients/patientSummary/CarePlanTable";
import { ref } from 'vue-demi';
import AddCarePlanModal from "@/components/modals/AddCarePlanModal";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue-demi';
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";
export default {
  components: {
    PatientInfoTop,
    CarePlanTable,
    AddCarePlanModal,
  },
  props: {
    patientDetails:{
      type: Array
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const visibleCarePlanmodal = ref(false);

    watchEffect(() => {
      if(route.name == 'PatientSummary') {
        store.dispatch('carePlansList', route.params.udid)
      }
    })

    const handleOk = (value) => {
      if(value) {
        visibleCarePlanmodal.value = true
        warningSwal(messages.modalWarning).then((response) => {
          if (response == true) {
            visibleCarePlanmodal.value = false
            store.commit('checkChangeInput', false)
          }
          else {
            visibleCarePlanmodal.value = true
          }
        });
      }
      else {
        visibleCarePlanmodal.value = false
      }
    };

    const AddCarePlan = () => {
      visibleCarePlanmodal.value = true;
    };
    return {
      visibleCarePlanmodal,
      AddCarePlan,
      handleOk,
    }
  }
}
</script>