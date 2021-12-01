<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div
        class="steps-content"
        v-if="steps[current].title == 'Personal Information'"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <div class="form-group">
              <label>First Name</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Last Name</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Designation</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label> Gender</label>
              <a-select
                ref="select"
                v-model="value1"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="lucy">Male</a-select-option>
                <a-select-option value="Yiminghe">Female</a-select-option>
                <a-select-option value="Yiminghe">Others</a-select-option>
              </a-select>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Email</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Phone No</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Specialization</label>
              <a-select
                ref="select"
                v-model="value1"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="lucy">Wellness</a-select-option>
                <a-select-option value="Yiminghe">Behavior</a-select-option>
              </a-select>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Network</label>
              <a-select
                ref="select"
                v-model="value1"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="lucy">In</a-select-option>
                <a-select-option value="Yiminghe">Out</a-select-option>
              </a-select>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="steps-content" v-if="steps[current].title == 'Contacts'">
        <a-row :gutter="24">
          <a-col :span="12">
            <div class="form-group">
              <label>First Name</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Last Name</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Email</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>Phone No</label>
              <a-input v-model="value" size="large" />
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
            <a-button class="btn primaryBtn">Add</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table :columns="columns1" :data-source="data1" :scroll="{ x: 900 }" />
          </a-col>
        </a-row>
      </div>
      <div class="steps-content" v-if="steps[current].title == 'Availability'">
        <a-row :gutter="24">
          <a-col :span="12">
            <div class="form-group">
              <label>Start Time</label>
              <a-select
                ref="select"
                v-model="value1"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="lucy">Choose start Time</a-select-option>
                <a-select-option value="Yiminghe">08:00 AM</a-select-option>
                <a-select-option value="Yiminghe">08:30 AM</a-select-option>
                <a-select-option value="Yiminghe">09:00 AM</a-select-option>
                <a-select-option value="Yiminghe">09:30 AM</a-select-option>
                <a-select-option value="Yiminghe">10:00 AM</a-select-option>
                <a-select-option value="Yiminghe">10:30 AM</a-select-option>
                <a-select-option value="Yiminghe">11:00 AM</a-select-option>
              </a-select>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-group">
              <label>End Time</label>
              <a-select
                ref="select"
                v-model="value1"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option value="lucy">Choose End Time</a-select-option>
                <a-select-option value="Yiminghe">02:00 PM</a-select-option>
                <a-select-option value="Yiminghe">02:30 PM</a-select-option>
                <a-select-option value="Yiminghe">03:00 PM</a-select-option>
                <a-select-option value="Yiminghe">03:30 PM</a-select-option>
                <a-select-option value="Yiminghe">04:00 PM</a-select-option>
                <a-select-option value="Yiminghe">04:30 PM</a-select-option>
                <a-select-option value="Yiminghe">05:00 PM</a-select-option>
                <a-select-option value="Yiminghe">05:30 PM</a-select-option>
              </a-select>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
            <a-button class="btn primaryBtn">Add</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table :columns="columns2" :data-source="data2" :scroll="{ x: 900 }" />
          </a-col>
        </a-row>
      </div>
      <div class="steps-content" v-if="steps[current].title == 'Roles'">
        <a-row :gutter="24">
          <a-col :span="24">
            <div class="form-group">
              <label>Role</label>
              <a-select
                v-model:value="value"
                mode="multiple"
                style="width: 100%"
                placeholder="Please select"
                :options="options"
                @change="handleChange"
              >
              </a-select>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="mb-24">
          <a-col :span="24">
            <a-button class="btn primaryBtn">Add</a-button>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table :columns="columns2" :data-source="data2" :scroll="{ x: 900 }" />
          </a-col>
        </a-row>
      </div>
      <div class="steps-content" v-if="steps[current].title == 'Documents'">
        <h3>Hello 5</h3>
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
</template>

<script>
import { ref } from "vue";
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
const columns2 = [
  {
    title: "Start Time",
    dataIndex: "start",
  },
  {
    title: "End Time",
    dataIndex: "end",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];
const data2 = [
  {
    key: "1",
    start: "08:00 AM",
    end: "	02:30 PM",
    actions: "",
  },
  {
    key: "2",
    start: "09:00 AM",
    end: "03:30 PM",
    actions: "",
  },
];
export default {
  setup() {
    const visible = ref(false);
    var current = ref(0);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };
    const next = () => {
      current.value++;
    };

    const prev = () => {
      current.value--;
    };

    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    
    return {
      visible,
      showModal,
      handleOk,
      current,
      data1,
      columns1,
      data2,
      columns2,
      steps: [
        {
          title: "Personal Information",
          content: "First-content",
        },
        {
          title: "Contacts",
          content: "Second-content",
        },
        {
          title: "Availability",
          content: "Second-content",
        },
        {
          title: "Roles",
          content: "Second-content",
        },
        {
          title: "Documents",
          content: "Last-content",
        },
      ],
      next,
      prev,
      value: ref(['Manger', 'Billing Admin' , 'User Admin']),
      handleChange,
      options: [...Array(3)].map((i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),

    };
  },
}
</script>
