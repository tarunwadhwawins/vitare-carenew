<template>
  <a-row :gutter="24">
    <a-col :span="12">
      <div class="form-group">
        <label>From</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="12">
      <div class="form-group">
        <label>To</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="12">
      <div class="form-group">
        <label>Patient</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="12">
      <div class="form-group">
        <label>From</label>
        <a-input v-model="value" size="large" />
      </div>
    </a-col>
    <a-col :span="12">
      <div class="form-group">
        <label>Message Category</label>
        <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange" >
          <a-select-option value="lucy">Appointment Reminder</a-select-option>
          <a-select-option value="Yiminghe">Recall Reminder</a-select-option>
          <a-select-option value="Yiminghe">Portal Invitation </a-select-option>
          <a-select-option value="Yiminghe">Patient Message Notification</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :span="12">
      <div class="form-group">
        <label>Priority</label>
        <a-select ref="select" v-model="value1" style="width: 100%" size="large" @focus="focus" @change="handleChange" >
          <a-select-option value="lucy">Urgent</a-select-option>
          <a-select-option value="Yiminghe">Medium</a-select-option>
          <a-select-option value="Yiminghe">Normal</a-select-option>
        </a-select>
      </div>
    </a-col>
    <a-col :span="24">
      <div class="form-group">
        <label>Message</label>
        <a-textarea v-model="value2" allow-clear />
      </div>
    </a-col>
  </a-row>
</template>

