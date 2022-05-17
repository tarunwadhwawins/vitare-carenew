<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <SearchField endPoint="task" />
    </a-col>
    <a-col :span="12" >
      <div class="text-right mb-24">
        <ExportToExcel  @click="exportExcel('task_report','?fromDate=&toDate='+search)" v-if="arrayToObjact(screensPermissions, 118)"/>
      </div>
    </a-col>
    <TaskTable @is-Edit="editTask($event)"></TaskTable>
  </a-row>
  <TableLoader />
</template>
<script>
import { ref, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
import TaskTable from "./TaskTable";
import TableLoader from "@/components/loader/TableLoader";
import { arrayToObjact,exportExcel } from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";
import { useRouter } from 'vue-router';

export default {
  components: {
    SearchField,
    TaskTable,
    TableLoader,
    ExportToExcel,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter()
    onMounted(() => {
      if(store.getters.filter.value){
        router.replace({query: {view: 'list'}});
      store.dispatch("tasksList","?filter="+store.getters.filter.value);
      }else{
store.dispatch("tasksList")
      }
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
    });

    const handleChange = (value) => {
      store.dispatch("searchTasks", value);
    };

    const editTask = (id) => {
      emit("isEdit", { check: true, id: id });
    };

    const updateTask = () => {
      // console.log('updateTask', data)
    };

    const createAppointment = () => {
      // console.log('createAppointment', id)
    };

    
    onUnmounted(() => {
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
            store.commit("filter",'')
           //store.state.common.filter=''
    });
    return {
      search:store.getters.searchTable,
      exportExcel,
      screensPermissions:store.getters.screensPermissions,
      arrayToObjact,
      size: ref([]),
      handleChange,
      // tasksColumns,
      editTask,
      updateTask,
      createAppointment,
     
    };
  },
};
</script>