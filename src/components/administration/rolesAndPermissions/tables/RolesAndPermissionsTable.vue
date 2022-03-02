<template>
  <a-table  rowKey="id"

    :columns="rolesColumns"
    :data-source="rolesList">
    <template #actions="{record}">
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <a class="icons" @click="editRole(record.id)"><EditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Delete</span>
        </template>
        <a class="icons" @click="deleteRole(record.id)"> <DeleteOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Copy</span>
        </template>
        <a class="icons" @click="copyRole(record.id)"> <CopyOutlined /></a>
      </a-tooltip>
    </template>
    <template #status="{record}">
      <a-switch v-model:checked="record.status" @change="UpdateRoleStatus(record.id, $event)" />
    </template>
  </a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined, CopyOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { computed, watchEffect } from 'vue-demi';
import {warningSwal} from "../../../../commonMethods/commonMethod";
import { messages } from '../../../../config/messages';
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    CopyOutlined,
  },
  setup() {
    const store = useStore()

    watchEffect(() => {
      store.dispatch('rolesList')
    })

    const rolesList = computed(() => {
      return store.state.rolesAndPermissions.rolesList
    })

    const editRole = (id) => {
      store.dispatch('roleDetails', id)
    }

    const deleteRole = (id) => {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch('deleteRole', id).then(() => {
            store.dispatch('rolesList')
          })
        }
      })
    }

    const copyRole = (id) => {
      store.dispatch('roleDetails', id)
    }

    const UpdateRoleStatus = (id, status) => {
      const data = {
        "isActive": status
      };
      store.dispatch('UpdateRole', {id, data}).then(() => {
        store.dispatch('rolesList')
      })
    }

    const rolesColumns = [
      {
        title: "Role Name",
        dataIndex: "name",
        sorter: {
          compare: (a, b) => a.name - b.name,
          multiple: 3,
        },
      },
      {
        title: "Type of Role ",
        dataIndex: "roleType",
        sorter: {
          compare: (a, b) => a.roleType - b.roleType,
          multiple: 3,
        },
      },
      {
        title: "Description",
        dataIndex: "roleDescription",
        sorter: {
          compare: (a, b) => a.roleDescription - b.roleDescription,
          multiple: 3,
        },
      },
      {
        title: "Active/Inactive",
        dataIndex: "status",
        slots: {
          customRender: "status",
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
      rolesColumns,
      rolesList,
      editRole,
      deleteRole,
      copyRole,
      UpdateRoleStatus,
    }
}
}
</script>