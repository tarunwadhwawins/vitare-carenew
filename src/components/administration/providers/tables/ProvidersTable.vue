<template>
  <a-table rowKey="id" :columns="columns" :data-source="data">
    <template #actions>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Edit</span>
        </template>
        <span class="icons"><EditOutlined /></span>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>Delete</span>
        </template>
        <span class="icons"><DeleteOutlined /></span>
      </a-tooltip>
    </template>
    <template #active="{record}">
      <a-switch v-model:checked="record.status" />
    </template>
    <template #first="{record}">
      <router-link to="provider-summary">{{ record.name }}</router-link>
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
        title: "Provider Name",
        dataIndex: "name",
        sorter: {
          compare: (a, b) => a.name - b.name,
          multiple: 3,
        },
        slots: {
          customRender: "first",
        },
      },
      {
        title: "Provider Address",
        dataIndex: "description",
        sorter: {
          compare: (a, b) => a.description - b.description,
          multiple: 3,
        },
      },
      {
        title: "Active/Inactive",
        dataIndex: "active",
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
        name: "Provider 1",
        description: "Lorem Ipsum",
        active: "",
        action: "",
      },
      {
        key: "2",
        name: "Provider 2",
        description: "Lorem Ipsum",
        active: "",
        action: "",
      },
      {
        key: "3",
        name: "Provider 3",
        description: "Lorem Ipsum",
        active: "",
        action: "",
      },
    ];
    return {
      columns,
      data,
      text: 'provider-summary'
    }
  }
}
</script>