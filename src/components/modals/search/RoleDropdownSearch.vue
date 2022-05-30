<template>
<a-select
:getPopupContainer="triggerNode => triggerNode.parentNode"
  ref="select"
  :mode="mode"
  :value="value"
  style="width: 100%"
  :show-search="true"
  placeholder="input search text"
  :show-arrow="true"
  :filter-option="false"
  :not-found-content="loadingStatus ? undefined : null"
  :options="roleData"
  @search="handleRoleSearch"
  @change="handleRoleChange"
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
    const roleData = ref([]);
    
    const updateValue = (event) => {
        context.emit('update:modelValue', event.target.value);
    }
     onMounted(()=>{
       Services.singleDropdownSearch('', (d) => (roleData.value = d), 'roleList')
    })


    const handleRoleSearch = (val) => {
      store.commit('dropdownLoadingStatus', true)
      roleData.value=[];
     Services.singleDropdownSearch(val, (d) => (roleData.value = d), 'roleList')
    };

    const handleRoleChange = (val) => {
        context.emit('handleRoleChange',val)
    };



    return {
      loadingStatus:store.getters.dropdownLoadingStatus,
      handleRoleChange,
      handleRoleSearch,
      roleData,
      updateValue
    };
  },
});
</script>
