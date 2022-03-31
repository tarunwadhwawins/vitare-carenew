<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <SearchField endPoint="task" />
    </a-col>
    <a-col :span="12" v-if="arrayToObjact(tasksDashboardPermissions, 118)">
      <div class="text-right mb-24">
        <ExportToExcel  @click="exportExcel('task_report')"/>
      </div>
    </a-col>
    <TaskTable @is-Edit="editTask($event)"></TaskTable>
  </a-row>
</template>
<script>
import { ref, watchEffect, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import SearchField from "@/components/common/input/SearchField";
import TaskTable from "./TaskTable";
import { arrayToObjact,exportExcel } from "@/commonMethods/commonMethod";
import ExportToExcel from "@/components/common/export-excel/ExportExcel.vue";

export default {
  components: {
    SearchField,
    TaskTable,
    // Loader,
    ExportToExcel,
  },
  setup(props, { emit }) {
    const store = useStore();
    watchEffect(() => {
      store.getters.taskRecords.tasksList = "";
      store.dispatch("tasksList");
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

    const tasksDashboardPermissions = computed(() => {
      return store.state.screenPermissions.tasksDashboardPermissions;
    });
    onUnmounted(() => {
      store.dispatch("searchTable", '&search=')
            store.dispatch('orderTable', {
                data: '&orderField=&orderBy='
            })
    });
    return {
      search:store.getters.searchTable,
      exportExcel,
      tasksDashboardPermissions,
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