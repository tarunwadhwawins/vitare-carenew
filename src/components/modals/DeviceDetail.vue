<template>
  <a-modal width="1000px" title="Device Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-table
          :columns="columns2"
          :data-source="data2"
          :pagination="false"
          @change="onChange"
        >
          <template #flags="{ text }">
            <span class="box" :class="text"></span>
            <span
              class="box"
              :class="(text = text.match(/yellowBgColor/g))"
              v-if="text.match(/yellowBgColor/g)"
            ></span>
          </template>
          <template #active>
            <a-switch v-model:checked="checked" />
          </template>
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
const columns2 = [
  {
    title: "Home Unit Type",
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
const data2 = [
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
    EditOutlined,
  },
  setup() {
    return {
      data2,
      columns2,
    };
  },
});
</script>
