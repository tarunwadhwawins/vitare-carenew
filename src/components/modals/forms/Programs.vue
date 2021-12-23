<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Programs</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Choose Program</a-select-option>
          <a-select-option value="Yiminghe">RPM</a-select-option>
          <a-select-option value="Yiminghe">Mental Wellness</a-select-option>
          <a-select-option value="Yiminghe">CCM Chronic Care Management</a-select-option>
          <a-select-option value="Yiminghe"
            >TCM- Transitional Care Managment</a-select-option
          >
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="6" :xs="24">
      <div class="form-group">
        <label>Onboarding scheduled date</label>
        <a-date-picker v-model:value="value1" :size="size" style="width: 100%" />
      </div>
    </a-col>
    <a-col :md="8" :sm="6" :xs="24">
      <div class="form-group">
        <label>Discharge Date</label>
        <a-date-picker v-model:value="value2" :size="size" style="width: 100%" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Status</label>
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" :value="1">Active</a-radio>
        </a-radio-group>
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" :value="2">Inactive</a-radio>
        </a-radio-group>
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
        :columns="columns1"
        :data-source="data1"
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
               
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { EditOutlined } from "@ant-design/icons-vue";
const columns1 = [
  {
    title: "Program Name",
    dataIndex: "program",
  },
  {
    title: "Onboarding scheduled date",
    dataIndex: "Onboarding",
  },
  {
    title: "Start Date",
    dataIndex: "start",
  },
  {
    title: "End Date",
    dataIndex: "end",
  },
  {
    title: "Discharge Date",
    dataIndex: "discharge",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data1 = [
  {
    key: "1",
    program: "RPM",
    Onboarding: "Nov 12, 2021",
    start: "Nov 13, 2021",
    end: "Dec 20, 2021",
    discharge: "Dec 20, 2021",
    status: "Active",
    actions: "",
  },
  {
    key: "2",
    program: "TCM- Transitional Care Managment",
    Onboarding: "Dec 21, 2021",
    start: "Dec 28, 2021",
    end: "Jan 10, 2022",
    discharge: "Jan 11, 2022",
    status: "InActive",
    actions: "",
  },
];
export default defineComponent({
  components: {
    EditOutlined,
  },
  setup() {
    // const radioStyle = reactive({});
    const value = ref("1");
    return {
      data1,
      columns1,
      // radioStyle,
      value,
      size: ref("large"),
    };
  },
});
</script>
