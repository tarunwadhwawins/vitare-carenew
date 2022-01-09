<template>
  <a-modal
    max-width="1140px"
    width="100%"
    :title="$t('careCoordinator.coordinatorsModal.addNewCoordinator')"
    centered
    :footer="null"
  >
    <a-row :gutter="24">
      <a-col :span="24">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content" v-if="steps[current].title == 'Personal Information'">
          <PersonalInformation />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Contacts'">
          <Contacts />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Availability'">
          <Availability />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Roles'">
          <Roles />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Documents'">
          <Documents />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Providers'">
          <Providers />
        </div>
        <div class="steps-action">
          <a-button v-if="current > 0" style="margin-right: 8px" @click="prev"
            >{{$t('global.previous')}}</a-button
          >
          <a-button v-if="current < steps.length - 1" type="primary" @click="next"
            >{{$t('global.next')}}</a-button
          >
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="$message.success('Processing complete!')"
          >
            {{$t('global.done')}}
          </a-button>
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { ref } from "vue";
import PersonalInformation from "@/components/modals/forms/PersonalInformation";
import Contacts from "@/components/modals/forms/Contacts";
import Availability from "@/components/modals/forms/Availability";
import Roles from "@/components/modals/forms/Roles";
import Documents from "@/components/modals/forms/Documents";
import Providers from "@/components/modals/forms/Providers";
export default {
  components: {
    PersonalInformation,
    Contacts,
    Availability,
    Roles,
    Documents,
    Providers,
  },
  setup() {
    const current = ref(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    return {
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
          content: "Second-content",
        },
        {
          title: "Providers",
          content: "Last-content",
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
