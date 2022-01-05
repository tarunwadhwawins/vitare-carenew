<template>
  <a-modal width="1000px" title="Time Logs Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          :columns="columns1"
          :data-source="data1"
          :scroll="{ x: 900 }"
          :pagination="false"
          @change="onChange"
        >
          <template #action>
            <a class="icons"><EditOutlined /></a>
            <a class="icons"><DeleteOutlined /></a>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns1 = [
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Logged By",
    dataIndex: "logged",
  },
  {
    title: "Performed By",
    dataIndex: "performed",
    sorter: {
      compare: (a, b) => a.performed - b.performed,
      multiple: 3,
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: {
      compare: (a, b) => a.date - b.date,
      multiple: 2,
    },
  },
  {
    title: "Time Amount",
    dataIndex: "time",
    sorter: {
      compare: (a, b) => a.time - b.time,
      multiple: 2,
    },
  },
  {
    title: "Action",
    dataIndex: "action",
    slots: {
      customRender: "action",
    },
  },
];
const data1 = [
  {
    key: "1",
    category: "Daily monitoring of vitals",
    logged: "Jane Doe",
    performed: "Steve Smith",
    date: "Oct 25, 2021",
    time: "3:00",
    action: "",
  },
  {
    key: "2",
    category: "Provider Order For Lab",
    logged: "Jane Doe",
    performed: "Steve Smith",
    date: "Oct 28, 2021",
    time: "2:00",
    action: "",
  },
];
export default defineComponent({
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    return {
      data1,
      columns1,
    };
  },
});
</script>
