<template>
  <a-row :gutter="24">
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Provider</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="a">Provider 1</a-select-option>
          <a-select-option value="b">Provider 2</a-select-option>
          <a-select-option value="c">Provider 3</a-select-option>
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
        :columns="columns4"
        :data-source="data4"
        :scroll="{ x: 900 }"
      >
        <template #action>
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
import { defineComponent, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
const columns4 = [
  {
    title: "Provider Name",
    dataIndex: "name",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data4 = [
  {
    key: "1",
    name: "Provider 1",

    actions: "",
  },
  {
    key: "2",
    name: "Provider 2",
    actions: "",
  },
];
export default defineComponent({
  components: {
    DeleteOutlined,
  },
  setup() {
    return {
      size: ref("large"),
      data4,
      columns4,
    };
  },
});
</script>
