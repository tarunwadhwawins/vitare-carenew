<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.clinicalData.medicalHistory')}}</h2>
      </div>
    </a-col>
    <a-col :span="24">
      <div class="form-group">
        <label>{{$t('patient.clinicalData.medicalHistory')}}</label>
        <a-textarea v-model="value2" allow-clear />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-button class="btn primaryBtn">{{$t('global.add')}}</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-table
        :columns="columns2"
        :data-source="data2"
        :pagination="false"
        :scroll="{ x: 900 }"
      >
        <template #action>
         
          <a-tooltip placement="bottom">
                    <template #title>
                      <span>{{$t('global.edit')}}</span>
                    </template>
                    <a class="icons"><EditOutlined /></a>
                  </a-tooltip>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>{{$t('global.delete')}}</span>
                    </template>
                    <a class="icons"> <DeleteOutlined /></a>
                  </a-tooltip>
        </template>
      </a-table>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <div class="formHeading">
        <h2>{{$t('patient.clinicalData.medication')}}</h2>
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('patient.clinicalData.medicine')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label> {{$t('patient.clinicalData.frequency')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-button class="btn primaryBtn">{{$t('global.add')}}</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-table
        :columns="columns3"
        :data-source="data3"
        :pagination="false"
        :scroll="{ x: 900 }"
      >
        <template #action>
         <a-tooltip placement="bottom">
                    <template #title>
                      <span>{{$t('global.edit')}}</span>
                    </template>
                    <a class="icons"><EditOutlined /></a>
                  </a-tooltip>
                  <a-tooltip placement="bottom">
                    <template #title>
                      <span>{{$t('global.delete')}}</span>
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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const columns2 = [
  {
    title: "History",
    dataIndex: "history",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data2 = [
  {
    key: "1",
    history: "Program 1",
    actions: "",
  },
  {
    key: "2",
    history: "Program 2",
    actions: "",
  },
];
const columns3 = [
  {
    title: "Medication List",
    dataIndex: "program",
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
const data3 = [
  {
    key: "1",
    program: "Program 1",
    start: "Nov 12, 2021",
    end: "Dec 20, 2021",
    status: "Active",
    actions: "",
  },
  {
    key: "2",
    program: "Program 1",
    start: "Nov 22, 2021",
    end: "Dec 28, 2021",
    status: "InActive",
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
      data2,
      columns2,
      data3,
      columns3,
      size: ref("large"),
    };
  },
});
</script>
