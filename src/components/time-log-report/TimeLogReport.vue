<template>
  <div>
    <!---->
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Header />
      </a-layout-header>
      <a-layout>
        <Sidebar />
        <a-layout-content>
          <div class="common-bg">
            <a-row>
              <a-col :span="24">
                <h2 class="pageTittle">Audit Time Log</h2>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :sm="10" :xs="24">
                <div class="form-group">
                  <label>Filter By</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                    placeholder="Select one"
                  >
                    <a-select-option value="lucy">Patient</a-select-option>
                    <a-select-option value="lucy">Staff</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :sm="10" :xs="24">
                <div class="form-group">
                  <label>Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="4" :xs="24">
                <div class="text-right mt-28">
                  <a-button class="btn primaryBtn" @click="showModal"
                    >View</a-button
                  >
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :sm="24" :xs="24">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #staff="text">
                    <router-link to="corrdinator-summary">{{
                      text.text
                    }}</router-link>
                  </template>
                  <template #patient="text">
                    <router-link to="patients-summary">{{
                      text.text
                    }}</router-link>
                  </template>
                  <template #flag="{ text }">
                    <span>
                      <img
                        class="reportFlag"
                        src="../../assets/images/flag-orange.svg"
                        alt="image"
                    /></span>
                    <span v-if="text.match(/two/g)"
                      ><img
                        class="reportFlag"
                        src="../../assets/images/flag-red.svg"
                        alt="image"
                    /></span>
                  </template>
                  <template #actions>
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
                  <template #active="key">
                    <a-switch v-model:checked="checked[key.record.key]" />
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from "../layout/sidebar/Sidebar";
import Header from "../layout/header/Header";
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Staff",
    dataIndex: "staff",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "staff",
    },
  },
  {
    title: "Patient",
    dataIndex: "patient",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "patient",
    },
  },
  {
    title: "Time (MM:SS)",
    dataIndex: "time",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Flag ",
    dataIndex: "flag",
    slots: {
      customRender: "flag",
    },
  },
  {
    title: "Notes ",
    dataIndex: "notes",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
const data = [
  {
    key: "1",
    staff: "Jane Doe",
    patient: "Steve Smith",
    time: "20:15",
    flag: "one",
    notes: "",
    action: "",
  },
  {
    key: "2",
    staff: "Jane Doe",
    patient: "Joseph Spouse",
    time: "18:20",
    flag: "two",
    notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    action: "",
  },
  {
    key: "3",
    staff: "Robert Henry",
    patient: "Jane Doe",
    time: "15:20",
    flag: "one",
    notes: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    action: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
  },

  setup() {
    const checked = ref([false]);

    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    return {
      columns,
      data,
      checked,

      visible,
      showModal,
      handleOk,
      value1: ref(),
      size: ref("large"),
    };
  },
};
</script>
<style lang="scss">
</style>