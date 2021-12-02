<template>
  <a-row>
    <a-col :span="24">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 1200 }" @change="onChange" />
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'type'">
          <span>
            <smile-outlined />
          </span>
        </template>
      </template>
    </a-col>
  </a-row>
</template>

<script>
const columns = [
  {
    title: "First Name",
    dataIndex: "first_name",
    sorter: {
      compare: (a, b) => a.first_name - b.first_name,
      multiple: 3,
    },
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    sorter: {
      compare: (a, b) => a.last_name - b.last_name,
      multiple: 3,
    },
  },
  {
    title: "Role",
    dataIndex: "role",
    sorter: {
      compare: (a, b) => a.role - b.role,
      multiple: 3,
    },
  },
  {
    title: "Specialization",
    dataIndex: "specialization",
    sorter: {
      compare: (a, b) => a.specialization - b.specialization,
      multiple: 2,
    },
  },
  {
    title: "Network",
    dataIndex: "network",
    sorter: {
      compare: (a, b) => a.network - b.network,
      multiple: 1,
    },
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    sorter: {
      compare: (a, b) => a.created_at - b.created_at,
      multiple: 1,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a, b) => a.status - b.status,
      multiple: 1,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    sorter: {
      compare: (a, b) => a.action - b.action,
      multiple: 1,
    },
  },
];
import { toRef } from 'vue';
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const data = toRef(props, 'list');
    return {
      data,
      columns,
      // onChange: (pagination, filters, sorter, extra) => {
      //   console.log("params", pagination, filters, sorter, extra);
      // },
    };
  },
}
</script>