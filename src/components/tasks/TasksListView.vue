<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <SearchField @change="handleChange"/>
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(tasksDashboardPermissions,118)">
      <div class="text-right mb-24">
        <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
      </div>
    </a-col>
    
   
     <TaskTable @is-Edit="editTask($event)"></TaskTable>
      
    
  </a-row>
</template>

<script>

import { ref, watchEffect,computed } from "vue";
import { useStore } from "vuex"
// import swal from 'sweetalert2';
import SearchField from "@/components/common/input/SearchField";
import TaskTable from "./TaskTable"
import { arrayToObjact } from "@/commonMethods/commonMethod";

export default {
  components: {
    SearchField,
    TaskTable,
    // Loader
  },
  setup(props, {emit}) {
    const store = useStore()
    watchEffect(() => {
      store.getters.taskRecords.tasksList=""
      store.dispatch("tasksList")
    })

    const handleChange = (value) => {
      store.dispatch('searchTasks', value)
    };

   

    const editTask = (id) => {
      emit('isEdit', {check:true,id:id});
    };

    const updateTask = () => {
      // console.log('updateTask', data)
    };

    const createAppointment = () => {
      // console.log('createAppointment', id)
    };
   
    const tasksDashboardPermissions = computed(()=>{
      return store.state.screenPermissions.tasksDashboardPermissions
    })
   return {
     tasksDashboardPermissions,
      arrayToObjact,
      size: ref([]),
      handleChange,
      // tasksColumns,
      
      editTask,
      updateTask,
      createAppointment,
    } 
  }
}
</script>