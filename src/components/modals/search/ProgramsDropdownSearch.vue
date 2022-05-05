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
    :options="programData"
    @search="handleProgramSearch"
    @change="handleProgramChange"
    size="large"
  >
    <template v-if="loadingStatus" #notFoundContent>
      <a-spin size="small" />
      <p>Data not found!</p>
    </template>
  </a-select>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import Services from "@/services/serviceMethod";
export default defineComponent({
  components: {},
  props: {
    value: String,
    checkSameAsProgram: Boolean,
    mode: String,
    close: Boolean,
    placeholder: String,
  },

  setup(props, context) {
    const store = useStore();
    const programData = ref([]);

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    onMounted(() => {
      Services.singleDropdownSearch("", (d) => (programData.value = d), "program");
    });
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch(
          "",
          (d) => (programData.value = d),
          "program"
        );
      }
    });

    const handleProgramSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      programData.value = [];
      Services.singleDropdownSearch(val, (d) => (programData.value = d), "program");
    };

    const handleProgramChange = (val) => {
      if (props.checkSameAsProgram) {
        context.emit("handlePatientChange", val);
      } else {
        context.emit("handleProgramChange", val);
      }
    };

    return {
      loadingStatus: store.getters.dropdownLoadingStatus,
      handleProgramChange,
      handleProgramSearch,
      programData,
      updateValue,
    };
  },
});
</script>
