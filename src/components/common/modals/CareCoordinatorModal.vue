<template>
  <a-row :gutter="24">
    <a-col :span="24">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      
      <!-- Personal Information -->
      <div class="steps-content" v-if="steps[current].title == 'Personal Information'">
        <PersonalInformation ref="personalInformationForm"></PersonalInformation>
      </div>

      <!-- Contacts -->
      <div class="steps-content" v-if="steps[current].title == 'Contacts'">
        <ContactForm></ContactForm>
        <CoordinatorContactsTable></CoordinatorContactsTable>
      </div>

      <!-- Availability -->
      <div class="steps-content" v-if="steps[current].title == 'Availability'">
        <AvailabilityForm></AvailabilityForm>
        <CoordinatorAvailabilityTable></CoordinatorAvailabilityTable>
      </div>

      <!-- Roles -->
      <div class="steps-content" v-if="steps[current].title == 'Roles'">
        <RolesForm></RolesForm>
        <CoordinatorRolesTable></CoordinatorRolesTable>
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
import { ref, onMounted } from "vue";
import PersonalInformation from "@/components/care-coordinator/forms/PersonalInformation";
import ContactForm from "@/components/care-coordinator/forms/ContactForm";
import AvailabilityForm from "@/components/care-coordinator/forms/AvailabilityForm";
import RolesForm from "@/components/care-coordinator/forms/RolesForm";
import DocumentsForm from "@/components/care-coordinator/forms/DocumentsForm";
import CoordinatorContactsTable from "@/components/common/tables/CoordinatorContactsTable";
import CoordinatorAvailabilityTable from "@/components/common/tables/CoordinatorAvailabilityTable";
import CoordinatorRolesTable from "@/components/common/tables/CoordinatorRolesTable";
const availabilityColumns = [
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
const availabilityData = [
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
    CoordinatorContactsTable,
    CoordinatorAvailabilityTable,
    CoordinatorRolesTable,
    ContactForm,
    AvailabilityForm,
    RolesForm,
    DocumentsForm,
  },
  // created() {
  //   return this.$store
  // },
  // mounted() {
  //   console.log(this.$refs);
  //   this.$refs.personalInformationForm.addCareCoordinator()
  // },
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
      // let personalData = JSON.parse(localStorage.getItem('personalData'));
      // console.log(personalData);
      // if(personalData) {
        current.value++;
      // }
    };
    const prev = () => {
      localStorage.setItem('is_update', 'true');
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
      availabilityData,
      availabilityColumns,
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
