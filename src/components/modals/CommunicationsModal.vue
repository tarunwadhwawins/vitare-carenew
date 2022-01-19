<template>
  <a-modal width="1000px" title="Communications" centered>
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.to')}}</label>
          <a-input v-model="to" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.patient')}}</label>
          <a-select
            ref="select"
            v-if="patientsList"
            v-model="patientId"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange">
            <a-select-option v-for="patient in patientsList" :key="patient.id" :value="patient.id">{{ patient.firstName }}{{ patient.lastName }}</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.subject')}}</label>
          <a-input v-model="subject" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.messageCategory')}}</label>
          <a-select
            v-if="messageCategories"
            ref="select"
            v-model="messageCategoryId"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option v-for="messageCategory in messageCategories.globalCode" :key="messageCategory.id" :value="messageCategory.id">{{ messageCategory.name }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.priority')}}</label>
          <a-select
            v-if="taskPriority"
            ref="select"
            v-model="priorityId"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange">
            <a-select-option v-for="priority in taskPriority.globalCode" :key="priority.id" :value="priority.id">{{ priority.name }}</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.message')}}</label>
          <a-textarea v-model="message" allow-clear />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
  import { ref, watchEffect, computed } from "vue";
  import { useStore } from "vuex"
  export default {
    setup() {
      const store = useStore()
      
      watchEffect(() => {
        store.dispatch("globalCodes")
        store.dispatch("patientsList")
      })
      
      const taskPriority = computed(() => {
        return store.state.patients.taskPriority
      })
      const messageCategories = computed(() => {
        return store.state.patients.messageCategories
      })
      const patientsList = computed(() => {
        return store.state.communications.patientsList
      })
      console.log('taskPriority', taskPriority.value)
      console.log('patientsList', patientsList.value)
      console.log('messageCategories', messageCategories.value)
      
      return {
        patientsList,
        taskPriority,
        messageCategories,
      };
    },
  };
</script>
