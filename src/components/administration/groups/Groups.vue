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
                  Groups
                  <div class="commonBtn">
                    <router-link to="/create-group">
                      <a-button class="btn primaryBtn">Create Group</a-button>
                    </router-link>
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
              <a-col :span="24" class="mt-25">
                <a-table
                  :columns="columns"
                  :data-source="data"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #actions>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Add Staff</span>
                      </template>
                      <a class="icons" @click="showModal"><PlusOutlined /></a>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Permission</span>
                      </template>
                      <a class="icons" @click="showModal"><ToolOutlined /></a>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Edit</span>
                      </template>
                      <a class="icons" @click="showModal"><EditOutlined /></a>
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
    <CreateGroup v-model:visible="visible" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import CreateGroup from "@/components/modals/CreateGroup";
import { defineComponent, ref } from "vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ToolOutlined
} from "@ant-design/icons-vue";
const columns = [
  {
    title: "Group",
    dataIndex: "group",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
  },
  {
    title: "Created Date",
    dataIndex: "created",
  },
  {
    title: "Total Member",
    dataIndex: "total",
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
    group: "Group One",
    created: "Feb 20, 2022",
    total: "5",
    status: "",
    action: "",
  },
  {
    key: "2",
    group: "Group Two",
    staff: "Steve Smith, Robert Henry",
    created: "Feb 23, 2022",
    total: "4",
    status: "",
    action: "",
  },
  {
    key: "3",
    group: "Group Three",
    created: "Feb 25, 2022",
    total: "8",
    status: "",
    action: "",
  },
  {
    key: "4",
    group: "Group Four",
    created: "Feb 20, 2022",
    total: "5",
    status: "",
    action: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    CreateGroup,
    PlusOutlined,
    ToolOutlined
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
