<template>
  <a-modal width="1000px" :title="$t('tasks.tasksModal.addTask')" centered>
    <a-form :model="taskForm" layout="vertical" @finish="addNewTask">
      <a-row :gutter="24">
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.title')" name="title">
              <a-input v-model:value="taskForm.title" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.longDescription')" name="description">
              <a-textarea v-model:value="taskForm.description" placeholder="Description" :auto-size="{ minRows: 3 }" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.status')" name="taskStatus">
              <a-select v-model:value="taskForm.taskStatus" ref="select" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                <a-select-option v-for="status in taskStatus.globalCode" :key="status.id" :value="status.id">{{ status.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.priority')" name="priority">
              <a-select v-model:value="taskForm.priority" ref="select" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                <a-select-option v-for="priority in taskPriority.globalCode" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.assignedTo')" name="assignedTo">
              <a-select v-model:value="taskForm.assignedTo" mode="multiple" size="large" placeholder="Please Select Roles" style="width: 100%" :options="staffList.map((item) => ({ value: item.name }))"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.category')" name="taskCategory">
              <a-select v-model:value="taskForm.taskCategory" mode="multiple" size="large" placeholder="Please Select Category" style="width: 100%" :options="taskCategory.globalCode.map((item) => ({ value: item.name }))"/>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.startDate')" name="category">
              <a-date-picker v-model:value="taskForm.startDate" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.dueDate')" name="category">
              <a-date-picker v-model:value="taskForm.dueDate" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="steps-action">
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button @click="handleCancel" html-type="reset">{{$t('global.cancel')}}</a-button>
              <a-button type="primary" html-type="submit">{{$t('global.ok')}}</a-button>
            </a-form-item>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { ref, reactive, watchEffect, computed } from "vue";
import { useStore } from "vuex"

const assignedToTags = ["Jane Doe", "Steve Smith", "Joseph William"];
const CategoryTags = ["Admin", "Clinical", "Office", "Personal"];
export default {
  setup(props, {emit}) {

    const taskForm = reactive({
      title: '',
      description: '',
      taskStatus: '',
      priority: '',
      selectedItems: '',
      taskCategory: '',
      startDate: '',
      dueDate: '',
    });

    const addNewTask = () => {
      console.log('task Form', taskForm)
      store.dispatch("addTask", taskForm)
      emit('is-visible', false);
    }
    const visible = ref(true);
    const handleCancel = () => {
      emit('is-visible', false);
    };
    const store = useStore()
    watchEffect(() => {
      store.dispatch("globalCodes")
      store.dispatch("staffList")
    })
    const taskCategory = computed(() => {
      return store.state.common.taskCategory;
    })
    const taskPriority = computed(() => {
      return store.state.common.taskPriority;
    })
    const taskStatus = computed(() => {
      return store.state.common.taskStatus
    })
    const staffList = computed(() => {
      return store.state.communications.staffList
    })
    
    const selectedItems = ref(["Jane Doe"]);
    const filteredOptions = computed(() =>
      assignedToTags.filter((o) => !selectedItems.value.includes(o))
    );

    /* const selectedItemsForTag = ref(["Admin"]);
    const filteredOptionsForTag = computed(() =>
      CategoryTags.filter((o) => !selectedItemsForTag.value.includes(o))
    ); */
    // console.log('taskCategories', taskCategories)
    const value = ref('');
    return {
      selectedItems,
      filteredOptions,
      // filteredOptionsForTag,
      // selectedItemsForTag,
      size: ref("large"),
      value,
      taskCategory,
      taskStatus,
      taskPriority,
      taskForm,
      staffList,
      addNewTask,
      visible,
      handleCancel,
    };
  },
};
</script>

<style>
.ant-modal-footer {
  display: none;
}
</style>