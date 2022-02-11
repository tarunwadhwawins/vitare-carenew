<template>
  <a-modal width="1000px" :title="$t('tasks.tasksModal.addTask')" centered>
    <a-form :model="taskForm" layout="vertical" @finish="submitForm">
      <a-row :gutter="24">
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.title')" name="title" :rules="[{ required: true, message: $t('tasks.tasksModal.title')+' '+$t('global.validation')  }]">
              <a-input v-model:value="taskForm.title" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.longDescription')" name="description" :rules="[{ required: true, message: $t('tasks.tasksModal.longDescription')+' '+$t('global.validation')  }]">
              <a-textarea v-model:value="taskForm.description" placeholder="Description" :auto-size="{ minRows: 3 }" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.status')" name="taskStatus" :rules="[{ required: true, message: $t('tasks.tasksModal.status')+' '+$t('global.validation')  }]">
              <a-select v-model:value="taskForm.taskStatus" ref="select" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                <a-select-option v-for="status in taskStatus.globalCode" :key="status.id" :value="status.id">{{ status.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.priority')" name="priority" :rules="[{ required: true, message: $t('tasks.tasksModal.priority')+' '+$t('global.validation')  }]">
              <a-select v-model:value="taskForm.priority" ref="select" style="width: 100%" size="large" @focus="focus" @change="handleChange">
                <a-select-option v-for="priority in taskPriority.globalCode" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.assignedTo')" name="assignedTo" :rules="[{ required: true, message: $t('tasks.tasksModal.assignedTo')+' '+$t('global.validation')  }]">
              <a-select
                mode="tags"
                size="large"
                placeholder="Please Select Staff"
                style="width: 100%"
                v-model:value="taskForm.assignedTo"
                :options="staffList"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.category')" name="taskCategory" :rules="[{ required: true, message: $t('tasks.tasksModal.category')+' '+$t('global.validation')  }]">
              <a-select
                mode="multiple"
                size="large"
                placeholder="Please Select Category"
                style="width: 100%"
                v-model:value="taskForm.taskCategory"
                :options="taskCategory"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.startDate')" name="startDate" :rules="[{ required: true, message: $t('tasks.tasksModal.startDate')+' '+$t('global.validation')  }]">
              <a-date-picker v-model:value="taskForm.startDate" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.dueDate')" name="dueDate" :rules="[{ required: true, message: $t('tasks.tasksModal.dueDate')+' '+$t('global.validation')  }]">
              <a-date-picker v-model:value="taskForm.dueDate" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <ModalButtons/>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { defineComponent, ref, reactive, watchEffect, computed } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
export default defineComponent({
  components: {
    ModalButtons
  },
  setup(props, {emit}) {
    const taskForm = reactive({
      title: '',
      description: '',
      taskStatus: '',
      priority: '',
      assignedTo: '',
      taskCategory: '',
      startDate: '',
      dueDate: '',
    });

    const submitForm = () => {
      console.log('task Form', taskForm)
      store.dispatch("addTask", taskForm)
      emit('closeModal');
    }
    const visible = ref(true);
    const handleCancel = () => {
      emit('closeModal', false);
    };
    const store = useStore()
    watchEffect(() => {
      store.dispatch("globalCodes")
      store.dispatch("staffList")
    })
    const taskCategoriesList = computed(() => {
      return store.state.common.taskCategory;
    })
    const taskPriority = computed(() => {
      return store.state.common.taskPriority;
    })
    const taskStatus = computed(() => {
      return store.state.common.taskStatus
    })
    const staff = computed(() => {
      return store.state.common.staffList
    })
    
    const staffList = ref([])
    staff.value.forEach(element => {
      staffList.value.push({
        label: element.fullName,
        value: element.id,
      })
    })
    
    const taskCategory = ref([])
    taskCategoriesList.value.globalCode.forEach(element => {
      taskCategory.value.push({
        label: element.name,
        value: element.id,
      })
    })

    const value = ref('');
    return {
      size: ref("large"),
      value,
      taskCategory,
      taskStatus,
      taskPriority,
      taskForm,
      staffList,
      submitForm,
      visible,
      handleCancel,
    };
  },
});
</script>

<style>
.ant-modal-footer {
  display: none;
}
</style>