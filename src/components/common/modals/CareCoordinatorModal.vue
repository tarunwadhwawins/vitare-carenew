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
        <ContactForm :data="contactData"></ContactForm>
        <CoordinatorContactsTable @clicked="onClickViewContact($event)"></CoordinatorContactsTable>
      </div>

      <!-- Availability -->
      <div class="steps-content" v-if="steps[current].title == 'Availability'">
        <AvailabilityForm :data="availabilityData"></AvailabilityForm>
        <CoordinatorAvailabilityTable @clicked="onClickViewAvailability($event)"></CoordinatorAvailabilityTable>
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
import { ref } from "vue";
import PersonalInformation from "@/components/care-coordinator/forms/PersonalInformation";
import ContactForm from "@/components/care-coordinator/forms/ContactForm";
import AvailabilityForm from "@/components/care-coordinator/forms/AvailabilityForm";
import RolesForm from "@/components/care-coordinator/forms/RolesForm";
import DocumentsForm from "@/components/care-coordinator/forms/DocumentsForm";
import CoordinatorContactsTable from "@/components/care-coordinator/tables/CoordinatorContactsTable";
import CoordinatorAvailabilityTable from "@/components/care-coordinator/tables/CoordinatorAvailabilityTable";
import CoordinatorRolesTable from "@/components/care-coordinator/tables/CoordinatorRolesTable";
import store from "@/store/index";

export default {
  data() {
    return {
      rowId: '',
    }
  },
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
  setup() {
    const contactData = ref()
    const availabilityData = ref()
    const roleData = ref()
    const onClickViewContact = (rowId) => {
      let data = {
        'carecoordinatorId': JSON.parse(localStorage.getItem('coordinatorId')),
        'contactId': rowId,
      }
      store.dispatch("getCoordinatorContactDetails", data)
      .then((res) => {
        contactData.value = res.data.data;
      },
      (error) => {
        console.log(error)
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    }
    const onClickViewAvailability = (rowId) => {
      let data = {
        'carecoordinatorId': JSON.parse(localStorage.getItem('coordinatorId')),
        'availabilityId': rowId,
      }
      store.dispatch("getCoordinatorAvailabilityDetails", data)
      .then((res) => {
        availabilityData.value = res.data.data;
      },
      (error) => {
        console.log(error)
        this.message = (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString();
      });
    }
    const visible = ref(false);
    var current = ref(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    return {
      visible,
      onClickViewContact,
      onClickViewAvailability,
      contactData,
      availabilityData,
      roleData,
      current,
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
      options: [...Array(3)].map((i) => ({
        value: (i + 10).toString(36) + (i + 1),
      })),
    };

    // Submit Form
  },
}
</script>
