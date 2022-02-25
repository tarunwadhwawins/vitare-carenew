<template>
  <a-col :sm="24" v-if="arrayToObjact(tasks.taskPermissions,6)">
    <a-table 
    :columns="fields"
    :data-source="data"
    :scroll="{ x: 900 ,y:450 }"
    :pagination="false"
    @change="onChange">
    <template #taskName="text">
      <router-link to="#" @click="showModal">{{ text.text }}</router-link>
    </template>
    <template #assignedBy="text">
      <router-link to="coordinator-summary">{{ text.text }}</router-link>
    </template>
   
    <template #category="{ record }">
      <span v-for="category,i in record.category" :key="category.id" to="coordinator-summary">
       {{i==0?' ':','}} {{ category }}
      </span>
    </template>
    <template #action="{ record }" v-if="arrayToObjact(tasks.taskPermissions,7)">
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
  <InfiniteLoader v-if="loader" />
</a-col>
</template>
<script>
import { ref, reactive, onMounted,computed } from "vue";
import { useStore } from "vuex";
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";
import { messages } from "@/config/messages";
import { warningSwal } from "@/commonMethods/commonMethod";
import InfiniteLoader from "@/components/loader/InfiniteLoader";
import { arrayToObjact } from "@/commonMethods/commonMethod";
export default {
  name: "TaskTable",
  components: {
    DeleteOutlined,
    EditOutlined,
    CalendarOutlined,
    InfiniteLoader,
  },
  props: {
    taskRecords: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const fields = reactive(props.taskRecords.tasksListColumns);
    const data = reactive(props.taskRecords.tasksList);
    const meta = store.getters.taskRecords;
    const loader = ref(false);

    onMounted(() => {
      var tableContent = document.querySelector(".ant-table-body");
      tableContent.addEventListener("scroll", (event) => {
        let maxScroll = event.target.scrollHeight - event.target.clientHeight;
        let currentScroll = event.target.scrollTop + 2;
        if (currentScroll >= maxScroll) {
          let current_page = meta.value.taskMeta.current_page + 1;
          if (current_page <= meta.value.taskMeta.total_pages) {
            loader.value = true;
            meta.value.taskMeta = "";
            store.dispatch("tasksList", "?page=" + current_page);
            setTimeout(() => {
              loadMoredata();
            }, 1000);
          }
        }
      });
    });

    function loadMoredata() {
      const newData = meta.value.tasksList;

      newData.forEach((element) => {
        data.push(element);
      });
      loader.value = false;
    }
    const editTask = (id) => {
      emit("is-Edit", { check: true, id: id });
    };
    function deleteTask(id) {
      warningSwal(messages.deleteWarning).then((response) => {
        if (response == true) {
          store.dispatch("tasksDelete", id);
          setTimeout(() => {
            store.getters.taskRecords.tasksList = "";
            store.dispatch("tasksList");
          }, 2000);
        }
      });
    }
     const tasks = computed(()=>{
      return store.state.tasks
    })
    return {
      tasks,
      arrayToObjact,
      editTask,
      deleteTask,
      fields,
      data,
      loader,
    };
  },
};
</script>
    