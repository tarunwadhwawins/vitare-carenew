<template>
  <a-table rowKey="id" :columns="communicationColumns" :data-source="callDetails" :footer="false" :pagination="false">
    <template #staff="{record}">
      <router-link target="_blank" :to="{ name: 'CoordinatorSummary', params: { udid: record.staffId }}">{{ record.staff }}</router-link>
    </template>
  </a-table>
</template>

<script>
import { computed } from 'vue-demi'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const communicationColumns = [
      {
        title: "Staff",
        dataIndex: "staff",
        key: "staff",
        slots: {
          customRender: "staff",
        },
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
      },
      {
        title: "End Time",
        dataIndex: "endTime",
        key: "endTime",
      },
    ]

    const callDetails = computed(() => {
      return store.state.communications.callDetails
    })

    return {
      communicationColumns,
      callDetails,
    }
  }
}
</script>