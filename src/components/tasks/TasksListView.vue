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
    <a-col :sm="24">
   
     <TaskTable v-if="tasksList.tasksListColumns" :taskRecords="tasksList" @is-Edit="editTask($event)"></TaskTable>
       <Loader /> 
    </a-col>
  </a-row>
</template>

<script>

import { ref, watchEffect } from "vue";
import { useStore } from "vuex"
// import swal from 'sweetalert2';
import SearchField from "@/components/common/input/SearchField";

 import Loader from "@/components/loader/Loader";
 import TaskTable from "./TaskTable"

export default {
  components: {
    SearchField,
    TaskTable,
     Loader
  },
  setup(props, {emit}) {
    const store = useStore()
    watchEffect(() => {
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


   return {
      size: ref([]),
      handleChange,
      // tasksColumns,
      tasksList:store.getters.taskRecords,
      editTask,
      updateTask,
      createAppointment,
    } 
  }
}
</script>