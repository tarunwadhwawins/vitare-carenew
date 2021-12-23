<template>
  <a-modal width="1000px" title="Add Care Coordinators" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <a-row :gutter="24" class="mb-24">
          <a-col :sm="20" :xs="24">
            <a-input v-model="value" size="large" placeholder="Enter Search Here..." />
          </a-col>
          <a-col :sm="4" :xs="24">
            <a-button class="btn primaryBtn" size="large"> Add New </a-button>
          </a-col>
        </a-row>
      </a-col>
      <a-col :sm="24" :xs="24">
        <a-table
          :columns="columns7"
          :data-source="data7"
          :pagination="false"
          @change="onChange"
        >
          <template #checkbox>
            <a-checkbox v-model:checked="checked"></a-checkbox>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
