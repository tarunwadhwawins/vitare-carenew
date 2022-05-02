<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 900 }" >
    
    <template #actions>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.manageStaff') }}</span>
        </template>
        <a class="icons" @click="showAddGroupStaffModal"><PlusOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.permissions') }}</span>
        </template>
        <a class="icons" @click="showGroupPermissionsModal"><ToolOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.editGroup') }}</span>
        </template>
        <a class="icons" @click="showCreateGroupModal"><EditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ $t('staffGroups.deleteGroup') }}</span>
        </template>
        <a class="icons"> <DeleteOutlined /></a>
      </a-tooltip>
    </template>

    <template #active>
      <a-switch v-model:checked="checked" @change="updateStatus(record.id, $event)" />
    </template>
    
  </a-table>

  <!-- Modal -->
  <GroupPermissionsModal v-model:visible="visibleGroupPermissionsModal" @closeModal="closeModal" />
  <AddGroupStaffModal v-model:visible="visibleAddGroupStaffModal" @closeModal="closeModal" />
  <CreateGroupModal v-model:visible="visibleCreateGroupModal" @closeModal="closeModal" :isEdit="true" />
  <!---->
</template>

<script>
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ToolOutlined
} from "@ant-design/icons-vue";
import { ref } from "vue";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import AddGroupStaffModal from "@/components/modals/AddGroupStaffModal";
import GroupPermissionsModal from "@/components/modals/GroupPermissionsModal";

export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ToolOutlined,
    CreateGroupModal,
    AddGroupStaffModal,
    GroupPermissionsModal,
  },
  setup() {
    const checked = true;
    const visibleCreateGroupModal = ref(false);
    const visibleAddGroupStaffModal = ref(false);
    const visibleGroupPermissionsModal = ref(false);
    
    const showGroupPermissionsModal = () => {
      visibleGroupPermissionsModal.value = true;
    };
    
    const showCreateGroupModal = () => {
      visibleCreateGroupModal.value = true;
    };
    
    const showAddGroupStaffModal = () => {
      visibleAddGroupStaffModal.value = true;
    };
    
    const closeModal = () => {
      visibleCreateGroupModal.value = false;
      visibleAddGroupStaffModal.value = false;
      visibleGroupPermissionsModal.value = false;
    };

    const columns = [
      {
        title: "Group",
        dataIndex: "group",
        sorter: {
          compare: (a, b) => a.template - b.template,
          multiple: 3,
        },
      },
      {
        title: "Created Date",
        dataIndex: "created",
      },
      {
        title: "Total Member",
        dataIndex: "total",
      },
      {
        title: "Status",
        dataIndex: "status",
        slots: {
          customRender: "active",
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
    const data = [
      {
        key: "1",
        group: "Group One",
        created: "Feb 20, 2022",
        total: "5",
        status: "",
        action: "",
      },
      {
        key: "2",
        group: "Group Two",
        staff: "Steve Smith, Robert Henry",
        created: "Feb 23, 2022",
        total: "4",
        status: "",
        action: "",
      },
      {
        key: "3",
        group: "Group Three",
        created: "Feb 25, 2022",
        total: "8",
        status: "",
        action: "",
      },
      {
        key: "4",
        group: "Group Four",
        created: "Feb 20, 2022",
        total: "5",
        status: "",
        action: "",
      },
    ];

    return {
      closeModal,
      showGroupPermissionsModal,
      visibleGroupPermissionsModal,
      showAddGroupStaffModal,
      visibleAddGroupStaffModal,
      visibleCreateGroupModal,
      showCreateGroupModal,
      checked,
      columns,
      data
    }
  }
}
</script>

<style>
.icons .anticon-plus svg {
  fill: #0d6efd;
  font-size: 18px;
}
.icons .anticon-tool svg {
  fill: #e29e19;
  font-size: 18px;
}
</style>