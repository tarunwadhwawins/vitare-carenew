<template>
  <a-row :gutter="24">
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Provider Name</label>
        <a-input v-model="value" size="large" placeholder="Provider Name" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Provider Address</label>
        <a-input v-model="value" size="large" placeholder="Provider Address" />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Country</label>
        <a-input v-model="value" size="large" placeholder="Country" />
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
    <a-col :md="16" :sm="12" :xs="24">
      <div class="form-group">
        <label>Tags</label>
        <a-select
          v-model:value="selectedItemsForTag"
          mode="multiple"
          size="large"
          placeholder="Please Select Roles"
          style="width: 100%"
          :options="filteredOptionsForTag.map((item) => ({ value: item }))"
        />
      </div>
    </a-col>
    <a-col :md="8" :sm="12" :xs="24">
      <div class="form-group">
        <label>Default Location</label>
        <a-select
          ref="select"
          v-model="value1"
          style="width: 100%"
          size="large"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="lucy">Choose Location</a-select-option>
          <a-select-option value="Yiminghe">Location 1</a-select-option>
          <a-select-option value="Yiminghe">Location 2 </a-select-option>
          <a-select-option value="Yiminghe">Location 3</a-select-option>
          <a-select-option value="Yiminghe">Location 4</a-select-option>
        </a-select>
      </div>
    </a-col>
  </a-row>
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
      size: ref("large"),
      filteredOptionsForTag,
      selectedItemsForTag,
    };
  },
});
</script>
