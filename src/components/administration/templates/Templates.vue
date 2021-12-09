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
                <h2 class="pageTittle">
                  Templates
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add New Template</a-button
                    >
                  </div>
                </h2>
              </a-col>
              <a-col :span="24">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #actions>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"> <DeleteOutlined /></a>
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
    <!--modals-->
    <a-modal v-model:visible="visible" title="Add New Template" @ok="handleOk">
      <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Template Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>

        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Status</label>
            <a-switch v-model:checked="checked" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Template",
    dataIndex: "template",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    slots: {
      customRender: "active",
    },
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
    template: "Shared text",
    active: "",
    action: "",
  },
  {
    key: "2",
    template: "Interactive",
    active: "",
    action: "",
  },
  {
    key: "3",
    template: "Shared",
    active: "",
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
    };
  },
};
</script>
