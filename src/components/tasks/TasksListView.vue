<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <SearchField @change="handleChange"/>
    </a-col>
    <a-col :span="12">
      <div class="text-right mb-24">
        <a-button class="primaryBtn">{{$t('global.exportToExcel')}}</a-button>
      </div>
    </a-col>
    
   {{tasksList.tasksList}}
     <TaskTable v-if="tasksList.tasksList" :taskRecords="tasksList" @is-Edit="editTask($event)"></TaskTable>
      
    
  </a-row>
</template>

<script>

import { ref, watchEffect } from "vue";
import { useStore } from "vuex"
// import swal from 'sweetalert2';
import SearchField from "@/components/common/input/SearchField";


 import TaskTable from "./TaskTable"

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
    const tasksList = store.getters.taskRecords.value

   return {
      size: ref([]),
      handleChange,
      // tasksColumns,
      tasksList,
      editTask,
      updateTask,
      createAppointment,
    } 
  }
}
</script>