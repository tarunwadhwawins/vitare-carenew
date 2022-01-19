<template>
  <a-modal v-model:visible="visible" width="1000px" title="Communications" centered>
    <a-form :model="messageForm" layout="vertical" @finish="sendMessage">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.to')" name="to">
            <a-input v-model:value="messageForm.to" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.patient')" name="patient">
              <a-select
                ref="select"
                v-if="patientsList"
                v-model:value="messageForm.patientId"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange">
                <a-select-option v-for="patient in patientsList" :key="patient.id" :value="patient.id">{{ patient.firstName }}{{ patient.lastName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.subject')" name="subject">
              <a-input v-model:value="messageForm.subject" size="large" />
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.messageCategory')" name="messageCategory">
              <a-select
                v-if="messageCategories"
                ref="select"
                v-model:value="messageForm.messageCategoryId"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange"
              >
                <a-select-option v-for="messageCategory in messageCategories" :key="messageCategory.id" :value="messageCategory.id">{{ messageCategory.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.priority')" name="priority">
              <a-select
                v-if="taskPriority"
                ref="select"
                v-model:value="messageForm.priorityId"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange">
                <a-select-option v-for="priority in taskPriority" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.type')" name="type">
              <a-select
                ref="select"
                v-model:value="messageForm.messageTypeId"
                style="width: 100%"
                size="large"
                @focus="focus"
                @change="handleChange">
                <a-select-option v-for="type in messageType" :key="type.id" :value="type.id">{{ type.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.message')" name="message">
              <a-textarea v-model:value="messageForm.message" allow-clear />
            </a-form-item>
          </div>
        </a-col>
        <a-col :span="24">
          <div class="steps-action">
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button html-type="reset">{{$t('global.cancel')}}</a-button>
              <a-button type="primary" html-type="submit">{{$t('global.ok')}}</a-button>
            </a-form-item>
            <!-- <a-button type="cancel" @click="handleCancel">{{$t('global.cancel')}}</a-button>
            <a-button type="submit">{{$t('global.ok')}}</a-button> -->
          </div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
  import { ref, reactive, watchEffect, computed } from "vue";
  import { useStore } from "vuex"
  export default {
    props: {
      visibility: {
        type: Boolean
      }
    },
    setup(props) {
      // alert(props.visibility)
      const store = useStore()

      const visible = ref(false);
      const handleCancel = () => {
        visible.value = props.visibility;
      };
      
      watchEffect(() => {
        store.dispatch("globalCodes")
        store.dispatch("patientsList")
      })
      
      const patients = computed(() => {
        return store.state.patients
      })
      const taskPriority = computed(() => {
        return patients.value.taskPriority.globalCode;
      }) 
      const messageCategories = computed(() => {
        return patients.value.messageCategories.globalCode;
      }) 
      const messageType = computed(() => {
        return patients.value.messageType.globalCode;
      }) 
      /* const taskPriority = patients.value.taskPriority ? patients.value.taskPriority.globalCode : [];
      const messageCategories = patients.value.messageCategories ? patients.value.messageCategories.globalCode : [];
      const messageType = patients.value.messageType ? patients.value.messageType.globalCode : []; */

      console.log('taskPriority', taskPriority)
      console.log('messageCategories', messageCategories)
      console.log('messageType', messageType)

      const patientsList = computed(() => {
        return store.state.communications.patientsList
      })

      const messageForm = reactive({
        to: '',
        patientId: '',
        priorityId: '',
        messageCategoryId: '',
        message: '',
        subject: '',
        messageTypeId: '',
      });

      const sendMessage = () => {
        console.log('Message Form', messageForm)
        store.dispatch('addCommunication', messageForm)
      }
      
      return {
        handleCancel,
        sendMessage,
        patientsList,
        taskPriority,
        messageCategories,
        messageType,
        messageForm,
      };
    },
  };
</script>

<style>
.ant-modal-footer {
  display: none;
}
</style>
