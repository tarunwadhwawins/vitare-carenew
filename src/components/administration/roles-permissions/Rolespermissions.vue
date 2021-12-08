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
                  Roles & Permissions
                  <div class="commonBtn">
                    <a-button class="btn primaryBtn" @click="showModal"
                      >Add Role</a-button
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
                  <template #active>
                    <a-switch v-model:checked="checked" />
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
      max-width="900px"
      width="80%"
      title="Create New Role"
      @ok="handleOk"
      :footer="null"
    >
      <a-row :gutter="24">
        <a-col :span="24">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content" v-if="steps[current].title == 'Select Role'">
            <a-row :gutter="24">
              <a-col :sm="8" :xs="24">
                <div class="roles">
                  <h4>Select a Role</h4>
                  <div class="radioInput">
                    <a-radio v-model:checked="checked">Admin</a-radio>
                  </div>
                  <div class="radioInput">
                    <a-radio v-model:checked="checked">Manager</a-radio>
                  </div>
                  <div class="radioInput">
                    <a-radio v-model:checked="checked">User Admin</a-radio>
                  </div>
                  <div class="radioInput">
                    <a-radio v-model:checked="checked">Billing Admin</a-radio>
                  </div>
                </div>
              </a-col>
              <a-col :sm="16" :xs="24">
                <div class="description">
                  <h4>Description</h4>
                  <p>Full system access</p>
                  <a-divider />
                </div>
                <div class="description">
                  <h4>Apps Access</h4>
                  <p>Desktop App</p>
                  <p>Mobile App</p>
                  <p>Third Party App</p>
                  <a-divider />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Describe Role'">
            <a-row :gutter="24">
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Name</label>
                  <a-input v-model="value" size="large" />
                </div>
              </a-col>
              <a-col :sm="24" :xs="24">
                <div class="form-group">
                  <label>Description</label>
                  <a-textarea
                    v-model:value="value2"
                    placeholder="Descriptiom"
                    allow-clear
                  />
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-content" v-if="steps[current].title == 'Permissions'">
            <a-row :gutter="24">
              <a-col :sm="24" :xs="24">
                <div class="roles">
                  <h4><strong>Select Permissions</strong></h4>
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">General</a-checkbox>
                    <a-divider />
                  </div>
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">Order</a-checkbox>
                  </div>
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">Billing</a-checkbox>
                  </div>
                  <a-divider class="transparent" />
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">App Access</a-checkbox>
                    <a-divider />
                  </div>
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">Desktop App</a-checkbox>
                  </div>
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">Mobile App</a-checkbox>
                  </div>
                  <div class="radioInput">
                    <a-checkbox v-model:checked="checked">Third Party App</a-checkbox>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="steps-action">
            <a-button v-if="current > 0" style="margin-right: 8px" @click="prev"
              >Previous</a-button
            >
            <a-button v-if="current < steps.length - 1" type="primary" @click="next"
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
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
const columns = [
  {
    title: "Role Name",
    dataIndex: "rolename",
    sorter: {
      compare: (a, b) => a.rolename - b.rolename,
      multiple: 3,
    },
  },
  {
    title: "Type of Role ",
    dataIndex: "role",
    sorter: {
      compare: (a, b) => a.role - b.role,
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
    rolename: "Billing Admin",
    role: "Predefined",
    description: "Full System Access",
    active: "",
    action: "",
  },
  {
    key: "2",
    rolename: "Manager",
    role: "Predefined",
    description: "Full System Access",
    active: "",
    action: "",
  },
  {
    key: "3",
    rolename: "User Admin",
    role: "Predefined",
    description: "Full System Access",
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
    const checked = ref(false);

    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const current = ref(0);

    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    return {
      columns,
      data,
      checked,

      visible,
      showModal,
      handleOk,
      current,
      steps: [
        {
          title: "Select Role",
          content: "First-content",
        },
        {
          title: "Describe Role",
          content: "Second-content",
        },
        {
          title: "Permissions",
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
