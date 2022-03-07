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
                  Questionnaire Template
                  <div class="commonBtn">
                    <router-link to="/questionnaire-create-template">
                    <a-button class="btn primaryBtn"
                      >Create New Template</a-button
                    >
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
                  <template #question="text">
                    <router-link to="question-template-detail">{{
                      text.text
                    }}</router-link>
                  </template>
                  <template #actions>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Edit</span>
                      </template>
                      <a class="icons"  @click="showModal"><EditOutlined /></a>
                    </a-tooltip>
                    <a-tooltip placement="bottom">
                      <template #title>
                        <span>Clone</span>
                      </template>
                      <a class="icons"><CopyOutlined /></a>
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
    <CreateTemplate v-model:visible="visible2" @ok="handleOk" />
    <!---->
  </div>
</template>

<script>
import Header from "@/components/administration/layout/header/Header";
import Sidebar from "@/components/administration/layout/sidebar/Sidebar";
import CreateTemplate from "@/components/modals/CreateTemplate";
import { defineComponent, ref } from "vue";
import {
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
const columns = [
  {
    title: "Questionnaire Template",
    dataIndex: "question",
    sorter: {
      compare: (a, b) => a.template - b.template,
      multiple: 3,
    },
    slots: {
      customRender: "question",
    },
  },
  {
    title: "Type",
    dataIndex: "type",
  
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
    question: "Physician Orders for Life-Sustaining Treatment (POLST)",
    type: "Intake",
    action: "",
  },
  {
    key: "2",
    question: "Physician's Report For Community Care Facilities",
    type: "Screening",
    action: "",
  },
  {
    key: "3",
    question:
      "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
    type: "Assessment",
    action: "",
  },
];
export default {
  components: {
    Header,
    Sidebar,
    DeleteOutlined,
    EditOutlined,
    CopyOutlined,
    CreateTemplate,
  },

  setup() {
    const checked = ref([false]);

    const visible2 = ref(false);
    const showModal = () => {
      visible2.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible2.value = false;
    };
    const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([
      {
        value:
          "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
        label:
          "Physician's Report For Residential Care Facilities For The Elderly (RCFE)",
      },
      {
        value: "Physician's Report For Community Care Facilities",
        label: "Physician's Report For Community Care Facilities",
      },
      {
        value: "Physician Orders for Life-Sustaining Treatment (POLST)",
        label: "Physician Orders for Life-Sustaining Treatment (POLST)",
      },
    ]);
    return {
      columns,
      data,
      checked,

      visible2,
      showModal,
      handleOk,
      handleChange2,
      searchoptions,
      size: ref([]),
    };
  },
};
</script>
