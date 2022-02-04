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
        :columns="tasksColumns"
        :data-source="tasksList"
        :scroll="{ x: 900 }"
        :pagination="false"
        @change="onChange">
        <template #taskName="text">
          <router-link to="#" @click="showModal">{{ text.text }}</router-link>
        </template>
        <template #assignedBy="text">
          <router-link to="coordinator-summary">{{ text.text }}</router-link>
        </template>
        <template #status>
          <a-switch />
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
import swal from 'sweetalert2';
import SearchField from "@/components/common/input/SearchField";

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
      return store.state.tasks.tasksList
    })

    const handleChange = (value) => {
      store.dispatch('searchTasks', value)
    };

    const deleteTask = () => {
      swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this record?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          store.dispatch("tasksList")
        }
      });
    };

    const editTask = () => {
      emit('isEdit', true);
    };

    const updateTask = () => {
      // console.log('updateTask', data)
    };

    const createAppointment = () => {
      // console.log('createAppointment', id)
    };

    const tasksColumns = [
      {
        title: "Task Name",
        dataIndex: "taskName",
        slots: {
          customRender: "taskName",
        },
        filters: [
          {
            text: "Task 1",
            value: "task 1",
          },
          {
            text: "Task 2",
            value: "task 2",
          },
        ],
        onFilter: (value, record) => record.taskName.indexOf(value) === 0,
      },
      {
        title: "Status ",
        dataIndex: "status",
        slots: {
          customRender: "status",
        },
      },
      {
        title: "Priority ",
        dataIndex: "priority",
        filters: [
          {
            text: "High",
            value: "high",
          },
          {
            text: "Normal",
            value: "normal",
          },
          {
            text: "Urgent",
            value: "urgent",
          },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
      {
        title: "Category",
        dataIndex: "category",
        slots: {
          customRender: "category",
        },
      },
      {
        title: "Due Date ",
        dataIndex: "dueDate",
        filters: [
          {
            text: "Dec 24, 2021",
            value: "Dec 24, 2021",
          },
          {
            text: "Dec 28, 2021",
            value: "Dec 28, 2021",
          },
        ],
        onFilter: (value, record) => record.dueDate.indexOf(value) === 0,
      },
      {
        title: "Assigned By",
        dataIndex: "assignedBy",
        filters: [
          {
            text: "John",
            value: "John",
          },
          {
            text: "	Devin",
            value: "	Devin",
          },
        ],
        slots: {
          customRender: "assigned",
        },
        onFilter: (value, record) => record.assignedBy.indexOf(value) === 0,
      },
      {
        title: "Actions",
        dataIndex: "actions",
        slots: {
          customRender: "action",
        },
      },
    ];

   return {
      size: ref([]),
      handleChange,
      tasksColumns,
      tasksList,
      deleteTask,
      editTask,
      updateTask,
      createAppointment,
    } 
  }
}
</script>