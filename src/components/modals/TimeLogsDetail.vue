<template>
  <a-modal width="1000px" title="Time Logs Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table rowKey="id" :columns="timeLogColumns" :data-source="timeLogsList" :scroll="{ x: 900 }" :pagination="false" >
          <template #action="{record}">
            <a class="icons"><EditOutlined @click="editTimeLog(record.id)" /></a>
            <a class="icons"><DeleteOutlined @click="deleteTimeLog(record.id)"/></a>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { computed, defineComponent, watchEffect } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import {warningSwal} from "@/commonMethods/commonMethod"
import { messages } from '@/config/messages';

export default defineComponent({
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup(props, {emit}) {
    const store = useStore();
    
    const timeLogColumns = [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Logged By",
        dataIndex: "loggedBy",
        key: "loggedBy",
      },
      {
        title: "Performed By",
        dataIndex: "performedBy",
        key: "performedBy",
        sorter: {
          compare: (a, b) => a.performedBy - b.performedBy,
          multiple: 3,
        },
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        sorter: {
          compare: (a, b) => a.date - b.date,
          multiple: 2,
        },
      },
      {
        title: "Time Amount",
        dataIndex: "timeAmount",
        key: "timeAmount",
        sorter: {
          compare: (a, b) => a.timeAmount - b.timeAmount,
          multiple: 2,
        },
      },
      {
        title: "Action",
        dataIndex: "action",
        slots: {
          customRender: "action",
        },
      },
    ];
    
    watchEffect(() => {
      store.dispatch('timeLogsList')
    })

    const timeLogsList =  computed(() => {
      return store.state.timeLogs.timeLogsList
    })

    const deleteTimeLog = (udid) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteTimeLog', udid).then(() => {
            store.dispatch('timeLogsList');
          });
        }
      })
    }

    const editTimeLog = (udid) => {
      store.dispatch('timeLogDetails', udid)
      const timeLogDetails = computed(() => {
        return store.state.timeLogs.timeLogDetails;
      })
      emit('editTimeLog', timeLogDetails)
    }

    return {
      timeLogColumns,
      timeLogsList,
      deleteTimeLog,
      editTimeLog,
    };
  },
});
</script>
