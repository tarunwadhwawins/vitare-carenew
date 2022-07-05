<template>
<!-- <div> -->
  <a-select
  class=""
  :listHeight="listHeight?listHeight:150"
  :getPopupContainer="triggerNode => triggerNode.parentNode"
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
    :disabled="isDisabled"
  >
    <template v-if="loadingStatus" #notFoundContent>
      <a-spin size="small" />
      <p>Data not found!</p>
    </template>
  </a-select>
<!-- </div> -->

  
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
    placeholder: String,
    close: Boolean,
    targetRecords: Array,
    dropdownList: Array,
    editDataStaff:Array,
    listHeight: Number,
    isDisabled: Boolean,
  },

  setup(props, context) {
    const store = useStore();
    const staff = reactive(props.dropdownList);
    const staffData = staff ? ref(staff) : ref([]);

    // const editDataStaff = computed(()=>{
    //     return store.state.escalations.editEscalationStaff
    // });

    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };

    onMounted(() => {
      Services.singleDropdownSearch("", (d) => (staffData.value = d), "staff",props.targetRecords );
    });
    
    watchEffect(() => {
      if (props.close) {
        Services.singleDropdownSearch("", (d) => (staffData.value = d), "staff",props.targetRecords);
      }
      
        props.editDataStaff?staffData.value = props.editDataStaff:staffData.value
        
    });

    const handleStaffSearch = (val) => {
      store.commit("dropdownLoadingStatus", true);
      staffData.value = [];
      const value = val.target ? val.target.value : val
      Services.singleDropdownSearch(value, (d) => (staffData.value = d), "staff",props.targetRecords);
    };

    const handleStaffChange = (val) => {
      // Services.singleDropdownSearch(val, (d) => (staffData.value = d), "staff");
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
