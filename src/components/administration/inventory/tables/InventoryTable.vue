<template>
  <a-table  rowKey="id"
    
    :columns="inventoryColumns"
    :data-source="inventoriesList">
    <template #actions="{record}">
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <span class="icons"><EditOutlined @click="editInventory(record.id, record.deviceTypeId)" /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Delete</span>
        </template>
        <span class="icons"><DeleteOutlined @click="deleteInventory(record.id)" /></span>
      </a-tooltip>
    </template>
    <template #isActive="{record}">
      <a-switch v-model:checked="record.status" @change="updateStatus(record.id, $event)" />
    </template>
  </a-table>
  <Loader/>
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons-vue";
import { watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { warningSwal } from "@/commonMethods/commonMethod";
import { messages } from '@/config/messages';
import Loader from "@/components/loader/Loader";
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    Loader,
  },
  setup(props, {emit}) {
    const store = useStore()
    watchEffect(() => {
      store.dispatch('inventoriesList')
    })

    const inventoriesList = computed(() => {
      return store.state.inventory.inventoriesList
    })

    const editInventory = (id, deviceTypeId) => {
      store.state.inventory.deviceModalsList = null
      // store.dispatch('inventoryDetails', id)
      emit('edit-inventory', {id, deviceTypeId})
    }

    const updateStatus = (id, status) => {
      const data = {
        "inventoryStatus": true,
        "isActive": status
      };
      store.dispatch('updateInventory', {id, data}).then(() => {
        store.dispatch('inventoriesList')
      })
    }

    const deleteInventory = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteInventory', id).then(() => {
            store.dispatch('inventoriesList')
          })
        }
      })
    }

    const inventoryColumns = [
      {
        title: "Device Type",
        dataIndex: "deviceType",
        key: "deviceType",
        className: "deviceType",
        sorter: {
          compare: (a, b) => a.deviceType - b.deviceType,
        },
      },
      {
        title: "Model Number",
        dataIndex: "modelNumber",
        key: "modelNumber",
        className: "modelNumber",
        sorter: {
          compare: (a, b) => a.modelNumber - b.modelNumber,
        },
      },
      {
        title: "Serial Number",
        dataIndex: "serialNumber",
        key: "serialNumber",
        className: 'serialNumber',
        sorter: {
          compare: (a, b) => a.serialNumber - b.serialNumber,
        },
      },
      {
        title: "Mac Address",
        dataIndex: "macAddress",
        key: "macAddress",
        className: "macAddress",
        sorter: {
          compare: (a, b) => a.macAddress - b.macAddress,
        },
      },
      {
        title: "Active/Inactive",
        dataIndex: "isActive",
        key: "isActive",
        className: "isActive",
        sorter: {
          compare: (a, b) => a.isActive - b.isActive,
        },
        slots: {
          customRender: "isActive",
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
      deleteInventory,
      editInventory,
      updateStatus,
      inventoryColumns,
      inventoriesList,
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
  
</style>