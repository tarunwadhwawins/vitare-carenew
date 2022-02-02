<template>
  <a-table
    rowKey="id"
    :columns="columns"
    :data-source="data">
    <template #actions>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <a class="icons"><EditOutlined /></a>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Delete</span>
        </template>
        <a class="icons"> <DeleteOutlined /></a>
      </a-tooltip>
    </template>
    <template #status="{record}">
      <a-switch v-model:checked="record.status" />
    </template>
  </a-table>
</template>

<script>
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    const columns = [
      {
        title: "Role Name",
        dataIndex: "rolename",
        sorter: {
          compare: (a, b) => a.rolename - b.rolename,
          multiple: 3,
        },
      },
      {
        title: "Type of Role ",
        dataIndex: "role",
        sorter: {
          compare: (a, b) => a.role - b.role,
          multiple: 3,
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        sorter: {
          compare: (a, b) => a.description - b.description,
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
    const data = [
      {
        key: "1",
        rolename: "Billing Admin",
        role: "Predefined",
        description: "Full System Access",
        active: "",
        action: "",
      },
      {
        key: "2",
        rolename: "Manager",
        role: "Predefined",
        description: "Full System Access",
        active: "",
        action: "",
      },
      {
        key: "3",
        rolename: "User Admin",
        role: "Predefined",
        description: "Full System Access",
        active: "",
        action: "",
      },
    ];

    return {
      columns,
      data,
    }
}
}
</script>