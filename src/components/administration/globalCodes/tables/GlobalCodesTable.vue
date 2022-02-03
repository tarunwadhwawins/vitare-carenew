<template>
  <a-table
    rowKey="id"
    :columns="globalCodesColumns"
    :data-source="globalCodesList">
    <template #actions="{record}">
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <span class="icons"><EditOutlined @click="editGlobalCode(record.id)" /></span>
      </a-tooltip>
      <a-tooltip placement="bottom" v-if="record.usedCount != 0">
        <template #title>
          <span>Delete</span>
        </template>
        <span class="icons"><DeleteOutlined @click="deleteGlobalCode(record.id)" /></span>
      </a-tooltip>
    </template>
    <template #status="{record}">
      <a-switch v-model:checked="record.status" @change="updateStatus(record.id, $event)" />
    </template>
  </a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
import { watchEffect, computed } from "vue";
import { useStore } from "vuex";
// import swal from 'sweetalert2';
import {warningSwal} from "../../../../commonMethods/commonMethod"
import { messages } from '../../../../config/messages';
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup(props, {emit}) {
    const store = useStore()
    watchEffect(() => {
      store.dispatch('globalCodesList')
    })
    const globalCodesList = computed(() => {
      return store.state.globalCodes.globalCodesList
    })

    const editGlobalCode = (id) => {
      emit('edit-global-code', id)
    }

    const updateStatus = (id, status) => {
      const data = {
        "status": status
      };
      store.dispatch('updateGlobalCode', {id, data}).then(() => {
        store.dispatch('globalCodesList')
      })
    }

    const deleteGlobalCode = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGlobalCode', id).then(() => {
            store.dispatch('globalCodesList')
          })
        }
      })
    }

    const globalCodesColumns = [
      {
        title: "Category",
        dataIndex: "globalCodeCategory",
        key: "globalCodeCategory",
        className: "codeCategory",
        sorter: {
          compare: (a, b) => a.globalCodeCategory - b.globalCodeCategory,
        },
      },
      {
        title: "Codename",
        dataIndex: "name",
        key: "name",
        className: "codename",
        sorter: {
          compare: (a, b) => a.name - b.name,
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        className: 'description',
        sorter: {
          compare: (a, b) => a.description - b.description,
        },
      },
      {
        title: "Used Count",
        dataIndex: "usedCount",
        key: "usedCount",
        className: "usedCount",
        sorter: {
          compare: (a, b) => a.id - b.id,
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        className: "codeStatus",
        slots: {
          customRender: "status"
        },
      },
      {
        title: "Actions",
        dataIndex: "actions",
        className: "codeActions",
        slots: {
          customRender: "actions",
        },
      },
    ];
    
    return {
      editGlobalCode,
      deleteGlobalCode,
      globalCodesColumns,
      globalCodesList,
      updateStatus,
      warningSwal,
    }
  }
}
</script>

<style>
  th.codeActions {
    width: 120px;
  }
  th.codeStatus, th.usedCount {
    width: 150px;
  }
  td {
    /* text-transform: capitalize; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>