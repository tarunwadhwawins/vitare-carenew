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
      <a-table
        :columns="tasksList.tasksListColumns"
        :data-source="tasksList.tasksList"
        :scroll="{ x: 900 }"
        :pagination="false"
        @change="onChange">
        <template #taskName="text">
          <router-link to="#" @click="showModal">{{ text.text }}</router-link>
        </template>
        <template #assignedBy="text">
          <router-link to="coordinator-summary">{{ text.text }}</router-link>
        </template>
        <template #status="text">
          <!-- <a-switch /> -->
          <a-switch @click="changeStatus(text.record.id,text.record.status)"   v-model:checked="text.record.status"   />
        </template>
        <template #category="{ record }">
          <router-link v-for="category in record.categories" :key="category.id" to="coordinator-summary">
            {{ category }}
          </router-link>
        </template>
        <template #action="{ record }">
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('global.edit') }}</span>
            </template>
            <a class="icons"><EditOutlined @click="editTask(record.id)" /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons"> <DeleteOutlined @click="deleteTask(record.id)" /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('tasks.createAppointment')}}</span>
            </template>
            <router-link to="appointment-calendar" class="icons">
              <CalendarOutlined @click="createAppointment(record.id)"/>
            </router-link>
          </a-tooltip>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
import { 
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex"
// import swal from 'sweetalert2';
import SearchField from "@/components/common/input/SearchField";
import { messages } from '@/config/messages';
import { warningSwal } from "@/commonMethods/commonMethod"

export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
    SearchField,
  },
  setup(props, {emit}) {
    const store = useStore()
    watchEffect(() => {
      store.dispatch("tasksList")
    })
      
    const tasksList = computed(() => {
      return store.state.tasks
    })

    const handleChange = (value) => {
      store.dispatch('searchTasks', value)
    };

    // const deleteTask = () => {
    //   swal({
    //     title: "Are you sure?",
    //     text: "Are you sure you want to delete this record?",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then((willDelete) => {
    //     if (willDelete) {
    //       store.dispatch("tasksList")
    //     }
    //   });
    // };

    function deleteTask(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("tasksDelete", id);
          setTimeout(() => {
            store.dispatch("tasksList");
          }, 2000);
        }
      });
    }

    const editTask = () => {
      emit('isEdit', true);
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
      tasksList,
      deleteTask,
      editTask,
      updateTask,
      createAppointment,
    } 
  }
}
</script>