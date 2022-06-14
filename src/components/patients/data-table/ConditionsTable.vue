<template>
  <a-table rowKey="id" :columns="conditionsColumns" :data-source="patientConditions" :pagination="false">
    <template #actions="{record}">
      <a-tooltip placement="right">
        <template #title>
          <span>Edit</span>
        </template>
        <span class="icons"><EditOutlined @click="editRecord(record.id)" /></span>
      </a-tooltip>
      <a-tooltip placement="right">
        <template #title>
          <span>Delete</span>
        </template>
        <span class="icons"><DeleteOutlined @click="deleteRecord(record.id)" /></span>
      </a-tooltip>
    </template>
  </a-table>
</template>

<script>
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons-vue";
import { computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { warningSwal } from '../../../commonMethods/commonMethod';
import { messages } from '../../../config/messages';
export default {
  components: {
    EditOutlined,
    DeleteOutlined,
  },
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
      {
        title: "Start Date",
        dataIndex: "startDate",
        key: "startDate",
      },
      {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        slots: {
          customRender: "actions"
        },
      },
    ];

    const patients = computed(() => {
      return store.state.patients
    })

    const patientConditions = computed(() => {
      return store.state.patients.patientConditions
    })
    
    const editRecord = (id) => {
      store.commit('isConditionEdit', true)
      store.dispatch('conditionDetails', {
        patientUdid: route.params.udid,
        conditionUdid: id,
      }).then(() => {
        emit('editCondition', patients.value.conditionDetails)
      })
    }

    const deleteRecord = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deletePatientCondition', {
            patientUdid: route.params.udid,
            conditionUdid: id,
          }).then(() => {
            store.dispatch('patientConditions', route.params.udid);
          })
        }
      })
    }

    return {
      conditionsColumns,
      patientConditions,
      editRecord,
      deleteRecord,
    };
  },
}
</script>