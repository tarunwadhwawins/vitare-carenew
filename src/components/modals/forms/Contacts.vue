<template>
  <a-row :gutter="24">
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.firstName')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.lastName')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.email')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :sm="12" :xs="24">
      <div class="form-group">
        <label>{{$t('global.phoneNo')}}</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="mb-24">
    <a-col :span="24">
      <a-button class="btn primaryBtn">{{$t('global.add')}}</a-button>
    </a-col>
  </a-row>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-table
        :pagination="false"
        :columns="columns1"
        :data-source="data1"
        :scroll="{ x: 900 }"
      >
        <template #action>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('global.edit')}}</span>
            </template>
            <a class="icons"><EditOutlined /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons"> <DeleteOutlined /></a>
          </a-tooltip>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const columns1 = [
  {
    title: "First Name",
    dataIndex: "first",
  },
  {
    title: "Last Name",
    dataIndex: "last",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone No",
    dataIndex: "phone",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: {
      customRender: "action",
    },
  },
];
const data1 = [
  {
    key: "1",
    first: "Jane",
    last: "Doe",
    email: "john@aa.com",
    phone: "999-2222-111",
    actions: "In",
  },
  {
    key: "2",
    first: "Steve",
    last: "	Smith",
    email: "steve@smith.com",
    phone: "999-2222-111",
    actions: "In",
  },
];
export default defineComponent({
  components: {
    EditOutlined,
    DeleteOutlined,
  },
  setup() {
    return {
      size: ref("large"),
      data1,
      columns1,
    };
  },
});
</script>
