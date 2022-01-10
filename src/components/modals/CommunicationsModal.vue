<template>
  <a-modal width="1000px" title="Communications" centered>
    <a-row :gutter="24">
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.from')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.to')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.patient')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.from')}}</label>
          <a-input v-model="value" size="large" />
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.messageCategory')}}</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="Appointment">Appointment Reminder</a-select-option>
            <a-select-option value="Recall">Recall Reminder</a-select-option>
            <a-select-option value="Portal">Portal Invitation </a-select-option>
            <a-select-option value="Patient"
              >Patient Message Notification
            </a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :sm="12" :xs="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.priority')}}</label>
          <a-select
            ref="select"
            v-model="value1"
            style="width: 100%"
            size="large"
            @focus="focus"
            @change="handleChange"
          >
            <a-select-option value="lucy">Urgent</a-select-option>
            <a-select-option value="Yiminghe">Medium</a-select-option>
            <a-select-option value="Yiminghe">Normal</a-select-option>
          </a-select>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="form-group">
          <label>{{$t('communications.communicationsModal.message')}}</label>
          <a-textarea v-model="value2" allow-clear />
        </div>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
export default {
  setup() {
    return {
      size: ref("large"),
    };
  },
};
</script>
