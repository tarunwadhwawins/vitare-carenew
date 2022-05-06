<template>
  <a-table :columns="columns" :data-source="groupsList" :scroll="{ x: 900 }" >
    
    <template #actions="{record}">
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.manageStaff') }}</span>
        </template>
        <a class="icons" @click="manageGroupStaff(record.udid)"><UserAddOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.manageProviders') }}</span>
        </template>
        <a class="icons" @click="manageProviders(record.udid)"><MedicineBoxOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.managePrograms') }}</span>
        </template>
        <a class="icons" @click="managePrograms(record.udid)"><AuditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.managePermissions') }}</span>
        </template>
        <a class="icons" @click="manageGroupPermissions(record.udid)"><ToolOutlined /></a>
      </a-tooltip>
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
  <ManageGroupPermissionsModal v-if="visibleManageGroupPermissionsModal" v-model:visible="visibleManageGroupPermissionsModal" @closeModal="closeModal" :groupId="idGroup" />
  <ManageGroupStaffModal v-if="visibleAddGroupStaffModal" v-model:visible="visibleAddGroupStaffModal" @closeModal="closeModal" :groupId="idGroup" />
  <ManageGroupProvidersModal v-if="visibleManageProvidersModal" v-model:visible="visibleManageProvidersModal" @closeModal="closeModal" :groupId="idGroup" />
  <ManageGroupProgramsModal v-if="visibleManageProgramsModal" v-model:visible="visibleManageProgramsModal" @closeModal="closeModal" :groupId="idGroup" />
  <CreateGroupModal v-if="visibleCreateGroupModal" v-model:visible="visibleCreateGroupModal" @closeModal="closeModal" :isEdit="true" :groupId="idGroup" />
  
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  ToolOutlined,
  MedicineBoxOutlined,
  AuditOutlined,
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
    UserAddOutlined,
    ToolOutlined,
    MedicineBoxOutlined,
    AuditOutlined,
    CreateGroupModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/CreateGroupModal")),
    ManageGroupStaffModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupStaffModal")),
    ManageGroupProvidersModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupProvidersModal")),
    ManageGroupProgramsModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupProgramsModal")),
    ManageGroupPermissionsModal: defineAsyncComponent(()=>import("@/components/administration/staffGroups/modals/ManageGroupPermissionsModal")),
  },
  setup() {
    const store = useStore()
    const checked = true;
    const idGroup = ref(null);
    const visibleCreateGroupModal = ref(false);
    const visibleAddGroupStaffModal = ref(false);
    const visibleManageGroupPermissionsModal = ref(false);
    const visibleManageProvidersModal = ref(false);
    const visibleManageProgramsModal = ref(false);
    
    const manageGroupPermissions = (id) => {
      store.dispatch('rolePermissions')
      store.dispatch('groupPermissions', id).then(() => {
        visibleManageGroupPermissionsModal.value = true;
        idGroup.value = id
      })
    };
    
    const manageGroupStaff = (id) => {
      visibleAddGroupStaffModal.value = true;
      idGroup.value = id
    };
    
    const manageProviders = (id) => {
      idGroup.value = id
      visibleManageProvidersModal.value = true;
    };
    
    const managePrograms = (id) => {
      idGroup.value = id
      visibleManageProgramsModal.value = true;
      idGroup.value = id
    };
    
    const editGroup = (id) => {
      idGroup.value = id
      store.commit('createGroup', null)
      store.dispatch('groupDetails', id).then(() => {
        visibleCreateGroupModal.value = true;
      })
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
      visibleCreateGroupModal.value = false;
      visibleAddGroupStaffModal.value = false;
      visibleManageGroupPermissionsModal.value = false;
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
      deleteGroup,
      manageGroupPermissions,
      visibleManageGroupPermissionsModal,
      manageGroupStaff,
      visibleAddGroupStaffModal,
      manageProviders,
      visibleManageProvidersModal,
      managePrograms,
      visibleManageProgramsModal,
      visibleCreateGroupModal,
      editGroup,
      checked,
      columns,
      groupsList,
      idGroup,
      updateStatus,
    }
  }
}
</script>

<style>
.icons .anticon-user-add svg {
  fill: #0d6efd;
  font-size: 18px;
}
.icons .anticon-medicine-box svg {
  fill: #fd0d0d;
  font-size: 18px;
}
.icons .anticon-audit svg {
  fill: #080b97;
  font-size: 18px;
}
.icons .anticon-tool svg {
  fill: #e29e19;
  font-size: 18px;
}
</style>