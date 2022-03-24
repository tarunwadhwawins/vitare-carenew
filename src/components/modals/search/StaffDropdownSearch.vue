<template>
  <a-select
  ref="select"
  :mode="mode"
  :value="value"
   @input="updateValue"
  style="width: 100%"
  :show-search="true"
  placeholder="input search text"
  :show-arrow="true"
  :filter-option="false"
  :not-found-content="loadingStatus ? undefined : null"
  :options="staffData"
  @search="handleStaffSearch"
  @change="handleStaffChange"
  size="large">
  <template  v-if="loadingStatus" #notFoundContent>
    <a-spin size="small" />
  </template>
</a-select>    

</template>

<script>

import { defineComponent, ref,onMounted } from "vue";
import { useStore } from "vuex"
import Services from "@/services/serviceMethod"
export default defineComponent({
  components: {
 
  },
  props:{
      value:String,
      checkSameAsStaff:Boolean,
      mode:String
  },
  
  setup(props,context) {
    const store = useStore()
    const staffData = ref([]);
    
    const updateValue = (event) => {
        context.emit('update:modelValue', event.target.value);
    }
     onMounted(()=>{
        Services.singleDropdownSearch('', (d) => (staffData.value = d), 'staff')
    })


    const handleStaffSearch = (val) => {
      store.commit('loadingStatus', true)
      staffData.value=[];
      Services.singleDropdownSearch(val, (d) => (staffData.value = d), 'staff')
    };

    const handleStaffChange = (val) => {
      if(props.checkSameAsStaff){
        context.emit('handlePatientChange',val)
      }else{

        context.emit('handleStaffChange',val)
      }
    };



    return {
      loadingStatus:store.getters.loadingStatus,
      handleStaffChange,
      handleStaffSearch,
      staffData,
      updateValue
    };
  },
});
</script>
