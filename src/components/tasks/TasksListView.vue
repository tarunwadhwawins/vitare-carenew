<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <a-select
        v-model:value="value2"
        :size="size"
        mode="tags"
        style="width: 100%"
        placeholder="Search . . ."
        :options="searchoptions"
        @change="handleChange">
      </a-select>
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
          <router-link to="corrdinator-summary">{{ text.text }}</router-link>
        </template>
        <template #status>
          <a-switch />
        </template>
        <template #action>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{ $t('global.edit') }}</span>
            </template>
            <a class="icons"><EditOutlined /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('global.delete')}}</span>
            </template>
            <a class="icons"> <DeleteOutlined /></a>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>{{$t('tasks.createAppointment')}}</span>
            </template>
            <router-link to="appointment-calendar" class="icons">
              <CalendarOutlined/>
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
export default {
  components: {
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
  },
  setup() {
    const store = useStore()
    watchEffect(() => {
      store.dispatch("tasksList")
    })
      
    const tasksList = computed(() => {
      return store.state.tasks.tasksList
    })

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    const searchoptions = ref([
      {
        value: "Jane Doe",
        label: "Jane Doe",
      },
      {
        value: "Steve Smith",
        label: "Steve Smith",
      },
      {
        value: "Joseph Spouse",
        label: "Joseph Spouse",
      },
      {
        value: "Robert Henry",
        label: "Robert Henry",
      },
      {
        value: "Task 1",
        label: "Task 1",
      },
      {
        value: "Task 2",
        label: "Task 2",
      },
      {
        value: "Clinical",
        label: "Clinical",
      },
      {
        value: "Internal",
        label: "Internal",
      },
    ]);

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
        title: "Category ",
        dataIndex: "category",
        filters: [
          {
            text: "Clinical",
            value: "clinical",
          },
          {
            text: "Comm",
            value: "comm",
          },
          {
            text: "Admin",
            value: "admin",
          },
          {
            text: "Internal",
            value: "internal",
          },
        ],
        onFilter: (value, record) => record.category.indexOf(value) === 0,
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
    /* const data = [
      {
        key: "1",
        name: " Task 1",
        status: "",
        priority: "High",
        category: "Clinical",
        duedate: "Dec 24, 2021",
        assigned: "John",
        actions: "",
      },
      {
        key: "2",
        name: "Task 2",
        status: "",
        priority: "Normal",
        category: "Internal",
        duedate: "Dec 28, 2021",
        assigned: "Devin",
        actions: "",
      },
      {
        key: "3",
        name: " Task 3",
        status: "",
        priority: "Critical ",
        category: "Comm",
        duedate: "Dec 29, 2021",
        assigned: "Smith",
        actions: "",
      },
      {
        key: "4",
        name: "Task 4",
        status: "",
        priority: "Normal",
        category: "Admin",
        duedate: "Dec 30, 2021",
        assigned: "Andrew",
        actions: "",
      },
    ]; */

   return {
      size: ref([]),
      handleChange,
      searchoptions,
      tasksColumns,
      tasksList,
    } 
  }
}
</script>