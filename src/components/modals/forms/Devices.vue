<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Device Type</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Blood Pressure</a-select-option>
          <a-select-option value="Yimdinghe">Oxymeter</a-select-option>
          <a-select-option value="Yiminghe">Glucose</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Model No</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Serial No</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>MAC Address</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Device Time</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Server Time</label>
        <a-input v-model="value" size="large" />
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
        :columns="columns5"
        :data-source="data5"
        :pagination="false"
        :scroll="{ x: 900 }"
      >
        <template #active>
          <a-switch v-model:checked="checked" />
        </template>
        <template #action>
          <a class="icons"><DeleteOutlined /></a>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
const columns5 = [
  {
    title: "Device Type",
    dataIndex: "home",
  },
  {
    title: "Model No",
    dataIndex: "model",
  },
  {
    title: "Serial No",
    dataIndex: "serial",
  },
  {
    title: "MAC Address",
    dataIndex: "mac",
  },
  {
    title: "Device Time",
    dataIndex: "device",
  },
  {
    title: "Server Time",
    dataIndex: "server",
  },
  {
    title: "Active/Inactive",
    dataIndex: "active",
    slots: {
      customRender: "active",
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

const data5 = [
  {
    key: "1",
    home: "Blood Pressure",
    model: "M-101",
    serial: "S-101",
    mac: "Lorem",
    device: "11:00 Am",
    server: "11:30 Am",
    active: "",
    action: "",
  },
  {
    key: "2",
    home: "Oxymeter",
    model: "M-102",
    serial: "S-102",
    mac: "Lorem",
    device: "10:15 Am",
    server: "10:30 Am",
    active: "",
    action: "",
  },
];
export default defineComponent({
  components: {
    DeleteOutlined,
  },
  setup() {
    return {
      data5,
      columns5,
      size: ref("large"),
    };
  },
});
</script>
