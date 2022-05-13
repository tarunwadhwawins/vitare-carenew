<template>
  <a-table :columns="columns" :data-source="groupsList" :scroll="{ x: 900 }" >
    
    <template #actions="{record}">
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.editGroup') }}</span>
        </template>
        <a class="icons" @click="editGroup(record.udid)"><EditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.deleteGroup') }}</span>
        </template>
        <a class="icons" @click="deleteGroup(record.udid)"> <DeleteOutlined /></a>
      </a-tooltip>
    </template>

    <template #isActive="{record}">
      <a-switch v-model:checked="record.isActive" @change="updateStatus(record.udid, $event)" />
    </template>
    
  </a-table>

  <!-- Modal -->
  <StaffGroupModal v-if="visibleGroupModal" v-model:visible="visibleGroupModal" @closeModal="closeModal" :isEdit="true" :groupID="idGroup" />
  
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import { computed, ref, watchEffect, defineAsyncComponent } from "vue";
import { useStore } from 'vuex';
import {
  warningSwal,
} from "@/commonMethods/commonMethod";
import { messages } from "@/config/messages";

export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    StaffGroupModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/StaffGroupsModal")),
  },
  setup() {
    const store = useStore()
    const checked = true;
    const idGroup = ref(null);
    const visibleGroupModal = ref(false);
    
    const editGroup = (id) => {
      idGroup.value = id
      store.dispatch('groupDetails', id).then(() => {
        visibleGroupModal.value = true;
      })
      store.dispatch('rolePermissions')
      store.dispatch('groupStaffList', id)
      store.dispatch('groupProgramsList', id)
      store.dispatch('groupProvidersList', id)
      store.dispatch('groupPermissions', id)
      store.commit("resetCounter")
    };
    
    const updateStatus = (id, value) => {
      store.dispatch('updateGroup', {
        id: id,
        data: {
          isActive: value
        }
      }).then(() => {
        store.dispatch('groupsList')
      })
    };

    const deleteGroup = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteGroup', id).then(() => {
            store.dispatch('groupsList')
          })
        }
      })
    }

    watchEffect(() => {
      store.dispatch('groupsList')
    })

    const groupsList = computed(() => {
      return store.state.staffGroups.groupsList
    })
    
    const closeModal = () => {
      visibleGroupModal.value = false;
    };

    const columns = [
      {
        title: "Group",
        dataIndex: "group",
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
      },
      {
        title: "Total Member(s)",
        dataIndex: "totalMembers",
      },
      {
        title: "Status",
        dataIndex: "isActive",
        slots: {
          customRender: "isActive",
        },
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "actions",
        },
      },
    ];

    return {
      closeModal,
      visibleGroupModal,
      editGroup,
      deleteGroup,
      checked,
      columns,
      groupsList,
      idGroup,
      updateStatus,
    }
  }
}
</script>