<template>
  <a-modal
    max-width="1140px"
    width="100%"
    title="Add New Patients"
    centered
    :footer="null"
  >
    <a-row :gutter="24">
      <a-col :span="24">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div
          class="steps-content"
          v-if="steps[current].title == 'Demographics'"
        >
          <Demographics />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Conditions'">
          <Conditions />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Programs'">
          <Programs />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Devices'">
          <Devices />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Parameters'">
          <Parameters />
        </div>
        <div
          class="steps-content"
          v-if="steps[current].title == 'Clinical Data'"
        >
          <ClinicalData />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Insurance'">
          <Insurance />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Documents'">
          <Documents />
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
</template>
<script>
import { defineComponent, ref, computed, reactive } from "vue";
import Demographics from "@/components/modals/forms/Demographics";
import Conditions from "@/components/modals/forms/Conditions";
import Programs from "@/components/modals/forms/Programs";
import Devices from "@/components/modals/forms/Devices";
import Parameters from "@/components/modals/forms/Parameters";
import ClinicalData from "@/components/modals/forms/ClinicalData";
import Insurance from "@/components/modals/forms/Insurance";
import Documents from "@/components/modals/forms/Documents";
export default {
  components: {
    Demographics,
    Conditions,
    Programs,
    Devices,
    Parameters,
    ClinicalData,
    Insurance,
    Documents,
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
          title: "Demographics",
          content: "First-content",
        },
        {
          title: "Conditions",
          content: "Second-content",
        },
        {
          title: "Programs",
          content: "Second-content",
        },
        {
          title: "Devices",
          content: "Second-content",
        },
        {
          title: "Parameters",
          content: "Second-content",
        },
        {
          title: "Clinical Data",
          content: "Second-content",
        },
        {
          title: "Insurance",
          content: "Second-content",
        },
        {
          title: "Documents",
          content: "Last-content",
        },
      ],
      next,
      prev,
      size: ref("large"),
      value: ref(["Manger", "Billing Admin", "User Admin"]),
      handleChange,
    };
  },
};
</script>
<style lang="scss">
@media (max-width: 1199px) {
  .ant-steps-item {
    display: flex;
    .ant-steps-item-container {
      text-align: center;
      .ant-steps-item-icon {
        margin: 0;
      }
      .ant-steps-item-content {
        display: block;
        .ant-steps-item-title {
          padding: 0;
          font-size: 13px;
          &::after {
            display: none;
          }
        }
      }
    }
  }
}

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
