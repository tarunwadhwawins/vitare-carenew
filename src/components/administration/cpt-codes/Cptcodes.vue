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
                  CPT Codes
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add CPT Codes</a-button
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
    <a-modal
      v-model:visible="visible"
      max-width="1140px"
      width="100%"
      title="Add CPT Codes"
      @ok="handleOk"
    >
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>Service Type</label>
            <a-select
              ref="select"
              v-model="value1"
              style="width: 100%"
              size="large"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="lucy">Choose Service</a-select-option>
              <a-select-option value="Yiminghe">Service Type 1</a-select-option>
              <a-select-option value="Yiminghe">Service Type 2 </a-select-option>
              <a-select-option value="Yiminghe">Service Type 3</a-select-option>
              <a-select-option value="Yiminghe">Service Type 4</a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <label>CPT Code</label>
            <a-input v-model="value" size="large" placeholder="CPT Code" />
          </div>
        </a-col>
        <a-col :sm="6" :xs="24">
          <div class="form-group">
            <label>Billing Amount</label>
            <a-input v-model="value" size="large" placeholder="$" />
          </div>
        </a-col>
        <a-col :sm="6" :xs="24">
          <div class="form-group">
            <label>Duration </label>
            <div class="duration">
              <a-select
                ref="select"
                v-model="value1"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="lucy">Choose Duration</a-select-option>
                <a-select-option value="Yiminghe">10 </a-select-option>
                <a-select-option value="Yiminghe">20 </a-select-option>
                <a-select-option value="Yiminghe">30 </a-select-option>
                <a-select-option value="Yiminghe">40 </a-select-option>
                <a-select-option value="Yiminghe">50 </a-select-option>
                <a-select-option value="Yiminghe">60 </a-select-option>
              </a-select>
              <span>Mins </span>
            </div>
          </div>
        </a-col>
        <a-col :sm="24" :xs="24">
          <div class="form-group">
            <label>Description </label>
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
import { ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Cpt Code",
    dataIndex: "cpt",
    sorter: {
      compare: (a, b) => a.cpt - b.cpt,
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
    title: "Billing Amount",
    dataIndex: "billing",
    sorter: {
      compare: (a, b) => a.billing - b.billing,
      multiple: 2,
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
    key: 1,
    cpt: "99453",
    description: "Lorem Ipsum",
    billing: "$150",
    active: "",
    action: "",
  },
  {
    key: 2,
    cpt: "99454",
    description: "Lorem Ipsum",
    billing: "$200",
    active: "",
    action: "",
  },
  {
    key: 3,
    cpt: "99457",
    description: "Lorem Ipsum",
    billing: "$250",
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
