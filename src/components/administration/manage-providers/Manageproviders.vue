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
                <a-input-search
                  v-model:value="inputvalue"
                  placeholder="Search . . ."
                  enter-button="Search"
                  size="large"
                  @search="onSearch"
                  class="mb-24"
                />
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
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"> <DeleteOutlined /></a>
                  </template>
                  <template #active="key">
                    <a-switch v-model:checked="checked[key.record.key]" />
                  </template>
                  <template #first="text">
                    <router-link to="provider-summary">{{
                      text.text
                    }}</router-link>
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
      title="Add New Provider"
      @ok="handleOk"
      max-width="1040px"
      width="100%"
    >
      <a-row :gutter="24">
        <a-col :span="24">
          <a-steps :current="current">
            <a-step
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
            />
          </a-steps>
          <div class="steps-content" v-if="steps[current].title == 'Providers'">
            <a-row :gutter="24">
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Provider Name</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Provider Name"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Provider Address</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Provider Address"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Country</label>
                  <a-input v-model="value" size="large" placeholder="Country" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>State</label>
                  <a-input v-model="value" size="large" placeholder="State" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>City</label>
                  <a-input v-model="value" size="large" placeholder="City" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Zipcode</label>
                  <a-input v-model="value" size="large" placeholder="Zipcode" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Phone Number</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Phone Number"
                  />
                </div>
              </a-col>
              <a-col :md="16" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Tags</label>
                  <a-select
                    v-model:value="selectedItemsForTag"
                    mode="multiple"
                    size="large"
                    placeholder="Please Select Roles"
                    style="width: 100%"
                    :options="
                      filteredOptionsForTag.map((item) => ({ value: item }))
                    "
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Default Location</label>
                  <a-select
                    ref="select"
                    v-model="value1"
                    style="width: 100%"
                    size="large"
                    @focus="focus"
                    @change="handleChange"
                  >
                    <a-select-option value="lucy"
                      >Choose Location</a-select-option
                    >
                    <a-select-option value="Yiminghe"
                      >Location 1</a-select-option
                    >
                    <a-select-option value="Yiminghe"
                      >Location 2
                    </a-select-option>
                    <a-select-option value="Yiminghe"
                      >Location 3</a-select-option
                    >
                    <a-select-option value="Yiminghe"
                      >Location 4</a-select-option
                    >
                  </a-select>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Locations'">
            <a-row :gutter="24">
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Location Name</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Location Name"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>No. of Locations</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="No. of Locations"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Location Address</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Location Address"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>State</label>
                  <a-input v-model="value" size="large" placeholder="State" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>City</label>
                  <a-input v-model="value" size="large" placeholder="City" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Zipcode</label>
                  <a-input v-model="value" size="large" placeholder="Zipcode" />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Phone Number</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Phone Number"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Email Address</label>
                  <a-input
                    v-model="value"
                    size="large"
                    placeholder="Email Address"
                  />
                </div>
              </a-col>
              <a-col :md="8" :sm="12" :xs="24">
                <div class="form-group">
                  <label>Website</label>
                  <a-input v-model="value" size="large" placeholder="Website" />
                </div>
              </a-col>
              <a-col :md="24" :sm="24" :xs="24">
                <a-table
                  :columns="columns2"
                  :data-source="data2"
                  :scroll="{ x: 900 }"
                  @change="onChange"
                >
                  <template #actions>
                    <a class="icons"><EditOutlined /></a>
                    <a class="icons"> <DeleteOutlined /></a>
                  </template>
                </a-table>
              </a-col>
            </a-row>
          </div>
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev"
              >Previous</a-button
            >
            <a-button
              v-if="current < steps.length - 1"
              type="primary"
              @click="next"
              >Next</a-button
            >
            <a-button
              v-if="current == steps.length - 1"
              type="primary"
              @click="$message.success('Processing complete!')"
            >
              Done
            </a-button>
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
import { defineComponent, ref, computed } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
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

const columns2 = [
  {
    title: "Location Name",
    dataIndex: "locationname",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
  {
    title: "No. of Location",
    dataIndex: "nolocation",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "actions",
    },
  },
];
const data2 = [
  {
    key: "1",
    locationname: "Key Largo, FL",
    phone: "(224) 345-4422",
    nolocation: 3,
    address: "12529 State Road 535",
    action: "",
  },
  {
    key: "2",
    locationname: "Santa Rosa, MN",
    phone: "	(334) 424-4224",
    nolocation: 2,
    address: "1935-9940 Tortor. Street Santa Rosa",
    action: "",
  },
  {
    key: "3",
    locationname: "Key Largo, FL",
    phone: "	(334) 424-4224",
    nolocation: 3,
    address: "12529 State Road 535",
    action: "",
  },
  {
    key: "4",
    locationname: "Santa Rosa, MN",
    phone: "	(334) 424-4224",
    nolocation: 2,
    address: "1935-9940 Tortor. Street Santa Rosa",
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
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const checked = ref([false]);

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

    return {
      visible,
      showModal,
      handleOk,
      data,
      columns,
      data2,
      columns2,
      checked,
      filteredOptionsForTag,
      selectedItemsForTag,
      current,
      steps: [
        {
          title: "Providers",
          content: "First-content",
        },
        {
          title: "Locations",
          content: "Second-content",
        },
      ],
      next,
      prev,
    };
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  min-height: 200px;
  text-align: left;
  padding: 12px 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.steps-action {
  text-align: right;
}
</style>
