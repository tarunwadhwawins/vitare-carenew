<template>
  <a-row :gutter="24">
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Role</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="Billing">Billing Admin</a-select-option>
          <a-select-option value="Admin">Admin</a-select-option>
          <a-select-option value="User">User Admin</a-select-option>
          <a-select-option value="Standard">Standard</a-select-option>
          <a-select-option value="Manager">Manager</a-select-option>
        </a-select>
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-button class="btn primaryBtn">Add</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table
        :pagination="false"
        :columns="rolecolumns"
        :data-source="roledata"
        :scroll="{ x: 900 }"
      >
        <template #action>
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
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const rolecolumns = [
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const roledata = [
  {
    key: "1",
    role: "Billing Admin",
    actions: "",
  },
  {
    key: "2",
    role: "User Admin",
    actions: "",
  },
  {
    key: "3",
    role: "Standard",
    actions: "",
  },
];
export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    return {
      size: ref("large"),
      roledata,
      rolecolumns,
    };
  },
});
</script>
