<template>
  <a-modal width="1000px" :title="taskId?'Edit Task':$t('tasks.tasksModal.addTask')" :footer="null" :maskClosable="false"  @cancel="closeModal()" centered>
    <a-form :model="taskForm"  autocomplete="off" layout="vertical" @finish="submitForm" @finishFailed="taskFormFailed">
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
              <a-select v-model:value="taskForm.taskStatus" ref="select" style="width: 100%" size="large"  >
                <a-select-option value="" disabled>{{'Select Status'}}</a-select-option>
                <a-select-option v-for="status in common.taskStatus.globalCode" :key="status.id" :value="status.id">{{ status.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.priority')" name="priority" :rules="[{ required: true, message: $t('tasks.tasksModal.priority')+' '+$t('global.validation')  }]">
              <a-select v-model:value="taskForm.priority" ref="select" style="width: 100%" size="large" >
                <a-select-option value="" disabled>{{'Select Priority'}}</a-select-option>
                <a-select-option v-for="priority in common.taskPriority.globalCode" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <!-- <a-col :span="12">
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
        </a-col> -->
       <a-col v-if="!isPatientTask" :sm="12" :xs="24"  v-show="taskId==null">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.to')" name="to" >
              <div class="btn toggleButton" :class="toggleTo ? 'active' : ''" @click="buttonToggle()">
                <span class="btn-content">{{ $t('tasks.tasksModal.patient') }}</span>
              </div>
              <div class="btn toggleButton" :class="toggleTo ? '' : 'active'" @click="buttonToggle()">
                <span class="btn-content">{{ $t('tasks.tasksModal.staff') }}</span>
              </div>
              <a-input type="hidden" id="entityType"  :value="toggleTo?taskForm.entityType= 'patient' : taskForm.entityType='staff'" />
            </a-form-item>
          </div>
        </a-col>
        <a-col v-if="!isPatientTask" :sm="12" :xs="24" v-show="toggleTo">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.patient')" name="assignedTo" :rules="[{ required: true, message: $t('tasks.tasksModal.patient')+' '+$t('global.validation')  }]">
              <a-select
                ref="select"
                mode="multiple"
                :disabled="taskId?true:false"
                v-model:value="taskForm.assignedTo"
                style="width: 100%"
                 placeholder="Please Select Patient"
                size="large">
                <a-select-option value="" disabled>{{'Select Patient'}}</a-select-option>
                <a-select-option v-for="patient in patients" :key="patient.id" :value="patient.id">{{ patient.name+' '+patient.middleName+' '+patient.lastName }}</a-select-option>
              </a-select>
            
            </a-form-item>
          </div>
        </a-col>
        <a-col v-if="!isPatientTask" :sm="12" :xs="24" v-show="!toggleTo">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.staff')" name="assignedTo" :rules="[{ required: true, message: $t('tasks.tasksModal.staff')+' '+$t('global.validation')  }]">
              <!-- <a-select
                ref="select"
                v-if="staffList"
                v-model:value="taskForm.assignedTo"
                style="width: 100%"
                size="large">
                <a-select-option value="" disabled>{{'Select Staff'}}</a-select-option>
                <a-select-option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{ staff.fullName }}</a-select-option>
              </a-select> -->
            <a-select
                :disabled="taskId?true:false"
                mode="tags"
                size="large"
                placeholder="Please Select Staff"
                style="width: 100%"
                v-model:value="taskForm.assignedTo"
                :options="common.staffList.map((item) => ({label: item.fullName, value: item.id }))"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.category')" name="taskCategory" :rules="[{ required: true, message: $t('tasks.tasksModal.category')+' '+$t('global.validation')  }]">
              <a-select
              :disabled="taskId?true:false"
                mode="multiple"
                size="large"
                placeholder="Please Select Category"
                style="width: 100%"
                v-model:value="taskForm.taskCategory"
                :options="common.taskCategory.globalCode.map((item) => ({label: item.name, value: item.id }))"
              />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.startDate')" name="startDate" :rules="[{ required: true, message: $t('tasks.tasksModal.startDate')+' '+$t('global.validation')  }]">
              <a-date-picker :disabled="taskId?true:false" v-model:value="taskForm.startDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="form-group">
            <a-form-item :label="$t('tasks.tasksModal.dueDate')" name="dueDate" :rules="[{ required: true, message: $t('tasks.tasksModal.dueDate')+' '+$t('global.validation')  }]">
              <a-date-picker :disabled="taskId?true:false" v-model:value="taskForm.dueDate" format="MMM DD, YYYY" value-format="YYYY-MM-DD" :size="size" style="width: 100%" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <ModalButtons :Id="taskId"/>
        </a-col>
      </a-row>
    </a-form>
    <Loader />
  </a-modal>
</template>

<script>
import { defineComponent, ref, reactive, watchEffect, computed } from "vue";
import { useStore } from "vuex"
import ModalButtons from "@/components/common/button/ModalButtons";
import {timeStamp,warningSwal,endTimeAdd } from "@/commonMethods/commonMethod";
import { messages } from "../../config/messages";
import Loader from "@/components/loader/Loader";
import { useRoute } from "vue-router";
import moment from "moment"
export default defineComponent({
  components: {
    ModalButtons,
    Loader
  },
  props:{
    taskId:Number,
    patientId: {
      type: Number
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const toggleTo= ref(false)
    const formRef =ref()
    const visible = ref(true)
    const value = ref('')
    const idPatient = reactive(props.patientId);
    const isPatientTask = idPatient != null ? true : false;

    const taskForm = reactive({
      title: '',
      description: '',
      taskStatus: '',
      priority: '',
      assignedTo:[],
      taskCategory: [],
      startDate: '',
      dueDate: '',
      entityType:''
    });


    const tasks =computed(() => {
      return store.state.tasks
    })
    
    const submitForm = () => {
    //  console.log('=>', Object.assign(taskForm, tasks.value.editTask))
    if(props.taskId!=null) {
      store.dispatch("updateTask", {
        data: {
          title: taskForm.title,
          description: taskForm.description,
          taskStatus: taskForm.taskStatus,
          priority: taskForm.priority,
          assignedTo:taskForm.assignedTo,
          taskCategory: taskForm.taskCategory,
          startDate: timeStamp(endTimeAdd(moment(taskForm.startDate))),
          dueDate: timeStamp(endTimeAdd(moment(taskForm.dueDate))),
          entityType:taskForm.entityType
        },
        id:props.taskId
        })
      }
      else {
        store.dispatch("addTask", {
          title: taskForm.title,
          description: taskForm.description,
          taskStatus: taskForm.taskStatus,
          priority: taskForm.priority,
          assignedTo: isPatientTask ? [idPatient] : taskForm.assignedTo,
          taskCategory: taskForm.taskCategory,
          startDate: timeStamp(endTimeAdd(moment(taskForm.startDate))),
          dueDate: timeStamp(endTimeAdd(moment(taskForm.dueDate))),
          entityType: isPatientTask ? 'patient' : taskForm.entityType
        }).then(() => {
          if(route.name == 'PatientSummary') {
            store.dispatch('latestTask', route.params.udid)
          }
        })
      }

      
      
      setTimeout(() => {
        if(tasks.value.addTask!=null || tasks.value.updateTask!=null){
          store.getters.taskRecords.value.tasksList=""
          if(route.params.udid == null) {
            store.dispatch("tasksList")
          }
        if(route.name != 'PatientSummary') {
          store.dispatch('taskStatus')
          store.dispatch('taskPriority')
          store.dispatch('taskTeamMember')
          store.dispatch('taskCategory')
        }
        Object.assign(taskForm, form)
        emit('saveTaskModal', false)
        }
      }, 2000);
      emit('closeModal');
    }

    const form = reactive({ ...taskForm })
    const handleCancel = () => {
      formRef.value.resetFields();
      Object.assign(taskForm, form)
    };
    
    watchEffect(() => {
      store.dispatch("staffList")
      if(props.taskId!=null){
        Object.assign(taskForm, tasks.value.editTask)
      }
    })
  
     const common = computed(() => {
      return store.state.common
    })

   

    const patients = computed(() => {
      return store.state.communications.patientsList
    })

   function  buttonToggle(){
     if(toggleTo.value==true){
     toggleTo.value =!toggleTo.value
     taskForm.assignedTo=[]
     }else{
       toggleTo.value =!toggleTo.value
       taskForm.assignedTo=[]
     }
   }


   function closeModal() {
      if((taskForm.title!='' || taskForm.description!='') && tasks.value.addTask==null){
      warningSwal(messages.modalWarning).then((response) => {
        if (response == true) {
          emit("saveTaskModal", false);
          Object.assign(taskForm, form)
        } else {
          emit("saveTaskModal", true);
        }
      })
      }
    }



    return {
      tasks,
      common,
      closeModal,
      form,
      formRef,
      timeStamp,
      buttonToggle,
      patients,
      toggleTo,
      size: ref("large"),
      value,
      taskForm,
      submitForm,
      visible,
      handleCancel,
      isPatientTask,
    };
  },
});
</script>

<style>
.ant-modal-footer {
  display: none;
}
.toggleButton {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 6px 16px;
  display: inline-block;
  cursor: pointer;
  width: 100px;
}
.toggleButton.active {
  background-color: #777;
  color: #fff;
}
</style>