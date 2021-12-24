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
                  Global Codes
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add Global Codes</a-button
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
                </a-table>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--modals-->
    <a-modal
      v-model:visible="visible"
      max-width="1140px"
      width="100%"
      title="Add Global Codes"
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Category</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Choose Category</a-select-option>
              <a-select-option value="Yiminghe"
                >AppointmentType</a-select-option
              >
              <a-select-option value="Yiminghe"
                >Specialization
              </a-select-option>
              <a-select-option value="Yiminghe"
                >Communication Category</a-select-option
              >
              <a-select-option value="Yiminghe"
                >Communication Status</a-select-option
              >
              <a-select-option value="Yiminghe">Task Status</a-select-option>
              <a-select-option value="Yiminghe">Task Priority</a-select-option>
              <a-select-option value="Yiminghe">Relationship</a-select-option>
              <a-select-option value="Yiminghe">Gender</a-select-option>
              <a-select-option value="Yiminghe"
                >Health Conditions</a-select-option
              >
              <a-select-option value="Yiminghe">Designation</a-select-option>
              <a-select-option value="Yiminghe">Document Type</a-select-option>
              <a-select-option value="Yiminghe">Insurance Type</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Code Name</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="8" :xs="24">
          <div class="form-group">
            <label>Data Type</label>
            <a-input v-model="value" size="large" />
          </div>
        </a-col>
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Description </label>
            <a-textarea
              v-model:value="value2"
              placeholder="Description"
              allow-clear
            />
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
    title: "Category",
    dataIndex: "category",
    sorter: {
      compare: (a, b) => a.category - b.category,
      multiple: 3,
    },
  },
  {
    title: "Codename",
    dataIndex: "codename",
    sorter: {
      compare: (a, b) => a.codename - b.codename,
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
    title: "Date Type",
    dataIndex: "date",
    sorter: {
      compare: (a, b) => a.date - b.date,
      multiple: 2,
    },
  },
  {
    title: "Used Count",
    dataIndex: "count",
    sorter: {
      compare: (a, b) => a.count - b.count,
      multiple: 1,
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
    category: "Specialization",
    codename: "A-101",
    description: "Lorem Ipsum",
    date: "Dec 06, 2021",
    count: "4",
    action: "",
  },
  {
    key: "2",
    category: "Relationship",
    codename: "A-102",
    description: "Lorem Ipsum",
    date: "Dec 08, 2021",
    count: "3",
    action: "",
  },
  {
    key: "3",
    category: "Communication Status",
    codename: "A-103",
    description: "Lorem Ipsum",
    date: "Dec 11, 2021",
    count: "2",
    action: "",
  },
  {
    key: "4",
    category: "Condition",
    codename: "A-104",
    description: "Abdominal aortic aneurysm - ",
    date: "Dec 11, 2021",
    count: "2",
    action: "",
  },
  {
    key: "5",
    category: "Condition",
    codename: "A-105",
    description: "Acquired absense of foot",
    date: "Dec 11, 2021",
    count: "2",
    action: "",
  },
  {
    key: "6",
    category: "Condition",
    codename: "A-106",
    description: "ADRD - Aizheimer's Disease and Related Dementies ",
    date: "Dec 11, 2021",
    count: "2",
    action: "",
  },
  {
    key: "7",
    category: "Condition",
    codename: "A-107",
    description: "Anemina ",
    date: "Dec 11, 2021",
    count: "2",
    action: "",
  },
  {
    key: "8",
    category: "Condition",
    codename: "A-108",
    description: "Anxiety ",
    date: "Dec 11, 2021",
    count: "2",
    action: "",
  },
  {
    key: "9",
    category: "Condition",
    codename: "A-109",
    description: "Asymptomatic Menopausal State ",
    date: "Dec 11, 2021",
    count: "2",
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
     const handleChange2 = (value) => {
      console.log(`selected ${value}`);
    };

    const searchoptions = ref([
      {
        value: "Specialization",
        label: "Specialization",
      },
      {
        value: "Relationship",
        label: "Relationship",
      },
      {
        value: "Communication Status",
        label: "Communication Status",
      },
      {
        value: "Condition",
        label: "Condition",
      },
      {
        value: "Acquired absense of foot",
        label: "Acquired absense of foot",
      },
      {
        value: "Anemina",
        label: "Anemina",
      },
      {
        value: "Shared",
        label: "Shared",
      },
      {
        value: "Anxiety",
        label: "Anxiety",
      },
      {
        value: "A-101",
        label: "A-101",
      },
      {
        value: "A-102",
        label: "A-102",
      },
      {
        value: "A-103",
        label: "A-103",
      },
      {
        value: "A-104",
        label: "A-104",
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
