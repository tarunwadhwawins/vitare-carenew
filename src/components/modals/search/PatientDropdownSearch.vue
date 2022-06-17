<template>
  <a-select
  :getPopupContainer="triggerNode => triggerNode.parentNode"
    ref="select"
    class=""
    :listHeight="listHeight?listHeight:150"
    :mode="mode"
    :value="value"
    @input="updateValue"
    style="width: 100%"
    :show-search="true"
    :placeholder="placeholder?placeholder:'input search text'"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="loadingStatus ? undefined : null"
    :options="patientData"
    @search="handlePatientSearch"
    @change="handlePatientChange"
    size="large"
  >
    <template v-if="loadingStatus" #notFoundContent>
      <a-spin size="small" />
      <p>Data not found!</p>
    </template>
  </a-select>
</template>

<script>
import { defineComponent, watchEffect, onMounted,ref } from "vue";
import { useStore } from "vuex";
import Services from "@/services/serviceMethod";
export default defineComponent({
  components: {},
  props: {
    value: String,
    mode: String,
    close: Boolean,
    editDataPatient:Array,
    placeholder:String,
    listHeight:Number
  },

  setup(props, context) {
    const store = useStore();
    const patientData = ref()
    
   

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch(
          "",
          (d) => (patientData.value = d),
          "patient"
        );
        store.commit("checkChangeInput", false);
      }
       props.editDataPatient?patientData.value = props.editDataPatient:patientData.value
    });
    onMounted(() => {
      Services.singleDropdownSearch(
        "",
        (d) => (patientData.value = d),
        "patient"
      );
    });

    const handlePatientSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      patientData.value = [];
      Services.singleDropdownSearch(
        val,
        (d) => (patientData.value = d),
        "patient"
      );
    };

    const handlePatientChange = (val) => {
      // Services.singleDropdownSearch( val, (d) => (patientData.value = d), "patient" );
      context.emit("handlePatientChange", val);
    };

    return {
      loadingStatus: store.getters.dropdownLoadingStatus,
      handlePatientChange,
      handlePatientSearch,
      patientData,
      updateValue,
    };
  },
});
</script>
