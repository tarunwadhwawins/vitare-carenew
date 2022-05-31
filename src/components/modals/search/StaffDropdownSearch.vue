<template>
<div>
  <a-select
  :getPopupContainer="triggerNode => triggerNode.parentNode"
    ref="select"
    :mode="mode"
    :value="value"
    @input="updateValue"
    style="width: 100%"
    :show-search="true"
    :placeholder="placeholder ? placeholder : 'input search text'"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="loadingStatus ? undefined : null"
    :options="staffData"
    @search="handleStaffSearch"
    @change="handleStaffChange"
    size="large"
  >
    <template v-if="loadingStatus" #notFoundContent>
      <a-spin size="small" />
      <p>Data not found!</p>
    </template>
  </a-select>
</div>

  
</template>
 


<script>
import { defineComponent, ref, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import Services from "@/services/serviceMethod";
export default defineComponent({
  components: {},
  props: {
    value: String,
    checkSameAsStaff: Boolean,
    mode: String,
    placeholder: String,
    close: Boolean,
    editDataStaff:Array
  },

  setup(props, context) {
    const store = useStore();
    const staffData = ref([]);

    // const editDataStaff = computed(()=>{
    //     return store.state.escalations.editEscalationStaff
    // });

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    onMounted(() => {
      Services.singleDropdownSearch("", (d) => (staffData.value = d), "staff");
    });
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch(
          "",
          (d) => (staffData.value = d),
          "staff"
        );
      }
      
        props.editDataStaff?staffData.value = props.editDataStaff:staffData.value
        
    });

    const handleStaffSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      staffData.value = [];
      Services.singleDropdownSearch(val, (d) => (staffData.value = d), "staff");
    };

    const handleStaffChange = (val) => {
      Services.singleDropdownSearch(val, (d) => (staffData.value = d), "staff");
      if (props.checkSameAsStaff) {
        context.emit("handlePatientChange", val);
      } else {
        context.emit("handleStaffChange", val);
      }
    };

    return {
      // editDataStaff,
      loadingStatus: store.getters.dropdownLoadingStatus,
      handleStaffChange,
      handleStaffSearch,
      staffData,
      updateValue,
    };
  },
});
</script>
