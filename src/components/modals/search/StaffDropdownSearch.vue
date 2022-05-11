<template>
  <a-select
    ref="select"
    :mode="mode"
    :value="value"
    @input="updateValue"
    style="width: 100%"
    :show-search="true"
    :placeholder="placeholder ? placeholder : 'Input Search Text'"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="loadingStatus ? undefined : null"
    :options="staffData"
    @search="handleStaffSearch"
    @focus="handleStaffSearch"
    @change="handleStaffChange"
    size="large"
  >
    <template v-if="loadingStatus" #notFoundContent>
      <a-spin size="small" />
      <p>Data not found!</p>
    </template>
  </a-select>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect, reactive } from "vue";
import { useStore } from "vuex";
import Services from "@/services/serviceMethod";
export default defineComponent({
  components: {},
  props: {
    value: String,
    checkSameAsStaff: Boolean,
    mode: String,
    close: Boolean,
    placeholder: String,
    targetRecords: Array,
    dropdownList: Array,
  },

  setup(props, context) {
    const store = useStore();
    const staff = reactive(props.dropdownList);
    const staffData = staff ? ref(staff) : ref([]);

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };

    onMounted(() => {
      Services.singleDropdownSearch("", (d) => (staffData.value = d), props.targetRecords, "staff");
    });
    
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch("", (d) => (staffData.value = d), props.targetRecords, "staff");
      }
    });

    const handleStaffSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      staffData.value = [];
      const value = val.target ? val.target.value : val
      Services.singleDropdownSearch(value, (d) => (staffData.value = d), props.targetRecords, "staff");
    };

    const handleStaffChange = (val) => {
      if (props.checkSameAsStaff) {
        context.emit("handlePatientChange", val);
      } else {
        context.emit("handleStaffChange", val);
      }
    };

    return {
      loadingStatus: store.getters.dropdownLoadingStatus,
      handleStaffChange,
      handleStaffSearch,
      staffData,
      updateValue,
    };
  },
});
</script>
