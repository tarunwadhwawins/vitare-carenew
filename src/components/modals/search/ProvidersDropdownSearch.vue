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
    :options="providerData"
    @search="handleProviderSearch"
    @change="handleProviderChange"
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
    checkSameAsProvider: Boolean,
    mode: String,
    close: Boolean,
    placeholder: String,
  },

  setup(props, context) {
    const store = useStore();
    const providerData = ref([]);

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    onMounted(() => {
      Services.singleDropdownSearch("", (d) => (providerData.value = d), "provider");
    });
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch(
          "",
          (d) => (providerData.value = d),
          "provider"
        );
      }
    });

    const handleProviderSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      providerData.value = [];
      Services.singleDropdownSearch(val, (d) => (providerData.value = d), "provider");
    };

    const handleProviderChange = (val) => {
      if (props.checkSameAsProvider) {
        context.emit("handlePatientChange", val);
      } else {
        context.emit("handleProviderChange", val);
      }
    };

    return {
      loadingStatus: store.getters.dropdownLoadingStatus,
      handleProviderChange,
      handleProviderSearch,
      providerData,
      updateValue,
    };
  },
});
</script>
