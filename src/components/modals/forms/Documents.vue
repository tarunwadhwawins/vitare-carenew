<template>
  <a-row :gutter="24">
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Name</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>Document</label>
        <a-input v-model="value" size="large" type="file" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label> Type</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Id Proof</a-select-option>
          <a-select-option value="Yiminghe">Clinical</a-select-option>
          <a-select-option value="Yiminghe">Insurance</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label> Tags</label>
        <a-select
          v-model:value="selectedItemsForTag"
          mode="multiple"
          size="large"
          placeholder="Please Select Tags"
          style="width: 100%"
          :options="filteredOptionsForTag.map((item) => ({ value: item }))"
        />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-button class="btn primaryBtn">Add</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-table
        :columns="columns4"
        :data-source="data4"
        :pagination="false"
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
import { defineComponent, ref, computed } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
const columns4 = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Document",
    dataIndex: "document",
  },
  {
    title: "	Type",
    dataIndex: "type",
  },
  {
    title: "	Tags",
    dataIndex: "tags",
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
    name: "Document 1",
    document: "abc.pdf",
    type: "Voter Id",
    tags: "	Voter Id",
    actions: "",
  },
  {
    key: "2",
    name: "Document 1",
    document: "abc.pdf",
    type: "Voter Id",
    tags: "	Voter Id",
    actions: "",
  },
];
export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );

    return {
      data4,
      columns4,
      filteredOptionsForTag,
      selectedItemsForTag,
    };
  },
});
</script>
