<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      
      <!-- Personal Information -->
      <div class="steps-content" v-if="steps[current].title == 'Personal Information'">
        <PersonalInformation></PersonalInformation>
      </div>

      <!-- Contacts -->
      <div class="steps-content" v-if="steps[current].title == 'Contacts'">
        <ContactForm></ContactForm>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table :columns="columns1" :data-source="data1" :scroll="{ x: 900 }" />
          </a-col>
        </a-row>
      </div>

      <!-- Availability -->
      <div class="steps-content" v-if="steps[current].title == 'Availability'">
        <AvailabilityForm></AvailabilityForm>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table :columns="columns2" :data-source="data2" :scroll="{ x: 900 }" />
          </a-col>
        </a-row>
      </div>

      <!-- Roles -->
      <div class="steps-content" v-if="steps[current].title == 'Roles'">
        <RolesForm></RolesForm>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-table :columns="columns2" :data-source="data2" :scroll="{ x: 900 }" />
          </a-col>
        </a-row>
      </div>

      <!-- Documents -->
      <div class="steps-content" v-if="steps[current].title == 'Documents'">
        <DocumentsForm></DocumentsForm>
      </div>

      <div class="steps-action">
        <a-button v-if="current > 0" style="margin-right: 8px" @click="prev"
          >Previous</a-button
        >
        <a-button v-if="current < steps.length - 1" type="primary" @click.prevent="next">Next</a-button>
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
import PersonalInformation from "@/components/care-coordinator/forms/PersonalInformation";
import ContactForm from "@/components/care-coordinator/forms/ContactForm";
import AvailabilityForm from "@/components/care-coordinator/forms/AvailabilityForm";
import RolesForm from "@/components/care-coordinator/forms/RolesForm";
import DocumentsForm from "@/components/care-coordinator/forms/DocumentsForm";
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
  components: {
    PersonalInformation,
    ContactForm,
    AvailabilityForm,
    RolesForm,
    DocumentsForm,
  },
  methods: {
    addCareCoordinator() {
    }
  },
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

    // Submit Form
  },
}
</script>
