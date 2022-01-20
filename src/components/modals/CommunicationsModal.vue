<template>
  <a-modal width="1000px" title="Communications" centered>
    <a-form :model="messageForm" layout="vertical" @finish="sendMessage">
      <a-row :gutter="24">
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.patient')" name="patient">
              <a-select
                ref="select"
                v-if="patientsList"
                v-model:value="messageForm.patientId"
                style="width: 100%"
                size="large"
                 @change="patientChange">
                <a-select-option v-for="patient in patientsList" :key="patient.id" :value="patient.id">{{ patient.firstName }}{{ patient.lastName }}</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-col>
        <a-col :sm="12" :xs="24">
          <div class="form-group">
            <a-form-item :label="$t('communications.communicationsModal.to')" name="to">
            <a-input v-model:value="messageForm.to" size="large" readonly />
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
  export default {
    setup(props, {emit}) {
      const store = useStore()

      const visible = ref(true);
      const handleCancel = () => {
        emit('is-visible', false);
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

      const patientsList = computed(() => {
        return store.state.communications.patientsList
      })
      console.log('patientsList', patientsList)

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
        emit('is-visible', false);
      }

      const patientChange = (value) => {
        store.dispatch('patientDetails', value);
        const patientDetails = computed(() => {
          return store.state.communications.patientDetails;
        });
        console.log('Patient Email', patientDetails.value);
        messageForm.to = patientDetails.value.email;
      };
      
      return {
        patientChange,
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
