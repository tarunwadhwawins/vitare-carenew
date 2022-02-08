<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
  
    <a-calendar :value="date" :fullscreen="false" @select="onSelect" @panelChange="onPanelChange" />
  </div>
  
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import { useStore } from "vuex"
//import moment from "moment"
//import dayjs from 'dayjs';
export default defineComponent({
  props:{
    
  },
  setup(props, {emit}) {
    const store = useStore()
    const date = computed(() =>{
      return store.state.appointment.calendarDate
    })
 
   
    const selectedValue = ref();

    const onSelect = value => {
      store.state.appointment.calendarDate = value;
      selectedValue.value = value;
      emit("is-click",value)
      
    };
    const onPanelChange = (value, mode) => {
      console.log(value, mode);
    };

    return {
      date,
      selectedValue,
      onSelect,
     
      onPanelChange,
    };
  },

});
</script>