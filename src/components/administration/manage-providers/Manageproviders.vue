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
                  Providers
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add New Provider</a-button
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
            </a-row>

            <a-row :gutter="24">
              <a-col :span="24">
                <a-table
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
                  <template #first="text">
                    <router-link to="provider-summary">{{ text.text }}</router-link>
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <AdminProvidersModal v-model:visible="visible" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import AdminProvidersModal from "@/components/modals/AdminProvidersModal";
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Provider Name",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
    slots: {
      customRender: "first",
    },
  },
  {
    title: "Provider Address",
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
    name: "Provider 1",
    description: "Lorem Ipsum",
    active: "",
    action: "",
  },
  {
    key: "2",
    name: "Provider 2",
    description: "Lorem Ipsum",
    active: "",
    action: "",
  },
  {
    key: "3",
    name: "Provider 3",
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
    AdminProvidersModal,
  },

  setup() {
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const checked = ref([false]);
<<<<<<< Updated upstream

    const current = ref(0);

    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );

    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([
      {
        value: "Provider 1",
        label: "Provider 1",
      },
      {
        value: "Provider 2",
        label: "Provider 2",
      },
      {
        value: "Provider 3",
        label: "Provider 3",
      },
    ]);

=======
>>>>>>> Stashed changes
    return {
      handleChange2,
      searchoptions,
      size: ref([]),
      visible,
      showModal,
      handleOk,
      data,
      columns,
      checked,
    };
  },
};
</script>
