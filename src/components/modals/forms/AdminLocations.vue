<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Location Name</label>
        <a-input v-model="value" size="large" placeholder="Location Name" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>No. of Locations</label>
        <a-input v-model="value" size="large" placeholder="No. of Locations" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Location Address</label>
        <a-input v-model="value" size="large" placeholder="Location Address" />
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
        <a-input v-model="value" size="large" placeholder="Phone Number" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Email Address</label>
        <a-input v-model="value" size="large" placeholder="Email Address" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Website</label>
        <a-input v-model="value" size="large" placeholder="Website" />
      </div>
    </a-col>
    <a-col :md="24" :sm="24" :xs="24">
      <a-table  rowKey="id"
        :columns="columns2"
        :data-source="data2"
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
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent, ref } from "vue";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons-vue";
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
export default defineComponent({
  components: {
    DeleteOutlined,
    EditOutlined,
  },
  setup() {
    return {
      size: ref("large"),
      data2,
      columns2,
    };
  },
});
</script>
