<template>
  <a-modal width="40%" title="Conditions Details" centered :maskClosable="false" @cancel="closeModal()">
    <a-table rowKey="id" :columns="conditionsColumns" :data-source="conditionsList" :pagination="false"></a-table>
  </a-modal>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  actionTrack
} from '@/commonMethods/commonMethod';
export default {
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    watchEffect(() => {
      if(route.name == "PatientSummary") {
        store.dispatch('patientConditions', route.params.udid);
      }
    })

    const conditionsColumns = [
      {
        title: "Conditions",
        dataIndex: "condition",
        key: "condition",
      },
    ];

    const conditionsList = computed(() => {
      return store.state.patients.conditionsList
    })

    const closeModal = () => {
      emit('closeModal')
    }

    return {
      actionTrack,
      conditionsColumns,
      conditionsList,
      closeModal,
    };
  },
}
</script>