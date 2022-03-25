<template>
  <!-- <span>{{data}}</span>   -->
  <a-select
  ref="select"
  :value="value"
   @input="updateValue"
  style="width: 130%"
  show-search
  placeholder="Please search on first & last name, phone number, email..."
  :show-arrow="false"
  :filter-option="false"
  :not-found-content="loadingStatus ? undefined : null"
  :options="data.map((item) => ({label: item.firstName+' '+item.lastName+' '+item.phoneNumber+' '+item.email,value:item.udid?item.udid:item.id }))"
  @search="handleSearch"
  @change="handleChange"
  size="large">
  <template  v-if="loadingStatus" #notFoundContent>
    <a-spin size="small" />
  </template>
  </a-select>   
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex"
import Services from "@/services/serviceMethod"
export default defineComponent({
  components: {
 
  },
  props:{
    value:String,
  },
  
  setup(props,context) {
    const store = useStore()
    const data = ref([]);
    
    const updateValue = (event) => {
        context.emit('update:modelValue', event.target.value);
    }
    


    const handleSearch = (val) => {
      store.commit('loadingStatus', true)
      Services.headerSearch(val, (d) => (data.value = d), 'search')
    };

    const handleChange = (val) => {
        context.emit('handleChange',val)
    };



    return {
      loadingStatus:store.getters.loadingStatus,
      handleChange,
      handleSearch,
      data,
      updateValue
    };
  },
});
</script>
