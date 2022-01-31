<template>
  <a-modal width="1000px" title="Document Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          :columns="columns"
          :data-source="data"
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
import { defineComponent } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Document",
    dataIndex: "document",
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: {
      compare: (a, b) => a.message - b.message,
      multiple: 3,
    },
  },
  {
    title: "Tags",
    dataIndex: "tags",
    sorter: {
      compare: (a, b) => a.patient - b.patient,
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
const data = [
  {
    key: "1",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter ID",
    tags: "Voter ID",
    action: "",
  },
  {
    key: "2",
    name: "Program 1",
    document: "abc.pdf",
    type: "Voter ID",
    tags: "Voter ID",
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
      data,
      columns,
    };
  },
});
</script>
