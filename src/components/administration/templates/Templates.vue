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
              <a-col :span="12">
                <a-select
                  v-model:value="value2"
                  :size="size"
                  mode="tags"
                  style="width: 100%"
                  placeholder="Search . . ."
                  :options="searchoptions"
                  @change="handleChange2"
                >
                </a-select>
              </a-col>
              <a-col :span="12">
                <div class="text-right mb-24">
                  <a-button class="primaryBtn">Export to Excel</a-button>
                </div>
              </a-col>
              <a-col :span="24">
                <a-table  rowKey="id"
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
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
    <!--modals-->
    <AdminTemplates v-model:visible="visible" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminTemplates from "@/components/modals/AdminTemplates";
import { ref } from "vue";
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
    AdminTemplates,
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
    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([
      {
        value: "Shared text",
        label: "Shared text",
      },
      {
        value: "Interactive",
        label: "Interactive",
      },
      {
        value: "Shared",
        label: "Shared",
      },
    ]);
    return {
      columns,
      data,
      checked,

      visible,
      showModal,
      handleOk,
      handleChange2,
      searchoptions,
      size: ref([]),
    };
  },
};
</script>
