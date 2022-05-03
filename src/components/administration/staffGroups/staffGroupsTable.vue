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
  <GroupPermissionsModal v-model:visible="visibleGroupPermissionsModal" @closeModal="closeModal" />
  <ManageGroupStaffModal v-model:visible="visibleAddGroupStaffModal" @closeModal="closeModal" :groupId="idGroup" />
  <ManageGroupProvidersModal v-model:visible="visibleManageProvidersModal" @closeModal="closeModal" />
  <ManageGroupProgramsModal v-model:visible="visibleManageProgramsModal" @closeModal="closeModal" />
  <CreateGroupModal v-if="visibleCreateGroupModal" v-model:visible="visibleCreateGroupModal" @closeModal="closeModal" :isEdit="true" :groupId="idGroup" />
  <!---->
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
// import CreateGroupModal from "@/components/modals/CreateGroupModal";
// import ManageGroupStaffModal from "@/components/modals/ManageGroupStaffModal";
// import ManageGroupProvidersModal from "@/components/modals/ManageGroupProvidersModal";
// import ManageGroupProgramsModal from "@/components/modals/ManageGroupProgramsModal";
// import GroupPermissionsModal from "@/components/modals/GroupPermissionsModal";
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
    CreateGroupModal: defineAsyncComponent(()=>import("@/components/modals/CreateGroupModal")),
    ManageGroupStaffModal: defineAsyncComponent(()=>import("@/components/modals/ManageGroupStaffModal")),
    ManageGroupProvidersModal: defineAsyncComponent(()=>import("@/components/modals/ManageGroupProvidersModal")),
    ManageGroupProgramsModal: defineAsyncComponent(()=>import("@/components/modals/ManageGroupProgramsModal")),
    GroupPermissionsModal: defineAsyncComponent(()=>import("@/components/modals/GroupPermissionsModal")),
  },
  setup() {
    const store = useStore()
    const checked = true;
    const idGroup = ref(null);
    const visibleCreateGroupModal = ref(false);
    const visibleAddGroupStaffModal = ref(false);
    const visibleGroupPermissionsModal = ref(false);
    const visibleManageProvidersModal = ref(false);
    const visibleManageProgramsModal = ref(false);
    
    const manageGroupPermissions = () => {
      visibleGroupPermissionsModal.value = true;
    };
    
    const manageGroupStaff = (id) => {
      idGroup.value = id
      console.log('groupId', id)
      store.dispatch('groupStaffList', id)
      visibleAddGroupStaffModal.value = true;
    };
    
    const manageProviders = (id) => {
      console.log('groupId', id)
      visibleManageProvidersModal.value = true;
    };
    
    const managePrograms = (id) => {
      console.log('groupId', id)
      visibleManageProgramsModal.value = true;
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
      visibleGroupPermissionsModal.value = false;
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
      visibleGroupPermissionsModal,
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