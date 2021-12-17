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
                  Manage Programs
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add New Program</a-button
                    >
                  </div>
                </h2>
              </a-col>
               <a-col :span="12">
              <a-input-search
                v-model:value="inputvalue"
                placeholder="Search . . ."
                enter-button="Search"
                size="large"
                @search="onSearch"
                class="mb-24"
              />
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
    <a-modal v-model:visible="visible" title="Add New Program" @ok="handleOk">
      <a-row :gutter="24">
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Choose Programs</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Description</label>
            <a-textarea v-model:value="value2" placeholder="Message" allow-clear />
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Active/Inactive</label>
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
    title: "Program Name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: {
      compare: (a, b) => a.description - b.description,
      multiple: 3,
    },
  },
  {
    title: "Active/Inactive",
    dataIndex: "active",
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
    name: "RPM - Remote Patient Monitor",
    description: "Lorem Ipsum",
    active: "",
    action: "",
  },
  {
    key: "2",
    name: "BHI - Behaviour Health Integration",
    description: "Lorem Ipsum",
    active: "",
    action: "",
  },
  {
    key: "3",
    name: "CCM - Chronic Care Management",
    description: "Lorem Ipsum",
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
