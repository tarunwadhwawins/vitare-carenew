<template>
  <a-modal
    v-model:visible="visible"
    width="1000px"
    title="Add Document"
    centered
    @ok="handleOk"
  >
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Name</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Document</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Type</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Id Proof</a-select-option>
            <a-select-option value="Yiminghe">Clinical</a-select-option>
            <a-select-option value="Yiminghe">Insurance</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>Tags</label>
          <a-select
            v-model:value="selectedItemsForTag"
            mode="multiple"
            size="large"
            placeholder="Please Select Tags"
            style="width: 100%"
            :options="filteredOptionsForTag.map((item) => ({ value: item }))"
          />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
const OPTIONSTAG = ["Tag1", "Tag2", "Tag3"];
export default defineComponent({
  components: {},
  setup() {
    const selectedItemsForTag = ref(["Tag1"]);
    const filteredOptionsForTag = computed(() =>
      OPTIONSTAG.filter((o) => !selectedItemsForTag.value.includes(o))
    );
    return {
      filteredOptionsForTag,
      selectedItemsForTag,
      size: ref("large"),
    };
  },
});
</script>
