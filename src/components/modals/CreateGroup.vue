<template>
  <a-modal width="800px" title="Group Two">
    <a-row :gutter="24">
      <a-col :sm="18" :xs="24">
        <div class="form-group">
          <label>Staff</label>
          <a-input
            v-model="value"
            size="large"
            placeholder="Search by Name, Department and Tags"
          />
        </div>
      </a-col>
      <a-col :span="6">
        <div class="text-right mt-28">
          <a-button class="btn primaryBtn" @click="showModal">Search</a-button>
        </div>
      </a-col>
      <a-col :span="24" class="mt-25">
        <a-table
          :columns="columns"
          :data-source="data"
          :scroll="{ x: 700 }"
          @change="onChange"
        >
          <template #actions="key">
            <a-checkbox v-model:checked="checked[key.record.key]"></a-checkbox>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
const columns = [
  {
    title: "Select",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Tags",
    dataIndex: "tags",
  },
];
const data = [
  {
    key: "1",
    name: "Jane Doe",
    department: "Outpatient Department",
    tags: "Tag 3",
  },
  {
    key: "2",
    name: "Steve Smith",
    department: "Inpatient Service ",
    tags: "Tag 1",
  },
  {
    key: "3",
    name: "Joseph Spouse",
    department: "Operation Theatre Complex",
    tags: "Tag 2",
  },
  {
    key: "4",
    name: "Robert Henry",
    department: "Medical Department",
    tags: "Tag 1",
  },
];
export default {
  setup() {
    return {
      value: ref([]),
      checked: ref([]),
      columns,
      data,
    };
  },
};
</script>
