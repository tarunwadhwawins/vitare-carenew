<template>
  <a-row>
    <a-col :span="24">
      <a-table :columns="columns" :data-source="data" :scroll="{ x: 1200 }" @change="onChange" />
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'type'">
          <span>
            <smile-outlined />
            Type
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
    dataIndex: "first",
  },
  {
    title: "Last Name",
    dataIndex: "last",
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
    dataIndex: "created",
    sorter: {
      compare: (a, b) => a.created - b.created,
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
const data = [
  {
    key: "1",
    first: "Jane",
    last: "Doe",
    role: "Physician",
    specialization: "Wellness",
    network: "In",
    created: "Nov 10,2021",
    status: "Active",
    action: 70,
  },
  {
    key: "2",
    first: "Steve",
    last: "Smith",
    role: "Cardiologist",
    specialization: "Behavior",
    network: "Out",
    created: "Nov 07,2021",
    status: "Active",
    action: 70,
  },
  {
    key: "3",
    first: "Joseph",
    last: "William",
    role: "RN",
    specialization: "Wellness",
    network: "In",
    created: "Nov 01,2021",
    status: "Active",
    action: 70,
  },
  {
    key: "4",
    first: "Robert",
    last: "Henry",
    role: "Physician",
    specialization: "Behavior",
    network: "Out",
    created: "Nov 10,2021",
    status: "Active",
    action: 70,
  },
];
export default {
  setup() {
    return {
      data,
      columns,
      onChange: (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      },
    };
  },
}
</script>