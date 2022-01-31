<template>
  <a-modal title="Add New Provider" max-width="1040px" width="100%">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content" v-if="steps[current].title == 'Providers'">
          <AdminProviders />
        </div>
        <div class="steps-content" v-if="steps[current].title == 'Locations'">
          <AdminLocations />
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
</template>
<script>
import { ref } from "vue";
import AdminProviders from "@/components/modals/forms/AdminProviders";
import AdminLocations from "@/components/modals/forms/AdminLocations";
export default {
  components: {
    AdminProviders,
    AdminLocations,
  },
  setup() {
    const current = ref(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };

    const checked = ref([false]);
    return {
      size: ref("large"),
      checked,
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
