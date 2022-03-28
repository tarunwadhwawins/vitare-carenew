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
  :options="patientData"
  @search="handlePatientSearch"
  @change="handlePatientChange"
  size="large">
  <template  v-if="loadingStatus" #notFoundContent>
    <a-spin size="small" />
    <p>Data not found!</p>
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
      mode:String
  },
  
  setup(props,context) {
    const store = useStore()
    const patientData = ref([]);
    
    const updateValue = (event) => {
        context.emit('update:modelValue', event.target.value);
    }
     onMounted(()=>{
        Services.singleDropdownSearch('', (d) => (patientData.value = d), 'patient')
    })


    const handlePatientSearch = (val) => {
      store.commit('dropdownLoadingStatus', true)
      patientData.value=[];
      Services.singleDropdownSearch(val, (d) => (patientData.value = d), 'patient')
    };

    const handlePatientChange = (val) => {
        context.emit('handlePatientChange',val)
    };



    return {
      loadingStatus:store.getters.dropdownLoadingStatus,
      handlePatientChange,
      handlePatientSearch,
      patientData,
      updateValue
    };
  },
});
</script>
